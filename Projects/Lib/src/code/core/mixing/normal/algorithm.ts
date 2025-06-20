/**
 * Normal mixing functionality
 * Provides functions for mixing products with ingredients
 */
import { Effect } from '@/code/types/effects/Effect';
import { MixResult } from '@/code/types/mixing/MixResult';
import { transformationRules } from '@/code/data/mix/transformationRules';
import { findProductByCode } from '@/code/utils/products/productUtils';
import { findIngredientByCode } from '@/code/utils/products/ingredientUtils';
import { findEffectByCode } from '@/code/utils/effects/effectUtils';
import { isMarijuanaProduct } from '@/code/types/products/Product';
import type { Product } from '@/code/types/products/Product';
import type { EffectCode } from '@/code/types/effects/Effect';
import type { RecipePayload } from '@/code/types/mixing/RecipePayload';
import { Result, ok, err } from 'neverthrow';
import type { MixError } from '@/code/types/errors/MixError';
import { MIX_ERROR } from '@/code/types/errors/MixError';

/**
 * Mix a product with ingredients according to game rules (snapshot reactions, default effect, limits).
 * Implements price and addictiveness formulas from the Steam guide.
 */
export const mixProductCore = (
    productCode: RecipePayload['productCode'],
    ingredientCodes: RecipePayload['ingredientCodes']
): MixResult => {
    // Lookup product
    const productResult = findProductByCode(productCode);
    const product: Product = productResult.match(
        (p) => p,
        (err) => {
            throw new Error(`Product not found: ${productCode}. Error: ${err.message}`);
        }
    );
    const basePrice = product.basePrice;

    // Accumulate cost and effects
    let totalCost = 0;
    // Map of effect code literals to effect objects
    const effectMap = new Map<EffectCode, Effect>();

    // Step 1: add default effect for marijuana
    if (isMarijuanaProduct(product)) {
        const baseEffectCode = product.defaultEffect;
        const baseEffectResult = findEffectByCode(baseEffectCode);
        const baseEffect: Effect = baseEffectResult.match(
            (eff) => eff,
            (err) => {
                throw new Error(
                    `Could not find base effect ${baseEffectCode} for product ${product.name}: ${err.message}`
                );
            }
        );
        effectMap.set(baseEffect.code, baseEffect);
    }

    // Step 2: process each mixer in order
    for (const ingCode of ingredientCodes) {
        const ingredientResult = findIngredientByCode(ingCode);
        const ingredient = ingredientResult.match(
            (ing) => ing,
            (err) => {
                throw new Error(`Ingredient not found: ${ingCode}. Error: ${err.message}`);
            }
        );
        totalCost += ingredient.price;

        // 2a: apply two-phase cascading transforms
        const rules = transformationRules[ingCode as keyof typeof transformationRules];
        if (rules) {
            // snapshot initial effect codes
            const initialCodes = new Set<EffectCode>(effectMap.keys());
            const removed = new Set<Effect['code']>();
            const applied = new Set<number>();

            // Phase 1: immediate transforms based on initial snapshot
            rules.forEach((rule, idx) => {
                const { ifPresent, ifNotPresent, replace } = rule;
                const presentOK = ifPresent.every((code: EffectCode) => initialCodes.has(code));
                const notPresentOK = ifNotPresent.every((code: EffectCode) => !initialCodes.has(code));
                const hasReplaceable = Object.keys(replace as Record<EffectCode, EffectCode>).some((oldCode: string) =>
                    initialCodes.has(oldCode as EffectCode)
                );
                if (presentOK && notPresentOK && hasReplaceable) {
                    for (const [oldCode, newCode] of Object.entries(replace) as [EffectCode, EffectCode][]) {
                        if (effectMap.has(oldCode) && !effectMap.has(newCode)) {
                            effectMap.delete(oldCode);
                            const newEffResult = findEffectByCode(newCode);
                            const newEff: Effect = newEffResult.match(
                                (eff) => eff,
                                (err) => {
                                    throw new Error(`New effect not found: ${newCode}. Error: ${err.message}`);
                                }
                            );
                            effectMap.set(newEff.code, newEff);
                            removed.add(oldCode);
                        }
                    }
                    applied.add(idx);
                }
            });

            // Phase 2: cascading transforms based on removals
            rules.forEach((rule, idx) => {
                if (applied.has(idx)) return;
                const { ifPresent, ifNotPresent, replace } = rule;
                const presentOK = ifPresent.every((code: EffectCode) => initialCodes.has(code));
                const forbiddenRemoved = ifNotPresent.some((code: EffectCode) => removed.has(code));
                const forbiddenAbsentNow = ifNotPresent.every((code: EffectCode) => !effectMap.has(code));
                const hasReplaceable = Object.keys(replace as Record<EffectCode, EffectCode>).some((oldCode: string) =>
                    effectMap.has(oldCode as EffectCode)
                );
                if (presentOK && forbiddenRemoved && forbiddenAbsentNow && hasReplaceable) {
                    for (const [oldCode, newCode] of Object.entries(replace) as [EffectCode, EffectCode][]) {
                        if (effectMap.has(oldCode) && !effectMap.has(newCode)) {
                            effectMap.delete(oldCode);
                            const newEffResult = findEffectByCode(newCode);
                            const newEff: Effect = newEffResult.match(
                                (eff) => eff,
                                (err) => {
                                    throw new Error(`New effect not found: ${newCode}. Error: ${err.message}`);
                                }
                            );
                            effectMap.set(newEff.code, newEff);
                            removed.add(oldCode);
                        }
                    }
                    applied.add(idx);
                }
            });
        }

        // 2b: add mixer's own effect if space & not already present
        const ingredientDefaultEffectCode = ingredient.defaultEffect;

        if (!effectMap.has(ingredientDefaultEffectCode) && effectMap.size < 8) {
            const defaultEffectResult = findEffectByCode(ingredientDefaultEffectCode);
            const defaultEffect: Effect = defaultEffectResult.match(
                (eff) => eff,
                (err) => {
                    throw new Error(
                        `Default effect ${ingredientDefaultEffectCode} for ingredient ${ingredient.name} not found: ${err.message}`
                    );
                }
            );
            effectMap.set(defaultEffect.code, defaultEffect);
        }
    }

    // Safety cap: enforce maximum of 8 effects by evicting the oldest entry
    while (effectMap.size > 8) {
        const oldestCode = effectMap.keys().next().value!;
        effectMap.delete(oldestCode);
    }

    // Collect, sort and extract effect names
    const appliedEffects = Array.from(effectMap.values()).sort((a, b) =>
        a.code < b.code ? -1 : a.code > b.code ? 1 : 0
    );
    const effects = appliedEffects.map((e) => e.name);

    // Step 3: price calculation
    const totalMultiplier = appliedEffects.reduce((sum, e) => sum + e.multiplier, 0);
    const rawPrice = basePrice * (1 + totalMultiplier);
    // Standard rounding: <.5 down, >.5 up, =.5 down if multiplierTotal<1 else up (approx by Math.round)
    const sellPrice = Math.round(rawPrice);
    const profit = sellPrice - totalCost;

    // Step 4: addictiveness calculation
    // Sum effect addictiveness
    const effectAddiction = appliedEffects.reduce((sum, e) => sum + e.addictiveness, 0);
    // Base addictiveness (meth or cocaine) for non-weed products
    const baseAdd = 'addictiveness' in product ? product.addictiveness || 0 : 0;
    // Hybrid weed bonus for marijuana with at least one mixer
    const hybridBonus = isMarijuanaProduct(product) && ingredientCodes.length > 0 ? 0.05 : 0;
    // Total before rounding and cap
    let totalAddiction = baseAdd + effectAddiction + hybridBonus;
    // Cap to 1 if 8 effects reached
    if (appliedEffects.length === 8) {
        totalAddiction = 1;
    } else {
        // Floor to two decimals (round down)
        totalAddiction = Math.floor(totalAddiction * 100) / 100;
        // Prevent going above 1
        totalAddiction = Math.min(totalAddiction, 1);
    }

    return {
        effects,
        totalAddiction,
        totalCost,
        sellPrice,
        profit,
    };
};

// ---------------------------------------------------------------------------
/**
 * neverthrow-based wrapper around {@link mixProduct}. Should be the preferred
 * entry-point for consumers because it eliminates runtime exceptions.
 */
export const mixProduct = (
    productCode: RecipePayload['productCode'],
    ingredientCodes: RecipePayload['ingredientCodes']
): Result<MixResult, MixError> => {
    try {
        return ok(mixProductCore(productCode, ingredientCodes));
    } catch (e) {
        const error = e as Error;
        return err({ type: MIX_ERROR, message: error.message, context: {} });
    }
};

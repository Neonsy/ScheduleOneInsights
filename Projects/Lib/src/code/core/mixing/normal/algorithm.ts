/**
 * Normal mixing functionality
 * Provides functions for mixing products with ingredients
 */
import { Effect } from '@/code/types/effects/Effect';
import { MixResult } from '@/code/types/mix/MixResult';
import { transformationRules } from '@/code/data/mix/transformationRules';
import { findProductByCode } from '@/code/utils/products/productUtils';
import { findIngredientByCode } from '@/code/utils/products/ingredientUtils';
import { findEffectByCode } from '@/code/utils/effects/effectUtils';
import { isMarijuanaProduct } from '@/code/types/products/Product';
import type { Product } from '@/code/types/products/Product';
import type { Ingredient } from '@/code/types/products/Ingredient';

/**
 * Mix a product with ingredients according to game rules (snapshot reactions, default effect, limits).
 * Implements price and addictiveness formulas from the Steam guide.
 */
export const mixProduct = (productCode: Product['code'], ingredientCodes: Ingredient['code'][]): MixResult => {
    // Lookup product
    const product = findProductByCode(productCode);
    const basePrice = product.basePrice;

    // Accumulate cost and effects
    let totalCost = 0;
    const effectMap = new Map<Effect['code'], Effect>();

    // Step 1: add default effect for marijuana
    if (isMarijuanaProduct(product)) {
        const baseEffect = findEffectByCode(product.defaultEffect);
        effectMap.set(baseEffect.code, baseEffect);
    }

    // Step 2: process each mixer in order
    for (const ingCode of ingredientCodes) {
        const ingredient = findIngredientByCode(ingCode);
        totalCost += ingredient.price;

        // 2a: apply two-phase cascading transforms
        const rules = transformationRules[ingCode as keyof typeof transformationRules];
        if (rules) {
            // snapshot initial effect codes
            const initialCodes = new Set(effectMap.keys());
            const removed = new Set<Effect['code']>();
            const applied = new Set<number>();

            // Phase 1: immediate transforms based on initial snapshot
            rules.forEach((rule, idx) => {
                const { ifPresent, ifNotPresent, replace } = rule;
                const presentOK = ifPresent.every((code) => initialCodes.has(code));
                const notPresentOK = ifNotPresent.every((code) => !initialCodes.has(code));
                const hasReplaceable = Object.keys(replace).some((oldCode) => initialCodes.has(oldCode));
                if (presentOK && notPresentOK && hasReplaceable) {
                    for (const [oldCode, newCode] of Object.entries(replace) as [Effect['code'], Effect['code']][]) {
                        if (effectMap.has(oldCode) && !effectMap.has(newCode)) {
                            effectMap.delete(oldCode);
                            const newEff = findEffectByCode(newCode);
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
                const presentOK = ifPresent.every((code) => initialCodes.has(code));
                const forbiddenRemoved = ifNotPresent.some((code) => removed.has(code));
                const forbiddenAbsentNow = ifNotPresent.every((code) => !effectMap.has(code));
                const hasReplaceable = Object.keys(replace).some((oldCode) => effectMap.has(oldCode));
                if (presentOK && forbiddenRemoved && forbiddenAbsentNow && hasReplaceable) {
                    for (const [oldCode, newCode] of Object.entries(replace) as [Effect['code'], Effect['code']][]) {
                        if (effectMap.has(oldCode) && !effectMap.has(newCode)) {
                            effectMap.delete(oldCode);
                            const newEff = findEffectByCode(newCode);
                            effectMap.set(newEff.code, newEff);
                            removed.add(oldCode);
                        }
                    }
                    applied.add(idx);
                }
            });
        }

        // 2b: add mixer's own effect if space & not already present
        if (!effectMap.has(ingredient.defaultEffect) && effectMap.size < 8) {
            const defaultEffect = findEffectByCode(ingredient.defaultEffect);
            effectMap.set(defaultEffect.code, defaultEffect);
        }
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
    const baseAdd = ('addictiveness' in product ? product.addictiveness || 0 : 0) as number;
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

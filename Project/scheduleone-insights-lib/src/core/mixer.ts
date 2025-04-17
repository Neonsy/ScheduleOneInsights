import type { EffectCode, IngredientCode, MixResult, MixState, Product, ProductCode, ReplacementRule } from '../types';

import { effects } from '../data/effects';
import { ingredients, ingredientNameToCode } from '../data/ingredients';
import { products, productNameToCode } from '../data/products';
import { effectTransformationsByIngredient } from '../data/transformations';
import { createEffectSet, addEffect, removeEffect, hasEffect, toArray, getSize, cloneSet } from './effectSet';
import { generateSeed, parseSeed } from './seedManager';
import { memoizeWithLimit } from '../utils/memoize';

const MAX_EFFECTS = 8;
const CACHE_SIZE = 100; // Maximum number of mix results to cache

/**
 * Calculate the result of mixing ingredients with a product
 * @param productName - The product to mix
 * @param ingredientNames - The ingredients to mix
 * @returns The result of the mix
 */
function _mixIngredients(productName: string, ingredientNames: string[]): MixResult {
    // Convert product name to code
    const productCode = productNameToCode[productName];
    if (!productCode || !products[productCode]) {
        throw new Error(`Unknown product: ${productName}`);
    }

    // Convert ingredient names to codes
    const ingredientCodes: IngredientCode[] = [];
    for (const name of ingredientNames) {
        const code = ingredientNameToCode[name];
        if (code) {
            ingredientCodes.push(code);
        }
    }

    const product = products[productCode];
    const mixState: MixState = {
        product: productCode,
        ingredients: ingredientCodes,
    };

    // Process the mix
    const result = processMix(product, ingredientCodes);

    // Generate a deterministic seed for this mix based on effects
    const seed = generateSeed(mixState, result.effects);

    // Add the seed to the result
    return {
        ...result,
        seed,
    };
}

/**
 * Recreate a mix from a seed
 * @param seed - The seed to recreate from
 * @returns The result of the mix
 */
function _mixFromSeed(seed: string): MixResult {
    const mixState = parseSeed(seed);
    if (!mixState) {
        throw new Error(`Invalid seed: ${seed}`);
    }

    const { product: productCode, ingredients: ingredientCodes } = mixState;

    if (!products[productCode]) {
        throw new Error(`Unknown product in seed: ${productCode}`);
    }

    const product = products[productCode];
    const result = processMix(product, ingredientCodes);

    return {
        ...result,
        seed,
    };
}

/**
 * Process a mix of ingredients with a product
 * @param product - The product to mix
 * @param ingredientCodes - The ingredients to mix
 * @returns The result of the mix without the seed
 */
function processMix(product: Product, ingredientCodes: IngredientCode[]): Omit<MixResult, 'seed'> {
    let initialEffects: EffectCode[] = [];

    // Add initial effects based on product type
    if (product.name === 'OG Kush') {
        // OG Kush
        initialEffects = ['Ca']; // Calming
    } else if (product.name === 'Sour Diesel') {
        // Sour Diesel
        initialEffects = ['Re']; // Refreshing
    } else if (product.name === 'Green Crack') {
        // Green Crack
        initialEffects = ['En']; // Energizing
    } else if (product.name === 'Granddaddy Purple') {
        // Granddaddy Purple
        initialEffects = ['Se']; // Sedating
    }

    // Create a new effect set to handle the mix
    let effectsSet = createEffectSet(initialEffects);
    let ingredientCost = 0;

    // Process each ingredient in the order provided
    for (const code of ingredientCodes) {
        const ingredient = ingredients[code];
        if (!ingredient) continue;

        ingredientCost += ingredient.price;

        // Apply transformations from this ingredient
        effectsSet = applyIngredientTransformations(effectsSet, code);

        // Add ingredient's default effect after transformations
        if (getSize(effectsSet) < MAX_EFFECTS && ingredient.defaultEffect) {
            effectsSet = addEffect(effectsSet, ingredient.defaultEffect);
        }
    }

    // Calculate final values
    const finalEffects = toArray(effectsSet).slice(0, MAX_EFFECTS);
    const effectValue = calculateEffectValue(finalEffects);
    const addictionValue = calculateAddiction(finalEffects);
    const addictiveness = Math.round(addictionValue * 100) / 100;

    // Calculate selling price based on product price and effect value
    const sellingPrice = Math.round(product.price * (1 + effectValue));

    // Only consider ingredient cost for profit calculation, as product price is the base selling price
    const profit = sellingPrice - ingredientCost;
    const profitMargin = Math.round((profit / sellingPrice) * 100) / 100;

    return {
        effects: finalEffects,
        ingredientCost,
        productCost: product.price,
        sellingPrice,
        profit,
        profitMargin,
        addictiveness,
    };
}

/**
 * Apply transformations from an ingredient
 * @param effectsSet - The current set of effects
 * @param ingredientCode - The code of the ingredient
 * @returns A new set of effects with transformations applied
 */
function applyIngredientTransformations(effectsSet: Set<EffectCode>, ingredientCode: IngredientCode): Set<EffectCode> {
    const transformations = effectTransformationsByIngredient[ingredientCode];
    if (!transformations || transformations.length === 0) return effectsSet;

    // Create a snapshot of the current effects for rule evaluation
    const snapshot = cloneSet(effectsSet);

    // Track which effects have been processed and removed
    const processed = new Set<EffectCode>();
    const removed = new Set<EffectCode>();

    // First pass: Apply transformations where conditions are fully met
    let newEffectsSet = applyPrimaryTransformations(effectsSet, transformations, snapshot, processed, removed);

    // Second pass: Apply transformations where conditions are met after first pass
    newEffectsSet = applySecondaryTransformations(newEffectsSet, transformations, snapshot, processed, removed);

    return newEffectsSet;
}

/**
 * Apply primary transformations (first pass)
 * @param effectsSet - The current set of effects
 * @param transformations - The transformation rules to apply
 * @param snapshot - A snapshot of the original effects
 * @param processed - Set of effects that have been processed
 * @param removed - Set of effects that have been removed
 * @returns A new set of effects with primary transformations applied
 */
function applyPrimaryTransformations(
    effectsSet: Set<EffectCode>,
    transformations: ReplacementRule[],
    snapshot: Set<EffectCode>,
    processed: Set<EffectCode>,
    removed: Set<EffectCode>
): Set<EffectCode> {
    let newEffectsSet = effectsSet;
    const appliedRules = new Set<number>();

    for (let i = 0; i < transformations.length; i++) {
        const rule = transformations[i];

        if (checkPrimaryConditions(rule, snapshot)) {
            newEffectsSet = applyTransformation(newEffectsSet, rule.replace, processed, removed);
            appliedRules.add(i);
        }
    }

    return newEffectsSet;
}

/**
 * Apply secondary transformations (second pass)
 * @param effectsSet - The current set of effects
 * @param transformations - The transformation rules to apply
 * @param snapshot - A snapshot of the original effects
 * @param processed - Set of effects that have been processed
 * @param removed - Set of effects that have been removed
 * @returns A new set of effects with secondary transformations applied
 */
function applySecondaryTransformations(
    effectsSet: Set<EffectCode>,
    transformations: ReplacementRule[],
    snapshot: Set<EffectCode>,
    processed: Set<EffectCode>,
    removed: Set<EffectCode>
): Set<EffectCode> {
    let newEffectsSet = effectsSet;

    for (const rule of transformations) {
        if (checkSecondaryConditions(rule, snapshot, newEffectsSet, removed)) {
            newEffectsSet = applyTransformation(newEffectsSet, rule.replace, processed, removed);
        }
    }

    return newEffectsSet;
}

/**
 * Check if primary conditions for a transformation are met
 * @param rule - The transformation rule
 * @param snapshot - A snapshot of the original effects
 * @returns True if conditions are met, false otherwise
 */
function checkPrimaryConditions(rule: ReplacementRule, snapshot: Set<EffectCode>): boolean {
    // All required effects must be present
    for (const effect of rule.ifPresent) {
        if (!hasEffect(snapshot, effect)) return false;
    }

    // All forbidden effects must be absent
    for (const effect of rule.ifNotPresent) {
        if (hasEffect(snapshot, effect)) return false;
    }

    // At least one replaceable effect must be present
    for (const oldEffect of Object.keys(rule.replace) as EffectCode[]) {
        if (hasEffect(snapshot, oldEffect)) return true;
    }

    return false;
}

/**
 * Check if secondary conditions for a transformation are met
 * @param rule - The transformation rule
 * @param snapshot - A snapshot of the original effects
 * @param currentEffects - The current set of effects
 * @param removed - Set of effects that have been removed
 * @returns True if conditions are met, false otherwise
 */
function checkSecondaryConditions(
    rule: ReplacementRule,
    snapshot: Set<EffectCode>,
    currentEffects: Set<EffectCode>,
    removed: Set<EffectCode>
): boolean {
    // All required effects must have been initially present
    for (const effect of rule.ifPresent) {
        if (!hasEffect(snapshot, effect)) return false;
    }

    // At least one forbidden effect must have been removed
    let hasRemovedForbidden = false;
    for (const effect of rule.ifNotPresent) {
        if (removed.has(effect)) {
            hasRemovedForbidden = true;
            break;
        }
    }
    if (!hasRemovedForbidden) return false;

    // All forbidden effects must be absent from current set
    for (const effect of rule.ifNotPresent) {
        if (hasEffect(currentEffects, effect)) return false;
    }

    // At least one replaceable effect must be present
    for (const oldEffect of Object.keys(rule.replace) as EffectCode[]) {
        if (hasEffect(currentEffects, oldEffect)) return true;
    }

    return false;
}

/**
 * Apply a transformation to the effects
 * @param effectsSet - The current set of effects
 * @param replace - The replacement rules
 * @param processed - Set of effects that have been processed
 * @param removed - Set of effects that have been removed
 * @returns A new set of effects with the transformation applied
 */
function applyTransformation(
    effectsSet: Set<EffectCode>,
    replace: Partial<Record<EffectCode, EffectCode>>,
    processed: Set<EffectCode>,
    removed: Set<EffectCode>
): Set<EffectCode> {
    let newEffectsSet = effectsSet;

    for (const [oldEffect, newEffect] of Object.entries(replace) as [EffectCode, EffectCode][]) {
        if (hasEffect(newEffectsSet, oldEffect)) {
            newEffectsSet = removeEffect(newEffectsSet, oldEffect);
            newEffectsSet = addEffect(newEffectsSet, newEffect);
            processed.add(oldEffect);
            removed.add(oldEffect);
        }
    }

    return newEffectsSet;
}

/**
 * Calculate the total value multiplier from effects
 * @param effectCodes - The effects to calculate the value for
 * @returns The total value multiplier
 */
const calculateEffectValue = memoizeWithLimit(
    (effectCodes: EffectCode[]): number => {
        return effectCodes.reduce((value, code) => {
            return value + (effects[code]?.valueMultiplier || 0);
        }, 0);
    },
    200,
    (effectCodes) => effectCodes.join(',')
);

/**
 * Calculate the total addiction value from effects
 * @param effectCodes - The effects to calculate the value for
 * @returns The total addiction value
 */
const calculateAddiction = memoizeWithLimit(
    (effectCodes: EffectCode[]): number => {
        return effectCodes.reduce((value, code) => {
            return value + (effects[code]?.addictiveness || 0);
        }, 0);
    },
    200,
    (effectCodes) => effectCodes.join(',')
);

// Create memoized versions of the exported functions
export const mixIngredients = memoizeWithLimit(
    _mixIngredients,
    CACHE_SIZE,
    (productName, ingredientNames) => `${productName}|${ingredientNames.join(',')}`
);

export const mixFromSeed = memoizeWithLimit(_mixFromSeed, CACHE_SIZE);

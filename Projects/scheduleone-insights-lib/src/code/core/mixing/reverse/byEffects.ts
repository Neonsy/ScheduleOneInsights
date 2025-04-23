/**
 * Reverse mixing for desired effects
 * Provides functions for finding cheapest ingredient combination to achieve given effects
 */
import { mixProduct } from '@/code/core/mixing/normal/algorithm';
import { ingredients } from '@/code/data/products/ingredients';
import { Ingredient } from '@/code/types/products/Ingredient';
import type { MixResult } from '@/code/types/mix/MixResult';
import type { ReverseMixByEffectsPayload, ReverseMixByEffectsResult } from '@/code/types/mix/reverse/byEffects';

/**
 * Find the cheapest combination of ingredients to achieve the desired effects on a product.
 * @param payload The product code and desired effect codes
 * @returns The ingredient combination and mixing result for the cheapest cost
 * @throws Error if no combination of ingredients can produce the desired effects
 */
export const getMixtureByEffects = (payload: ReverseMixByEffectsPayload): ReverseMixByEffectsResult => {
    const { productCode, effectCodes } = payload;
    const allIngredientCodes: Ingredient['code'][] = ingredients.map((ing) => ing.code);
    const n: number = allIngredientCodes.length;
    let bestCombination: Ingredient['code'][] = [];
    let bestResult: MixResult | null = null;
    let bestCost: number = Infinity;

    // Enumerate all non-empty subsets of ingredients
    for (let mask = 1; mask < 1 << n; mask++) {
        const combo: Ingredient['code'][] = [];
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                combo.push(allIngredientCodes[i]);
            }
        }

        // Mix and evaluate effects
        const mixResult: MixResult = mixProduct(productCode, combo);
        // Check if all desired effects are present
        const hasAllEffects: boolean = effectCodes.every((code) => mixResult.effects.includes(code));
        if (!hasAllEffects) {
            continue;
        }

        // Update if cheaper
        if (mixResult.totalCost < bestCost) {
            bestCost = mixResult.totalCost;
            bestCombination = combo;
            bestResult = mixResult;
        }
    }

    if (!bestResult) {
        throw new Error(`No mixture found for effects: ${effectCodes.join(', ')}`);
    }

    return {
        ingredientCodes: bestCombination,
        result: bestResult,
    };
};

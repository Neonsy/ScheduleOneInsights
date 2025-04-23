/**
 * Reverse mixing by provided ingredients
 * Provides function for finding best ingredient combination from a provided list
 * to minimize cost or maximize profit.
 */
import { mixProduct } from '@/code/core/mixing/normal/algorithm';
import { Ingredient } from '@/code/types/products/Ingredient';
import type { MixResult } from '@/code/types/mix/MixResult';
import type {
    ReverseMixByIngredientsPayload,
    ReverseMixByIngredientsResult,
} from '@/code/types/mix/reverse/byIngredients';

/**
 * Find the best combination of provided ingredients to minimize cost or maximize profit.
 * @param payload The product and a list of ingredients with options
 * @returns The best ingredient combination and corresponding mixing result
 * @throws Error if no valid combination is found
 */
export const getMixtureByIngredients = (payload: ReverseMixByIngredientsPayload): ReverseMixByIngredientsResult => {
    const {
        productCode,
        ingredientCodes: providedCodes,
        useAllIngredients = false,
        allowRepeats = false,
        resultMode = 'cheapest',
    }: ReverseMixByIngredientsPayload = payload;

    // Conditionally remove duplicates if repeats are not allowed
    const codesList: Ingredient['code'][] = allowRepeats ? [...providedCodes] : Array.from(new Set(providedCodes));

    const n: number = codesList.length;
    if (n < 1) {
        throw new Error('At least one ingredient code must be provided.');
    }

    // Generate combinations based on flags
    const combinations: Ingredient['code'][][] = [];
    if (useAllIngredients) {
        // Only consider the full set of codes
        combinations.push(codesList);
    } else {
        // Enumerate all non-empty subsets of codes
        for (let mask = 1; mask < 1 << n; mask++) {
            const combo: Ingredient['code'][] = [];
            for (let i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    combo.push(codesList[i]);
                }
            }
            combinations.push(combo);
        }
    }

    let bestCombination: Ingredient['code'][] | null = null;
    let bestResult: MixResult | null = null;

    // Evaluate each combination to determine best according to resultMode
    for (const combo of combinations) {
        const mixResult: MixResult = mixProduct(productCode, combo);

        if (!bestResult) {
            bestResult = mixResult;
            bestCombination = combo;
            continue;
        }

        if (resultMode === 'cheapest' && mixResult.totalCost < bestResult!.totalCost) {
            bestResult = mixResult;
            bestCombination = combo;
        } else if (resultMode === 'highestProfit' && mixResult.profit > bestResult!.profit) {
            bestResult = mixResult;
            bestCombination = combo;
        }
    }

    if (!bestResult || !bestCombination) {
        throw new Error('No valid mixture found with given ingredients.');
    }

    return {
        ingredientCodes: bestCombination,
        result: bestResult,
    };
};

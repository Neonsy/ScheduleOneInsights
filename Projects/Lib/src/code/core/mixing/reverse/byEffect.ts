import type { EffectCode } from '@/code/types/effects/Effect';
import { NO_SOLUTION_FOUND_ERROR, type NoSolutionFoundError } from '@/code/types/errors/MixingError';
import { type ProductNotFoundProdError } from '@/code/types/errors/ProductError';
import { type UtilError } from '@/code/types/errors/UtilError';
import type { Ingredient } from '@/code/types/products/Ingredient';
import type { ProductCode } from '@/code/types/products/Product';
import { Result, err, ok } from 'neverthrow';

import { mixProduct } from '@/code/core/mixing/normal/algorithm';
import { ingredients as allIngredientsData } from '@/code/data/products/ingredients';
import type { CheapestReverseMixResult, ReverseSearchStats } from '@/code/types/mixing/ReverseMixResult';
import {
    calculateIngredientCost,
    doEffectsMatchTarget,
    getSortedEffectCodesFromNames,
} from '@/code/utils/mixing/reverseHelpers';
import { findProductByCode } from '@/code/utils/products/productUtils';

// The old ReverseSolution and ReverseByEffectResult might be deprecated or changed.
// For now, defining a new success type.
export interface ReverseByEffectSuccess {
    readonly result: CheapestReverseMixResult;
    readonly stats: ReverseSearchStats;
}

const ALL_AVAILABLE_INGREDIENT_CODES: ReadonlyArray<Ingredient['code']> = allIngredientsData.map((ing) => ing.code);

/**
 * Safeguard limit for the maximum search depth to prevent infinite loops
 * or excessively long searches if no solution is found quickly.
 * Chosen based on typical game limits (e.g., max effects).
 */
const MAX_SEARCH_DEPTH_SAFEGUARD: number = 8;

/**
 * Finds the cheapest ingredient combination that yields the specified effects
 * for a given product. It iteratively deepens the search and stops at the first
 * depth a solution is found, as that solution will be the cheapest.
 * The search is capped by an internal safeguard limit.
 *
 * @param productCode - The code of the product to reverse.
 * @param targetEffectCodes - The target effect codes that must be present.
 * @returns A Result containing ReverseByEffectSuccess if a solution is found,
 *          or a MixingError if an error occurs or no solution is found.
 */
export function reverseByEffect(
    productCode: ProductCode,
    targetEffectCodes: EffectCode[]
): Result<ReverseByEffectSuccess, ProductNotFoundProdError | NoSolutionFoundError | UtilError> {
    const productResult = findProductByCode(productCode);

    if (productResult.isErr()) {
        return err(productResult.error);
    }
    const product = productResult.value;

    const sortedTargetEffectCodes = [...targetEffectCodes].sort();
    const desiredEffectsSet = new Set(sortedTargetEffectCodes);
    const ingredientDataMap = new Map<Ingredient['code'], Ingredient>(allIngredientsData.map((ing) => [ing.code, ing]));

    let pathsExplored = 0;
    let solutionsFound = 0;
    let cheapestCost = Infinity;
    let cheapestSequence: Ingredient['code'][] | null = null;
    const foundSolutionSequencesAtDepth = new Set<string>();
    let actualMaxDepthSearched = 0;

    function findSequencesOfLengthK(
        currentSequence: Ingredient['code'][],
        targetSequenceLength: number
    ): Result<void, UtilError> {
        pathsExplored++;

        const costResult = calculateIngredientCost(currentSequence);
        if (costResult.isErr()) {
            return err(costResult.error);
        }
        const currentCost = costResult.value;

        if (currentCost >= cheapestCost) {
            return ok(undefined);
        }

        if (currentSequence.length === targetSequenceLength) {
            const solutionKey = currentSequence.join(',');
            if (foundSolutionSequencesAtDepth.has(solutionKey)) {
                return ok(undefined);
            }

            const mixResult = mixProduct(product.code, currentSequence);
            const actualEffectCodesSortedResult = getSortedEffectCodesFromNames(mixResult.effects);

            if (actualEffectCodesSortedResult.isErr()) {
                return err(actualEffectCodesSortedResult.error);
            }
            const actualEffectCodesSorted = actualEffectCodesSortedResult.value;

            if (doEffectsMatchTarget(actualEffectCodesSorted, desiredEffectsSet)) {
                solutionsFound++;
                if (targetSequenceLength > 0) {
                    foundSolutionSequencesAtDepth.add(solutionKey);
                }
                cheapestCost = currentCost;
                cheapestSequence = [...currentSequence];
            }
            return ok(undefined);
        }

        if (currentSequence.length < targetSequenceLength) {
            for (const nextIngredientCode of ALL_AVAILABLE_INGREDIENT_CODES) {
                currentSequence.push(nextIngredientCode);

                const nextCostResult = calculateIngredientCost(currentSequence);
                if (nextCostResult.isErr()) {
                    currentSequence.pop();
                    return err(nextCostResult.error);
                }
                if (nextCostResult.value < cheapestCost) {
                    const searchResult = findSequencesOfLengthK(currentSequence, targetSequenceLength);
                    if (searchResult.isErr()) {
                        currentSequence.pop();
                        return err(searchResult.error);
                    }
                }
                currentSequence.pop();
            }
        }
        return ok(undefined);
    }

    for (let currentSearchDepth = 0; currentSearchDepth <= MAX_SEARCH_DEPTH_SAFEGUARD; currentSearchDepth++) {
        actualMaxDepthSearched = currentSearchDepth;
        foundSolutionSequencesAtDepth.clear();

        const searchIterationResult = findSequencesOfLengthK([], currentSearchDepth);
        if (searchIterationResult.isErr()) {
            return err(searchIterationResult.error);
        }

        if (cheapestSequence !== null) {
            break;
        }
    }

    const stats: ReverseSearchStats = {
        maxDepthSearched: actualMaxDepthSearched,
        pathsExplored,
        solutionsFound,
    };

    if (cheapestSequence !== null) {
        const finalMixResult = mixProduct(productCode, cheapestSequence);
        const codes = cheapestSequence as Ingredient['code'][];
        const ingredientNames = codes.map((code: Ingredient['code']) => {
            const ing = ingredientDataMap.get(code);
            return ing ? ing.name : `Unknown Ingredient (${code})`;
        });

        const cheapestResultData: CheapestReverseMixResult = {
            ...finalMixResult,
            productCode: productCode,
            ingredientNames: ingredientNames,
        };
        return ok({
            result: cheapestResultData,
            stats: stats,
        });
    } else {
        const errorDetail: NoSolutionFoundError = {
            type: NO_SOLUTION_FOUND_ERROR,
            message: `No solution found for product "${productCode}" with desired effects.`,
            context: {
                productCode: productCode,
                desiredEffectCodes: sortedTargetEffectCodes,
            },
        };
        return err(errorDetail);
    }
}

import type { EffectCode } from '@/code/types/effects/Effect';
import { NO_SOLUTION_FOUND_ERROR, type NoSolutionFoundError } from '@/code/types/errors/MixingError';
import { type ProductNotFoundProdError } from '@/code/types/errors/ProductError';
import { type UtilError, type EffectNameNotFoundUtilError } from '@/code/types/errors/UtilError';
import type { Ingredient } from '@/code/types/products/Ingredient';
import type { Product, ProductCode } from '@/code/types/products/Product';
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
    let pathsExplored = 0;
    let solutionsFound = 0;
    let cheapestCost = Infinity;
    let cheapestSequence: Ingredient['code'][] | null = null;
    const foundSolutionSequencesAtDepth = new Set<string>();

    function findSequencesRecursive(
        currentProd: Product,
        currentSequence: Ingredient['code'][],
        targetSequenceLength: number,
        desiredEffectsSet: Set<EffectCode>
    ): Result<void, UtilError> {
        pathsExplored++;

        return calculateIngredientCost(currentSequence).andThen((currentCost) => {
            if (currentCost >= cheapestCost) {
                return ok<void, never>(undefined);
            }

            if (currentSequence.length === targetSequenceLength) {
                const solutionKey = currentSequence.join(',');
                if (foundSolutionSequencesAtDepth.has(solutionKey)) {
                    return ok<void, never>(undefined);
                }

                const mixResult = mixProduct(currentProd.code, currentSequence);
                return getSortedEffectCodesFromNames(mixResult.effects).andThen<void, EffectNameNotFoundUtilError>(
                    (actualEffectCodesSorted) => {
                        if (doEffectsMatchTarget(actualEffectCodesSorted, desiredEffectsSet)) {
                            solutionsFound++;
                            if (targetSequenceLength > 0) {
                                foundSolutionSequencesAtDepth.add(solutionKey);
                            }
                            cheapestCost = currentCost;
                            cheapestSequence = [...currentSequence];
                        }
                        return ok<void, never>(undefined);
                    }
                );
            }

            let overallLoopError: UtilError | null = null;
            for (const nextIngredientCode of ALL_AVAILABLE_INGREDIENT_CODES) {
                currentSequence.push(nextIngredientCode);

                calculateIngredientCost(currentSequence)
                    .andThen((nextCost) => {
                        if (nextCost < cheapestCost) {
                            return findSequencesRecursive(
                                currentProd,
                                currentSequence,
                                targetSequenceLength,
                                desiredEffectsSet
                            );
                        }
                        return ok<void, never>(undefined);
                    })
                    .match(
                        () => {
                            /* OK, loop continues */
                        },
                        (iterationErr: UtilError) => {
                            overallLoopError = iterationErr;
                        }
                    );

                currentSequence.pop();

                if (overallLoopError) {
                    break;
                }
            }
            if (overallLoopError) {
                return err<never, UtilError>(overallLoopError);
            }
            return ok<void, never>(undefined);
        });
    }

    return findProductByCode(productCode).andThen((product: Product) => {
        const sortedTargetEffectCodes = [...targetEffectCodes].sort();
        const desiredEffectsSet = new Set(sortedTargetEffectCodes);
        let actualMaxDepthSearched = 0;

        for (let currentSearchDepth = 0; currentSearchDepth <= MAX_SEARCH_DEPTH_SAFEGUARD; currentSearchDepth++) {
            actualMaxDepthSearched = currentSearchDepth;
            foundSolutionSequencesAtDepth.clear();

            const iterationResult = findSequencesRecursive(product, [], currentSearchDepth, desiredEffectsSet);
            let loopShouldReturnError: UtilError | null = null;
            iterationResult.match(
                () => {
                    if (cheapestSequence !== null) {
                        // Break outer for-loop: achieved by returning a specific non-error signal, or setting a flag.
                        // For simplicity, we'll rely on the cheapestSequence !== null check below loop.
                    }
                },
                (iterErr) => {
                    loopShouldReturnError = iterErr;
                }
            );

            if (loopShouldReturnError) {
                return err(loopShouldReturnError);
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
            const ingredientDataMap = new Map<Ingredient['code'], Ingredient>(
                allIngredientsData.map((ing) => [ing.code, ing])
            );
            const finalMixResult = mixProduct(productCode, cheapestSequence);
            const codes = cheapestSequence;
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
    });
}

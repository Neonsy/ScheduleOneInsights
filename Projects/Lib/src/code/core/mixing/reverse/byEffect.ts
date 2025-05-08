import type { Product } from '@/code/types/products/Product';
import type { Ingredient } from '@/code/types/products/Ingredient';
import type { ProductCode } from '@/code/types/products/Product';
import type { EffectCode } from '@/code/types/effects/Effect';

import { ingredients as allIngredientsData } from '@/code/data/products/ingredients';

import { findProductByCode } from '@/code/utils/products/productUtils';
import { mixProduct } from '@/code/core/mixing/normal/algorithm';
import {
    calculateIngredientCost,
    getSortedEffectCodesFromNames,
    doEffectsMatchTarget,
} from '@/code/utils/mixing/reverseHelpers';
import type {
    CheapestReverseMixResult,
    ReverseSearchStats,
    ReverseByEffectOutcome,
} from '@/code/types/mixing/ReverseMixResult';

interface ReverseSolution {
    ingredients: Ingredient['code'][];
}

/**
 * The result of reversing a product by target effect codes.
 */
export interface ReverseByEffectResult {
    /** The product code for which solutions were found */
    productCode: ProductCode;
    /** The desired effect codes being targeted */
    desiredEffectCodes: EffectCode[];
    solutions: ReverseSolution[];
    searchStats: {
        maxDepthSearched: number;
        pathsExplored: number;
        solutionsFound: number;
    };
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
 * @returns A ReverseByEffectOutcome indicating if a solution was found,
 *          containing the single cheapest result if found within the limits.
 */
export function reverseByEffect(productCode: ProductCode, targetEffectCodes: EffectCode[]): ReverseByEffectOutcome {
    let product: Product;
    try {
        product = findProductByCode(productCode);
    } catch (error) {
        // console.error is acceptable for unrecoverable issues per some style guides,
        // but ensure this aligns with overall project logging strategy.
        console.error(`[reverseByEffect] Failed to find product: ${productCode}`, error);
        return {
            found: false,
            productCode,
            desiredEffectCodes: targetEffectCodes,
            stats: { maxDepthSearched: 0, pathsExplored: 0, solutionsFound: 0 },
        };
    }

    // Pre-process target effects for efficient lookup
    const sortedTargetEffectCodes = [...targetEffectCodes].sort();
    const desiredEffectsSet = new Set(sortedTargetEffectCodes);

    // Prepare a map for quick ingredient data lookup (e.g., for names)
    const ingredientDataMap = new Map<Ingredient['code'], Ingredient>(allIngredientsData.map((ing) => [ing.code, ing]));

    let pathsExplored = 0;
    let solutionsFound = 0; // Total valid solutions encountered, useful for stats
    let cheapestCost = Infinity;
    let cheapestSequence: Ingredient['code'][] | null = null;
    // Tracks unique ingredient sequences at their respective depths to avoid redundant mix calculations
    // if different permutations lead to the same sequence at the same depth.
    const foundSolutionSequencesAtDepth = new Set<string>();
    let actualMaxDepthSearched = 0;

    function findSequencesOfLengthK(currentSequence: Ingredient['code'][], targetSequenceLength: number) {
        pathsExplored++;

        const currentCost = calculateIngredientCost(currentSequence);
        // Pruning: If the current path's cost already equals or exceeds the cheapest solution found so far,
        // no need to explore this path further.
        if (currentCost >= cheapestCost) {
            return;
        }

        if (currentSequence.length === targetSequenceLength) {
            const solutionKey = currentSequence.join(',');
            // Avoid re-evaluating the same sequence if it has already been processed at this depth.
            if (foundSolutionSequencesAtDepth.has(solutionKey)) {
                return;
            }

            const mixResult = mixProduct(product.code, currentSequence);
            const actualEffectCodesSorted = getSortedEffectCodesFromNames(mixResult.effects);

            if (doEffectsMatchTarget(actualEffectCodesSorted, desiredEffectsSet)) {
                // This sequence produces the desired effects.
                solutionsFound++;
                if (targetSequenceLength > 0) {
                    // Don't mark empty sequence as a "found" solution sequence
                    foundSolutionSequencesAtDepth.add(solutionKey);
                }

                // Since currentCost < cheapestCost (due to the prune check), this is a new cheapest solution.
                cheapestCost = currentCost;
                cheapestSequence = [...currentSequence]; // Store a copy of the new cheapest sequence
            }
            return; // Reached target depth for this path.
        }

        // Recursive step: Explore adding one more ingredient if current length is less than target.
        // The pruning check at the beginning of this function will handle costs for the next level.
        if (currentSequence.length < targetSequenceLength) {
            for (const nextIngredientCode of ALL_AVAILABLE_INGREDIENT_CODES) {
                currentSequence.push(nextIngredientCode);
                // Pre-emptive cost check before recursion
                if (calculateIngredientCost(currentSequence) < cheapestCost) {
                    findSequencesOfLengthK(currentSequence, targetSequenceLength);
                }
                currentSequence.pop(); // Backtrack to explore other ingredients at this position.
            }
        }
    }

    // Iterative Deepening Depth-First Search (IDDFS)
    // Explores all sequences of length 0, then 1, then 2, and so on.
    for (let currentSearchDepth = 0; currentSearchDepth <= MAX_SEARCH_DEPTH_SAFEGUARD; currentSearchDepth++) {
        actualMaxDepthSearched = currentSearchDepth;
        foundSolutionSequencesAtDepth.clear(); // Reset for the new depth level

        findSequencesOfLengthK([], currentSearchDepth);

        // Optimization: If any solution has been found after completing the search for currentSearchDepth,
        // that solution (stored in cheapestSequence) must be the overall cheapest.
        // This is because IDDFS explores shortest sequences first, and ingredient costs are non-negative.
        // Thus, no sequence explored at a greater depth (currentSearchDepth + 1) can be cheaper.
        if (cheapestSequence !== null) {
            break; // Exit the loop, the cheapest possible solution is found.
        }
    }

    const stats: ReverseSearchStats = {
        maxDepthSearched: actualMaxDepthSearched,
        pathsExplored,
        solutionsFound,
    };

    if (cheapestSequence !== null) {
        const finalMixResult = mixProduct(productCode, cheapestSequence);
        // Explicitly assert the type of cheapestSequence before mapping
        const codes = cheapestSequence as Ingredient['code'][];
        const ingredientNames = codes.map((code: Ingredient['code']) => {
            const ing = ingredientDataMap.get(code);
            return ing ? ing.name : `Unknown Ingredient (${code})`; // Fallback for safety
        });

        // Note: The type CheapestReverseMixResult has been updated to expect 'ingredientNames'.
        const cheapestResult: CheapestReverseMixResult = {
            ...finalMixResult,
            productCode: productCode,
            ingredientNames: ingredientNames, // Changed from ingredientCodes
        };
        return {
            found: true,
            result: cheapestResult,
            stats: stats,
        };
    } else {
        return {
            found: false,
            productCode: productCode,
            desiredEffectCodes: sortedTargetEffectCodes, // Return the original sorted target effects
            stats: stats,
        };
    }
}

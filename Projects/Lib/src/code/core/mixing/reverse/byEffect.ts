import type { Effect } from '@/code/types/effects/Effect';
import type { Product } from '@/code/types/products/Product';
import type { Ingredient } from '@/code/types/products/Ingredient';

import { ingredients as allIngredientsData } from '@/code/data/products/ingredients';
import { findProductByCode } from '@/code/utils/products/productUtils';
import { findEffectByName } from '@/code/utils/effects/effectUtils';
import { mixProduct } from '@/code/core/mixing/normal/algorithm';

interface ReverseSolution {
    ingredients: Ingredient['code'][];
    // finalMixResult?: MixResult; // Optional: Uncomment if full mix details are needed per solution
}

export interface ReverseByEffectResult {
    productCode: Product['code'];
    desiredEffectCodes: Effect['code'][];
    solutions: ReverseSolution[];
    searchStats: {
        maxDepthSearched: number;
        pathsExplored: number;
        solutionsFound: number;
    };
}

const ALL_AVAILABLE_INGREDIENT_CODES: ReadonlyArray<Ingredient['code']> = allIngredientsData.map(
    (ing: Ingredient) => ing.code
);

export function reverseByEffect(
    productCode: Product['code'],
    targetEffectCodes: Effect['code'][],
    maxIngredientsToTry: number = 3
): ReverseByEffectResult {
    let product: Product;
    try {
        product = findProductByCode(productCode);
    } catch (error) {
        console.error(`[reverseByEffect] Failed to find product: ${productCode}`, error);
        return {
            productCode,
            desiredEffectCodes: targetEffectCodes,
            solutions: [],
            searchStats: {
                maxDepthSearched: 0,
                pathsExplored: 0,
                solutionsFound: 0,
            },
        };
    }

    const sortedTargetEffectCodes = [...targetEffectCodes].sort();
    const desiredEffectsSet = new Set(sortedTargetEffectCodes);
    const solutions: ReverseSolution[] = [];
    let pathsExplored = 0;
    const foundSolutionSequences = new Set<string>();

    function getSortedEffectCodesFromNames(effectNames: Effect['name'][]): Effect['code'][] {
        return effectNames
            .map((name) => {
                try {
                    return findEffectByName(name);
                } catch (e) {
                    console.warn(
                        `[reverseByEffect] Effect name "${name}" from mixProduct result could not be converted to code: ${e}`
                    );
                    return `INVALID_EFFECT_NAME_TO_CODE_${name}`;
                }
            })
            .sort();
    }

    function doEffectsMatchTarget(actualSortedCodes: Effect['code'][], targetSet: Set<Effect['code']>): boolean {
        if (actualSortedCodes.length !== targetSet.size) {
            return false;
        }
        for (const code of actualSortedCodes) {
            if (!targetSet.has(code)) {
                return false;
            }
        }
        return true;
    }

    function findSequencesOfLengthK(currentSequence: Ingredient['code'][], k_target_length: number) {
        pathsExplored++;

        if (currentSequence.length === k_target_length) {
            const mixResult = mixProduct(product.code, currentSequence);
            const actualEffectCodesSorted = getSortedEffectCodesFromNames(mixResult.effects);

            if (doEffectsMatchTarget(actualEffectCodesSorted, desiredEffectsSet)) {
                const solutionKey = currentSequence.join(',');
                if (!foundSolutionSequences.has(solutionKey)) {
                    solutions.push({
                        ingredients: [...currentSequence],
                        // finalMixResult: mixResult, // Uncomment for full details
                    });
                    foundSolutionSequences.add(solutionKey);
                }
            }
            return;
        }

        if (currentSequence.length < k_target_length) {
            for (const nextIngredientCode of ALL_AVAILABLE_INGREDIENT_CODES) {
                currentSequence.push(nextIngredientCode);
                findSequencesOfLengthK(currentSequence, k_target_length);
                currentSequence.pop(); // Backtrack
            }
        }
    }

    for (let k = 0; k <= maxIngredientsToTry; k++) {
        findSequencesOfLengthK([], k);
        // Optional: Break early if only shortest solutions are needed
        // if (solutions.length > 0 && k < maxIngredientsToTry) {
        //   break;
        // }
    }

    return {
        productCode: product.code,
        desiredEffectCodes: sortedTargetEffectCodes,
        solutions,
        searchStats: {
            maxDepthSearched: maxIngredientsToTry,
            pathsExplored,
            solutionsFound: solutions.length,
        },
    };
}

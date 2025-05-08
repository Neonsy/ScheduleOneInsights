import { Result, err, ok } from 'neverthrow';

import { mixProduct } from '@/code/core/mixing/normal/algorithm';
import { ingredients as allIngredientsData } from '@/code/data/products/ingredients';
import { SimplePriorityQueue, getEffectsKey } from '@/code/lib/mixing/dijkstraHelpers';
import type { EffectCode } from '@/code/types/effects/Effect';
import { NO_SOLUTION_FOUND_ERROR, type NoSolutionFoundError } from '@/code/types/errors/MixingError';
import { type ProductNotFoundProdError } from '@/code/types/errors/ProductError';
import { type UtilError } from '@/code/types/errors/UtilError';
import type {
    CheapestReverseMixResult,
    ReverseMixSuccess,
    ReverseSearchStats,
} from '@/code/types/mixing/ReverseMixResult';
import type { Ingredient } from '@/code/types/products/Ingredient';
import type { ProductCode } from '@/code/types/products/Product';
import {
    calculateIngredientCost,
    doEffectsMatchTarget,
    getSortedEffectCodesFromNames,
} from '@/code/utils/mixing/reverseHelpers';
import { findProductByCode } from '@/code/utils/products/productUtils';

const ALL_INGREDIENT_CODES: ReadonlyArray<Ingredient['code']> = allIngredientsData.map((ing) => ing.code);
const MAX_EXPLORED_PATHS_SAFEGUARD = 500000;

export function reverseMixByEffect(
    productCode: ProductCode,
    targetEffectCodes: EffectCode[]
): Result<ReverseMixSuccess, ProductNotFoundProdError | NoSolutionFoundError | UtilError> {
    return findProductByCode(productCode).andThen((product) => {
        const initialMix = mixProduct(product.code, []);

        return getSortedEffectCodesFromNames(initialMix.effects).andThen((initialEffects) => {
            const initialEffectsKey = getEffectsKey(initialEffects);
            const initialSequence: ReadonlyArray<Ingredient['code']> = [];
            const initialCost = 0;

            const targetEffectsSet = new Set(targetEffectCodes);
            const pq = new SimplePriorityQueue();
            const minCosts = new Map<string, number>();
            let pathsExplored = 0;

            minCosts.set(initialEffectsKey, initialCost);
            pq.push({ cost: initialCost, sequence: initialSequence, effectsKey: initialEffectsKey });

            while (!pq.isEmpty()) {
                pathsExplored++;
                if (pathsExplored > MAX_EXPLORED_PATHS_SAFEGUARD) {
                    const safeguardError: NoSolutionFoundError = {
                        type: NO_SOLUTION_FOUND_ERROR,
                        message: `Search exceeded safeguard limit (${MAX_EXPLORED_PATHS_SAFEGUARD} paths explored).`,
                        context: { productCode, desiredEffectCodes: targetEffectCodes },
                    };
                    return err(safeguardError);
                }

                const currentNode = pq.pop();
                if (!currentNode) break;

                const { cost: currentCost, sequence: currentSequence, effectsKey: currentEffectsKey } = currentNode;

                if (currentCost > (minCosts.get(currentEffectsKey) ?? Infinity)) {
                    continue;
                }

                const currentEffectsCodes = currentEffectsKey ? (currentEffectsKey.split(',') as EffectCode[]) : [];
                if (doEffectsMatchTarget(currentEffectsCodes, targetEffectsSet)) {
                    const finalMixResult = mixProduct(productCode, [...currentSequence]);
                    const ingredientDataMap = new Map<Ingredient['code'], Ingredient>(
                        allIngredientsData.map((ing) => [ing.code, ing])
                    );
                    const ingredientNames = currentSequence.map((code: Ingredient['code']) => {
                        const ing = ingredientDataMap.get(code);
                        return ing ? ing.name : `Unknown Ingredient (${code})`;
                    });
                    const cheapestResultData: CheapestReverseMixResult = {
                        ...finalMixResult,
                        productCode: productCode,
                        ingredientNames: ingredientNames,
                    };
                    const stats: ReverseSearchStats = {
                        pathsExplored,
                        solutionsFound: 1,
                    };
                    return ok<ReverseMixSuccess, never>({ result: cheapestResultData, stats });
                }

                for (const nextIngredientCode of ALL_INGREDIENT_CODES) {
                    const nextSequence = [...currentSequence, nextIngredientCode];
                    let propagatedError: UtilError | null = null;

                    const nextCost = calculateIngredientCost(nextSequence).match(
                        (cost) => cost,
                        (e) => {
                            propagatedError = e;
                            return -1; // Dummy value, error will be returned
                        }
                    );
                    if (propagatedError) return err(propagatedError);

                    const nextMix = mixProduct(product.code, nextSequence);

                    const nextEffects = getSortedEffectCodesFromNames(nextMix.effects).match(
                        (effects) => effects,
                        (e) => {
                            propagatedError = e;
                            return []; // Dummy value, error will be returned
                        }
                    );
                    if (propagatedError) return err(propagatedError);
                    const nextEffectsKey = getEffectsKey(nextEffects);

                    if (nextCost < (minCosts.get(nextEffectsKey) ?? Infinity)) {
                        minCosts.set(nextEffectsKey, nextCost);
                        pq.push({ cost: nextCost, sequence: Object.freeze(nextSequence), effectsKey: nextEffectsKey });
                    }
                }
            }

            const errorDetail: NoSolutionFoundError = {
                type: NO_SOLUTION_FOUND_ERROR,
                message: `No solution found for product "${productCode}" with desired effects after exploring ${pathsExplored} paths.`,
                context: { productCode, desiredEffectCodes: targetEffectCodes },
            };
            return err(errorDetail);
        });
    });
}

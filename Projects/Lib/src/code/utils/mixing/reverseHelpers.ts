import { findIngredientByCode } from '@/code/utils/products/ingredientUtils';
import { findEffectByName } from '@/code/utils/effects/effectUtils';
import type { Ingredient } from '@/code/types/products/Ingredient';
import type { Effect, EffectCode } from '@/code/types/effects/Effect';
import { type EffectNameNotFoundUtilError, type IngredientNotFoundUtilError } from '@/code/types/errors/UtilError';
import { Result, err, ok } from 'neverthrow';

export function calculateIngredientCost(
    ingredientCodes: Ingredient['code'][]
): Result<number, IngredientNotFoundUtilError> {
    let totalCost = 0;
    for (const code of ingredientCodes) {
        const ingredientResult = findIngredientByCode(code);

        if (ingredientResult.isErr()) {
            return err(ingredientResult.error);
        }
        totalCost += ingredientResult.value.price;
    }
    return ok(totalCost);
}

export function getSortedEffectCodesFromNames(
    effectNames: Effect['name'][]
): Result<EffectCode[], EffectNameNotFoundUtilError> {
    const codes: EffectCode[] = [];
    for (const name of effectNames) {
        const effectCodeResult = findEffectByName(name);

        if (effectCodeResult.isErr()) {
            return err(effectCodeResult.error);
        }
        codes.push(effectCodeResult.value);
    }
    return ok(codes.sort());
}

export function doEffectsMatchTarget(actualSortedCodes: EffectCode[], targetSet: Set<EffectCode>): boolean {
    if (targetSet.size === 0) return true;
    if (actualSortedCodes.length < targetSet.size) return false;
    const actualCodesSet = new Set(actualSortedCodes);
    for (const targetCode of targetSet) {
        if (!actualCodesSet.has(targetCode)) return false;
    }
    return true;
}

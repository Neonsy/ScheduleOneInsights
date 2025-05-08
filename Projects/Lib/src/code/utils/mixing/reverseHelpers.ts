import { findIngredientByCode } from '@/code/utils/products/ingredientUtils';
import { findEffectByName } from '@/code/utils/effects/effectUtils';
import type { Ingredient } from '@/code/types/products/Ingredient';
import type { Effect, EffectCode } from '@/code/types/effects/Effect';
import { type EffectNameNotFoundUtilError, type IngredientNotFoundUtilError } from '@/code/types/errors/UtilError';
import { Result } from 'neverthrow';

export function calculateIngredientCost(
    ingredientCodes: Ingredient['code'][]
): Result<number, IngredientNotFoundUtilError> {
    const ingredientResults: Result<Ingredient, IngredientNotFoundUtilError>[] =
        ingredientCodes.map(findIngredientByCode);

    // Combine results. If any error, return the first error.
    return Result.combine(ingredientResults).map((ingredients) => {
        // ingredients is Ingredient[]
        return ingredients.reduce((sum, ing) => sum + ing.price, 0);
    });
}

export function getSortedEffectCodesFromNames(
    effectNames: Effect['name'][]
): Result<EffectCode[], EffectNameNotFoundUtilError> {
    const effectCodeResults: Result<EffectCode, EffectNameNotFoundUtilError>[] = effectNames.map(findEffectByName);

    return Result.combine(effectCodeResults).map((codes) => {
        // codes is EffectCode[]
        return codes.sort();
    });
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

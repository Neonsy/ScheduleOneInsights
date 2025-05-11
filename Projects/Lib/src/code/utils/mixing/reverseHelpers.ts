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

export function doEffectsMatchTarget(
    actualSortedCodes: ReadonlyArray<EffectCode>,
    targetSet: Set<EffectCode>
): boolean {
    // Check if the number of actual effects exactly matches the number of target effects
    if (actualSortedCodes.length !== targetSet.size) {
        return false;
    }
    // If sizes match, proceed to check if all target effects are present
    // (no need to create actualCodesSet if sizes match, we can iterate)
    const actualCodesSet = new Set(actualSortedCodes); // Still efficient to use Set for lookups
    for (const targetCode of targetSet) {
        if (!actualCodesSet.has(targetCode)) {
            // Should not happen if sizes match and all targets are unique, but safe check
            return false;
        }
    }
    // If sizes match and all target codes are present, it's an exact match
    return true;
}

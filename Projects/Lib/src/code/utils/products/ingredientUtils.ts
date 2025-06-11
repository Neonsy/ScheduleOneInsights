/**
 * Ingredient utility functions
 */
import { ingredients } from '@/code/data/products/ingredients';
import { type IngredientNotFoundUtilError, INGREDIENT_NOT_FOUND_UTIL_ERROR } from '@/code/types/errors/UtilError';
import type { Ingredient } from '@/code/types/products/Ingredient';
import { Result, err, ok } from 'neverthrow';

// Performance: Precompute ingredient lookup map for constant-time access
const ingredientByCodeMap: Map<Ingredient['code'], Ingredient> = new Map(
    ingredients.map((i: Ingredient) => [i.code, i])
);

/**
 * Find an ingredient by its code
 * @param code The ingredient code to find
 * @returns A Result containing the Ingredient if found, or an IngredientNotFoundUtilError if not.
 */
export const findIngredientByCode = (code: Ingredient['code']): Result<Ingredient, IngredientNotFoundUtilError> => {
    const ingredient = ingredientByCodeMap.get(code);
    if (!ingredient) {
        return err({
            type: INGREDIENT_NOT_FOUND_UTIL_ERROR,
            message: `Ingredient not found with code: ${code}`,
            context: { ingredientCode: code },
        });
    }
    return ok(ingredient);
};

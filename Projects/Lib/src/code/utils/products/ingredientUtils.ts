/**
 * Ingredient utility functions
 */
import { ingredients } from '@/code/data/products/ingredients';
import type { Ingredient } from '@/code/types/products/Ingredient';

// Performance: Precompute ingredient lookup map for constant-time access
const ingredientByCodeMap: Map<Ingredient['code'], Ingredient> = new Map(
    ingredients.map((i: Ingredient) => [i.code, i])
);

/**
 * Find an ingredient by its code
 * @param code The ingredient code to find
 * @returns The ingredient with the matching code
 * @throws Error if the ingredient is not found
 */
export const findIngredientByCode = (code: Ingredient['code']): Ingredient => {
    const ingredient = ingredientByCodeMap.get(code);
    if (!ingredient) {
        throw new Error(`Ingredient not found: ${code}`);
    }
    // The ingredients data is defined in our codebase and we know it conforms to our Ingredient interface
    // TypeScript just can't verify this automatically due to the readonly constraints from 'as const'
    return ingredient;
};

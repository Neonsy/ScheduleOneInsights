/**
 * Ingredient utility functions
 */
import { ingredients } from '@/data/ingredients';

/**
 * Find an ingredient by its code
 * @param code The ingredient code to find
 * @returns The ingredient with the matching code
 * @throws Error if the ingredient is not found
 */
export const findIngredientByCode = (code: string) => {
    const ingredient = ingredients.find((i) => i.code === code);
    if (!ingredient) {
        throw new Error(`Ingredient not found: ${code}`);
    }
    // The ingredients data is defined in our codebase and we know it conforms to our Ingredient interface
    // TypeScript just can't verify this automatically due to the readonly constraints from 'as const'
    return ingredient;
};

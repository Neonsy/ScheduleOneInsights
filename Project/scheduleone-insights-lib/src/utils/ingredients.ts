import { ingredients } from '../data/ingredients';
import { IngredientCode } from '../types';

/**
 * Get ingredient code by name
 * @param name - The name of the ingredient
 * @returns The code of the ingredient, or undefined if not found
 */
export function getIngredientCode(name: string): IngredientCode | undefined {
    const ingredient = ingredients[name as keyof typeof ingredients];
    return ingredient ? (ingredient.code as IngredientCode) : undefined;
}

/**
 * Get ingredient name by code
 * @param code - The code of the ingredient
 * @returns The name of the ingredient, or undefined if not found
 */
export function getIngredientName(code: IngredientCode): string | undefined {
    for (const [name, ingredient] of Object.entries(ingredients)) {
        if (ingredient.code === code) {
            return name;
        }
    }
    return undefined;
}

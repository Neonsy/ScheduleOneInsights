import { Product } from '@/types/Product';
import { Ingredient } from '@/types/Ingredient';
import { Buffer } from 'buffer';
import { RecipePayload } from '@/types/RecipePayload';

/**
 * Encode a recipe (product + ingredients) into a deterministic Base64 string.
 * Order of ingredients is preserved, so the same recipe always yields the same string.
 */
export function encodeRecipe(productCode: Product['code'], ingredientCodes: Ingredient['code'][]): string {
    const payload: RecipePayload = { productCode, ingredientCodes };
    const json = JSON.stringify(payload);
    return Buffer.from(json, 'utf-8').toString('base64');
}

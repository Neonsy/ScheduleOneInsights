import { RecipePayload } from '@/code/types/mixing/RecipePayload';
import { Ingredient } from '@/code/types/products/Ingredient';
import { Product } from '@/code/types/products/Product';
import { Buffer } from 'buffer';

/**
 * Encode a recipe (product + ingredients) into a deterministic Base64 string.
 * Order of ingredients is preserved, so the same recipe always yields the same string.
 * @param productCode - The code of the base product.
 * @param ingredientCodes - Ordered list of ingredient codes.
 * @returns The Base64-encoded recipe string.
 */
export function encodeRecipe(productCode: Product['code'], ingredientCodes: Ingredient['code'][]): string {
    const payload: RecipePayload = { productCode, ingredientCodes };
    const json = JSON.stringify(payload);
    return Buffer.from(json, 'utf-8').toString('base64');
}

import { Buffer } from 'buffer';
import { RecipePayload } from '@/code/types/mixing/RecipePayload';

/**
 * Decode a deterministic Base64-encoded recipe string back into its original product
 * and ingredient codes.
 * @param seed - Base64-encoded recipe string to decode.
 * @returns The decoded RecipePayload containing productCode and ingredientCodes.
 */
export function decodeRecipe(seed: string): RecipePayload {
    // Decode from Base64 to UTF-8 JSON
    const json = Buffer.from(seed, 'base64').toString('utf-8');

    // Parse JSON into our typed payload
    const payload = JSON.parse(json) as RecipePayload;

    return payload;
}

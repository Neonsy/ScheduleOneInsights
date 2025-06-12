import { Buffer } from 'buffer';
import { RecipePayload } from '@/code/types/mixing/RecipePayload';
import { Result, err, ok } from 'neverthrow';
import type { SeedDecodeError } from '@/code/types/errors/SeedError';
import { SEED_DECODE_ERROR } from '@/code/types/errors/SeedError';

/**
 * Decode a deterministic Base64-encoded recipe string back into its original product
 * and ingredient codes.
 * @param seed - Base64-encoded recipe string to decode.
 * @returns The decoded RecipePayload containing productCode and ingredientCodes.
 */
export function decodeRecipeCore(seed: string): RecipePayload {
    // Decode from Base64 to UTF-8 JSON
    const json = Buffer.from(seed, 'base64').toString('utf-8');

    // Parse JSON into our typed payload
    const payload = JSON.parse(json) as RecipePayload;

    return payload;
}

export function decodeRecipe(seed: string): Result<RecipePayload, SeedDecodeError> {
    try {
        return ok(decodeRecipeCore(seed));
    } catch (e) {
        const error = e as Error;
        return err({ type: SEED_DECODE_ERROR, message: error.message, context: { seed } });
    }
}

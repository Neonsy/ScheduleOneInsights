import type { EffectCode, IngredientCode, MixState, ProductCode } from '../types';

/**
 * Generate a deterministic seed for a mix
 * @param mixState - The mix state to generate a seed for
 * @param effects - The effects produced by the mix
 * @returns A seed string
 */
export function generateSeed(mixState: MixState, effects: EffectCode[]): string {
    const { product, ingredients } = mixState;

    // Sort effects to ensure consistent seed generation
    const sortedEffects = [...effects].sort();

    // Create a string format with product, effects, and ingredients
    return `${product}|${sortedEffects.join(',')}|${ingredients.join(',')}`;
}

/**
 * Parse a seed into a mix state
 * @param seed - The seed to parse
 * @returns The mix state, or null if the seed is invalid
 */
export function parseSeed(seed: string): MixState | null {
    try {
        // Split the seed by the pipe character
        const parts = seed.split('|');

        // We need at least product and ingredients
        if (parts.length < 2) {
            return null;
        }

        const [product, effectsStr, ingredientsStr] = parts;

        // If we have the new format with effects
        if (parts.length >= 3) {
            const ingredients = ingredientsStr.split(',');
            return {
                product: product as ProductCode,
                ingredients: ingredients as IngredientCode[],
            };
        }
        // Backward compatibility with old format
        else {
            const ingredients = effectsStr.split(','); // In old format, this was ingredients
            return {
                product: product as ProductCode,
                ingredients: ingredients as IngredientCode[],
            };
        }
    } catch (error) {
        return null;
    }
}

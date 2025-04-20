/**
 * Effect utility functions
 */
import { effects } from '@/data/effects';

/**
 * Find an effect by name and return its code
 * @param name The name of the effect to find
 * @returns The code of the effect
 * @throws Error if the effect is not found
 */
export const findEffectByName = (name: string): string => {
    const effect = effects.find((e) => e.name === name);
    if (!effect) {
        throw new Error(`Effect not found: ${name}`);
    }
    return effect.code;
};

/**
 * Find an effect by its code
 * @param code The effect code to find
 * @returns The effect with the matching code
 * @throws Error if the effect is not found
 */
export const findEffectByCode = (code: string) => {
    const effect = effects.find((e) => e.code === code);
    if (!effect) {
        throw new Error(`Effect not found: ${code}`);
    }
    // The effects data is defined in our codebase and we know it conforms to our Effect interface
    // TypeScript just can't verify this automatically due to the readonly constraints from 'as const'
    return effect;
};

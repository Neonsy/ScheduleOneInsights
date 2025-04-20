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

/**
 * Effect utility functions
 */
import { effects } from '@/code/data/effects/effects';
import type { Effect } from '@/code/types/effects/Effect';

// Performance: Precompute effect lookup maps for constant-time access
const effectByCodeMap: Map<Effect['code'], Effect> = new Map(effects.map((e: Effect) => [e.code, e]));
const effectByNameMap: Map<Effect['name'], Effect> = new Map(effects.map((e: Effect) => [e.name, e]));

/**
 * Find an effect by name and return its code
 * @param name The name of the effect to find (must be a valid Effect name)
 * @returns The code of the effect
 * @throws Error if the effect is not found
 */
export const findEffectByName = (name: Effect['name']): Effect['code'] => {
    const effect = effectByNameMap.get(name);
    if (!effect) {
        throw new Error(`Effect not found: ${name}`);
    }
    return effect.code;
};

/**
 * Find an effect by its code
 * @param code The effect code to find (must be a valid Effect code)
 * @returns The effect with the matching code
 * @throws Error if the effect is not found
 */
export const findEffectByCode = (code: Effect['code']): Effect => {
    const effect = effectByCodeMap.get(code);
    if (!effect) {
        throw new Error(`Effect not found: ${code}`);
    }
    // The effects data is defined in our codebase and we know it conforms to our Effect interface
    // TypeScript just can't verify this automatically due to the readonly constraints from 'as const'
    return effect;
};

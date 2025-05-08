/**
 * Effect utility functions
 */
import { effects } from '@/code/data/effects/effects';
import type { Effect } from '@/code/types/effects/Effect';
import type { EffectCode } from '@/code/types/effects/Effect';

// Performance: Precompute effect lookup maps for constant-time access
const effectByCodeMap: Map<EffectCode, Effect> = new Map(effects.map((e: Effect) => [e.code as EffectCode, e]));
const effectByNameMap: Map<Effect['name'], Effect> = new Map(effects.map((e: Effect) => [e.name, e]));

/**
 * Find an effect by name and return its code literal
 * @param name The name of the effect to find
 * @returns The code of the effect as EffectCode
 * @throws Error if the effect is not found
 */
export const findEffectByName = (name: Effect['name']): EffectCode => {
    const effect = effectByNameMap.get(name);
    if (!effect) {
        throw new Error(`Effect not found: ${name}`);
    }
    return effect.code as EffectCode;
};

/**
 * Find an effect by its code literal
 * @param code The effect code to find
 * @returns The effect with the matching code
 * @throws Error if the effect is not found
 */
export const findEffectByCode = (code: EffectCode): Effect => {
    const effect = effectByCodeMap.get(code);
    if (!effect) {
        throw new Error(`Effect not found: ${code}`);
    }
    // The effects data is defined in our codebase and we know it conforms to our Effect interface
    // TypeScript just can't verify this automatically due to the readonly constraints from 'as const'
    return effect;
};

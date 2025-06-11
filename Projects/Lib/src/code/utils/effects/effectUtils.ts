/**
 * Effect utility functions
 */
import { effects } from '@/code/data/effects/effects';
import type { Effect, EffectCode } from '@/code/types/effects/Effect';
import {
    type EffectCodeNotFoundUtilError,
    type EffectNameNotFoundUtilError,
    EFFECT_CODE_NOT_FOUND_UTIL_ERROR,
    EFFECT_NAME_NOT_FOUND_UTIL_ERROR,
} from '@/code/types/errors/UtilError';
import { Result, err, ok } from 'neverthrow';

// Performance: Precompute effect lookup maps for constant-time access
const effectByCodeMap: Map<EffectCode, Effect> = new Map(effects.map((e: Effect) => [e.code, e]));
const effectByNameMap: Map<Effect['name'], Effect> = new Map(effects.map((e: Effect) => [e.name, e]));

/**
 * Find an effect by name and return its code literal
 * @param name The name of the effect to find
 * @returns A Result containing the EffectCode if found, or an EffectNameNotFoundUtilError if not.
 */
export const findEffectByName = (name: Effect['name']): Result<EffectCode, EffectNameNotFoundUtilError> => {
    const effect = effectByNameMap.get(name);
    if (!effect) {
        return err({
            type: EFFECT_NAME_NOT_FOUND_UTIL_ERROR,
            message: `Effect not found with name: ${name}`,
            context: { effectName: name },
        });
    }

    return ok<EffectCode, EffectNameNotFoundUtilError>(effect.code);
};

/**
 * Find an effect by its code literal
 * @param code The effect code to find
 * @returns A Result containing the Effect if found, or an EffectCodeNotFoundUtilError if not.
 */
export const findEffectByCode = (code: EffectCode): Result<Effect, EffectCodeNotFoundUtilError> => {
    const effect = effectByCodeMap.get(code);
    if (!effect) {
        return err({
            type: EFFECT_CODE_NOT_FOUND_UTIL_ERROR,
            message: `Effect not found with code: ${code}`,
            context: { effectCode: code },
        });
    }
    return ok(effect);
};

/**
 * Find an effect by name and return its code literal, throwing an error if not found.
 * Intended for use during data initialization where an error signifies invalid data.
 * @param name The name of the effect to find
 * @returns The code of the effect as EffectCode
 * @throws Error if the effect is not found
 */
export const findEffectByNameOrThrow = (name: Effect['name']): EffectCode => {
    return findEffectByName(name).match(
        (effectCode) => effectCode,
        (error) => {
            // Throw a more specific error during initialization
            throw new Error(`Invalid static data: Effect name "${name}" not found. Error: ${error.message}`);
        }
    );
};

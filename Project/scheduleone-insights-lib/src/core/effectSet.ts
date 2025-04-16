import type { EffectCode } from '../types';

/**
 * Create a new effect set
 * @param initialEffects - Initial effects to add to the set
 * @returns A new Set of effects
 */
export function createEffectSet(initialEffects: EffectCode[] = []): Set<EffectCode> {
    return new Set(initialEffects);
}

/**
 * Add an effect to the set
 * @param effectSet - The effect set
 * @param effect - The effect to add
 * @returns A new set with the effect added
 */
export function addEffect(effectSet: Set<EffectCode>, effect: EffectCode): Set<EffectCode> {
    const newSet = new Set(effectSet);
    newSet.add(effect);
    return newSet;
}

/**
 * Remove an effect from the set
 * @param effectSet - The effect set
 * @param effect - The effect to remove
 * @returns A new set with the effect removed
 */
export function removeEffect(effectSet: Set<EffectCode>, effect: EffectCode): Set<EffectCode> {
    const newSet = new Set(effectSet);
    newSet.delete(effect);
    return newSet;
}

/**
 * Check if the set contains an effect
 * @param effectSet - The effect set
 * @param effect - The effect to check for
 * @returns True if the effect is in the set, false otherwise
 */
export function hasEffect(effectSet: Set<EffectCode>, effect: EffectCode): boolean {
    return effectSet.has(effect);
}

/**
 * Convert the set to an array
 * @param effectSet - The effect set
 * @returns An array of effects
 */
export function toArray(effectSet: Set<EffectCode>): EffectCode[] {
    return Array.from(effectSet);
}

/**
 * Get the size of the set
 * @param effectSet - The effect set
 * @returns The number of effects in the set
 */
export function getSize(effectSet: Set<EffectCode>): number {
    return effectSet.size;
}

/**
 * Clone the set
 * @param effectSet - The effect set to clone
 * @returns A new set with the same effects
 */
export function cloneSet(effectSet: Set<EffectCode>): Set<EffectCode> {
    return new Set(effectSet);
}

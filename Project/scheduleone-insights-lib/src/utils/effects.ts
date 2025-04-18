import { effects } from '../data/effects';
import { EffectCode } from '../types';

/**
 * Get effect code by name
 * @param name - The name of the effect
 * @returns The code of the effect, or undefined if not found
 */
export function getEffectCode(name: string): EffectCode | undefined {
    const effect = effects[name as keyof typeof effects];
    return effect ? (effect.code as EffectCode) : undefined;
}

/**
 * Get effect name by code
 * @param code - The code of the effect
 * @returns The name of the effect, or undefined if not found
 */
export function getEffectName(code: EffectCode): string | undefined {
    for (const [name, effect] of Object.entries(effects)) {
        if (effect.code === code) {
            return name;
        }
    }
    return undefined;
}

import type { EffectType } from '@/lib/types/consts/effectTypes';

/**
 * Explicit interface for effect objects
 */
export interface Effect {
    /** Human-readable effect name */
    name: string;
    /** Unique effect code */
    code: string;
    /** Description of the effect */
    description: string;
    /** Ability or cosmetic type */
    type: EffectType;
    /** Multiplier value for effect strength */
    multiplier: number;
    /** Tier level of the effect */
    tier: number;
    /** How addictive the effect is */
    addictiveness: number;
}

import type { EffectType } from '@/code/types/consts/effectTypes';
import { effects } from '@/code/data/effects/effects';

/**
 * Explicit interface for effect objects
 */
export interface Effect {
    /** Human-readable effect name */
    readonly name: string;
    /** Unique effect code */
    readonly code: EffectCode;
    /** Description of the effect */
    readonly description: string;
    /** Ability or cosmetic type */
    readonly type: EffectType;
    /** Multiplier value for effect strength */
    readonly multiplier: number;
    /** Tier level of the effect */
    readonly tier: number;
    /** How addictive the effect is */
    readonly addictiveness: number;
}

/** Literal union type of all effect codes */
export type EffectCode = (typeof effects)[number]['code'];

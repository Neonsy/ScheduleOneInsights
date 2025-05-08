import type { EffectCode } from '@/code/types/effects/Effect';

/**
 * Single transformation rule applied by ingredient codes.
 */
export interface TransformationRule {
    /** Effect codes that trigger the rule if present */
    readonly ifPresent: EffectCode[];
    /** Effect codes that trigger the rule if not present */
    readonly ifNotPresent: EffectCode[];
    /** Mapping of effect codes to their replacements */
    readonly replace: Partial<Record<EffectCode, EffectCode>>;
}

/**
 * Mapping from ingredient code to its array of transformation rules
 */
export type TransformationRules = Record<string, TransformationRule[]>;

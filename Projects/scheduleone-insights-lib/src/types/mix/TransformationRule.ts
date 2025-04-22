import type { Effect } from '@/types/effects/Effect';

/**
 * Single transformation rule applied by ingredient codes.
 */
export interface TransformationRule {
    /** Effect codes that trigger the rule if present */
    ifPresent: Effect['code'][];
    /** Effect codes that trigger the rule if not present */
    ifNotPresent: Effect['code'][];
    /** Mapping of effect codes to their replacements */
    replace: Record<Effect['code'], Effect['code']>;
}

/**
 * Mapping from ingredient code to its array of transformation rules
 */
export type TransformationRules = Record<string, TransformationRule[]>;

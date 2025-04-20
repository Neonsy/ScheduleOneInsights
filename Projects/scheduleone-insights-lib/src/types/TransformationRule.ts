import { transformationRules } from '@/data/transformationRules';

/**
 * TransformationRule type - inferred from the transformationRules data
 * This ensures we have a single source of truth
 */
export type TransformationRule = {
    /** Effect codes that trigger the rule if present */
    ifPresent: string[];
    /** Effect codes that trigger the rule if not present */
    ifNotPresent: string[];
    /** Mapping of effect codes to their replacements */
    replace: Record<string, string>;
};

/**
 * Inferred type for the transformationRules object
 */
export type TransformationRules = typeof transformationRules;

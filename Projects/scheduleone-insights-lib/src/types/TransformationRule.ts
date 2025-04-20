import { transformationRules } from '../data/transformationRules';

/**
 * TransformationRule type - inferred from the transformationRules data
 * This ensures we have a single source of truth
 */
export type TransformationRule = (typeof transformationRules)[number];

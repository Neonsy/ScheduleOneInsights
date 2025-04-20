import { effects } from '../data/effects';

/**
 * Effect type - inferred from the effects data
 * This ensures we have a single source of truth
 */
export type Effect = (typeof effects)[number];

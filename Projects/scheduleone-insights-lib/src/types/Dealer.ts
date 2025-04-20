import { dealers } from '../data/dealers';

/**
 * Dealer type - inferred from the dealers data
 * This ensures we have a single source of truth
 */
export type Dealer = (typeof dealers)[number];

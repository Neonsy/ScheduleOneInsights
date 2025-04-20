import { customers } from '../data/customers';

/**
 * Customer type - inferred from the customers data
 * This ensures we have a single source of truth
 */
export type Customer = (typeof customers)[number];

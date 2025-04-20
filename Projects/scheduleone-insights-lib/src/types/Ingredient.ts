import { ingredients } from '@/data/ingredients';

/**
 * Ingredient type - inferred from the ingredients data
 * This ensures we have a single source of truth
 */
export type Ingredient = (typeof ingredients)[number];

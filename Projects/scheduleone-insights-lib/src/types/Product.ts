import { products } from '@/data/products';

/**
 * Product type - inferred from the products data
 * This ensures we have a single source of truth
 */
export type Product = (typeof products)[number];

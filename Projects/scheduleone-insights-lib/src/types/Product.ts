import { products } from '@/data/products';
import { ProductType } from '@/types/consts/productTypes';
import type { Effect } from '@/types/Effect';

/**
 * Base product interface with common properties
 */
interface BaseProduct {
    name: string;
    code: string;
    basePrice: number;
    rank: number;
    type: ProductType;
}

/**
 * Marijuana product interface - requires defaultEffect
 */
interface MarijuanaProduct extends BaseProduct {
    type: 'Marijuana';
    defaultEffect: Effect['code'];
}

/**
 * Non-marijuana product interface - no defaultEffect allowed
 */
interface NonMarijuanaProduct extends BaseProduct {
    type: Exclude<ProductType, 'Marijuana'>;
}

/**
 * Product type - union of marijuana and non-marijuana products
 * This enforces that defaultEffect is required for marijuana products
 * and not allowed for other product types
 */
export type Product = MarijuanaProduct | NonMarijuanaProduct;

/**
 * Runtime type check for marijuana products
 */
export const isMarijuanaProduct = (product: Product): product is MarijuanaProduct => {
    return product.type === 'Marijuana';
};

/**
 * Inferred product type from data - for reference only
 * The explicit interfaces above should be used for type checking
 */
export type InferredProduct = (typeof products)[number];

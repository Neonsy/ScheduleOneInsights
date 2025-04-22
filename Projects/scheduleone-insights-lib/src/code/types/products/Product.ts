import { products } from '@/code/data/products/products';
import { ProductType } from '@/code/types/consts/productTypes';
import type { Effect } from '@/code/types/effects/Effect';

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
 * Runtime type guard to check if a product is a MarijuanaProduct.
 * @param product - The product to test.
 * @returns True if the product's type is 'Marijuana'.
 */
export const isMarijuanaProduct = (product: Product): product is MarijuanaProduct => {
    return product.type === 'Marijuana';
};

/**
 * Inferred product type from data - for reference only
 * The explicit interfaces above should be used for type checking
 */
export type InferredProduct = (typeof products)[number];

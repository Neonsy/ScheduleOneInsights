import { products } from '@/code/data/products/products';
import { ProductType } from '@/code/types/consts/productTypes';
import type { EffectCode } from '@/code/types/effects/Effect';

/**
 * Base product interface with common properties
 */
interface BaseProduct {
    readonly name: string;
    /** Specific product code */
    readonly code: ProductCode;
    readonly basePrice: number;
    readonly rank: number;
    readonly type: ProductType;
    /**
     * This field is needed because non-marijuana products like Meth and Cocaine have inherent addictiveness (0 to 1).
     */
    readonly addictiveness?: number;
}

/**
 * Marijuana product interface - requires defaultEffect
 */
export interface MarijuanaProduct extends BaseProduct {
    readonly type: 'Marijuana';
    /** Default effect code literal */
    readonly defaultEffect: EffectCode;
}

/**
 * Non-marijuana product interface - no defaultEffect allowed
 */
interface NonMarijuanaProduct extends BaseProduct {
    readonly type: Exclude<ProductType, 'Marijuana'>;
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
/** Literal union type of all effect codes */
export type ProductCode = (typeof products)[number]['code'];

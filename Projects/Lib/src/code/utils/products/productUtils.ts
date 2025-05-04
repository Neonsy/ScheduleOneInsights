/**
 * Product utility functions
 */
import { products } from '@/code/data/products/products';
import type { Product } from '@/code/types/products/Product';

// Performance: Precompute product lookup map for constant-time access
const productByCodeMap: Map<Product['code'], Product> = new Map(products.map((p: Product) => [p.code, p]));

/**
 * Find a product by its code
 * @param code The product code to find
 * @returns The product with the matching code
 * @throws Error if the product is not found
 */
export const findProductByCode = (code: Product['code']): Product => {
    const product = productByCodeMap.get(code);
    if (!product) {
        throw new Error(`Product not found: ${code}`);
    }
    // The products data is defined in our codebase and we know it conforms to our Product interface
    // TypeScript just can't verify this automatically due to the readonly constraints from 'as const'
    return product;
};

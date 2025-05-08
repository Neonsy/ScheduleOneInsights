/**
 * Product utility functions
 */
import { products } from '@/code/data/products/products';
import type { Product } from '@/code/types/products/Product';
import type { ProductCode } from '@/code/types/products/Product';

// Performance: Precompute product lookup map for constant-time access
// Use ProductCode for the key, Product for the value
const productByCodeMap: Map<ProductCode, Product> = new Map(products.map((p: Product) => [p.code, p]));

/**
 * Find a product by its code
 * @param code The product code to find (use the literal type)
 * @returns The product with the matching code
 * @throws Error if the product is not found
 */
export const findProductByCode = (code: ProductCode): Product => {
    const product = productByCodeMap.get(code);
    if (!product) {
        throw new Error(`Product not found: ${code}`);
    }
    // The return type is Product, which matches the map's value type
    return product;
};

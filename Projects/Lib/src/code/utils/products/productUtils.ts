/**
 * Product utility functions
 */
import { products } from '@/code/data/products/products';
import type { Product } from '@/code/types/products/Product';
import type { ProductCode } from '@/code/types/products/Product';
import { Result, ok, err } from 'neverthrow';
import { type ProductNotFoundProdError, PRODUCT_NOT_FOUND_PROD_ERROR } from '@/code/types/errors/ProductError';

// Performance: Precompute product lookup map for constant-time access
// Use ProductCode for the key, Product for the value
const productByCodeMap: Map<ProductCode, Product> = new Map(products.map((p: Product) => [p.code, p]));

/**
 * Find a product by its code
 * @param code The product code to find
 * @returns A Result containing the Product if found, or a ProductNotFoundProdError if not.
 */
export const findProductByCode = (code: ProductCode): Result<Product, ProductNotFoundProdError> => {
    const product = productByCodeMap.get(code);
    if (!product) {
        return err({
            type: PRODUCT_NOT_FOUND_PROD_ERROR,
            message: `Product not found with code: ${code}`,
            context: { productCode: code },
        });
    }
    return ok(product);
};

import { products } from '../data/products';
import { ProductCode } from '../types';

/**
 * Get product code by name
 * @param name - The name of the product
 * @returns The code of the product, or undefined if not found
 */
export function getProductCode(name: string): ProductCode | undefined {
    const product = products[name as keyof typeof products];
    return product ? (product.code as ProductCode) : undefined;
}

/**
 * Get product name by code
 * @param code - The code of the product
 * @returns The name of the product, or undefined if not found
 */
export function getProductName(code: ProductCode): string | undefined {
    for (const [name, product] of Object.entries(products)) {
        if (product.code === code) {
            return name;
        }
    }
    return undefined;
}

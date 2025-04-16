import type { EffectCode, IngredientCode, ProductCode } from '../types';

import { effects } from '../data/effects';
import { ingredients, ingredientNameToCode } from '../data/ingredients';
import { products, productNameToCode } from '../data/products';

/**
 * Calculate the cost of ingredients
 * @param ingredientNames - The names of the ingredients
 * @returns The total cost of the ingredients
 */
export function calculateIngredientCost(ingredientNames: string[]): number {
    let cost = 0;
    for (const name of ingredientNames) {
        // Convert ingredient name to code
        const code = ingredientNameToCode[name];
        if (code) {
            const ingredient = ingredients[code];
            if (ingredient) {
                cost += ingredient.price;
            }
        }
    }
    return cost;
}

/**
 * Calculate the selling price of a product with effects
 * @param productName - The name of the product
 * @param effectCodes - The effects applied to the product
 * @returns The selling price of the product
 */
export function calculateSellingPrice(productName: string, effectCodes: EffectCode[]): number {
    // Convert product name to code
    const code = productNameToCode[productName];
    if (!code) {
        throw new Error(`Unknown product: ${productName}`);
    }

    const product = products[code];
    if (!product) {
        throw new Error(`Unknown product code: ${code}`);
    }

    let effectValue = 0;
    for (const code of effectCodes) {
        effectValue += effects[code]?.valueMultiplier || 0;
    }

    return Math.round(product.price * (1 + effectValue));
}

/**
 * Calculate the profit from selling a product
 * @param sellingPrice - The selling price of the product
 * @param productCost - The cost of the product
 * @param ingredientCost - The cost of the ingredients
 * @returns The profit from selling the product
 */
export function calculateProfit(sellingPrice: number, productCost: number, ingredientCost: number): number {
    return sellingPrice - productCost - ingredientCost;
}

/**
 * Calculate the profit margin from selling a product
 * @param profit - The profit from selling the product
 * @param sellingPrice - The selling price of the product
 * @returns The profit margin as a decimal (e.g., 0.25 for 25%)
 */
export function calculateProfitMargin(profit: number, sellingPrice: number): number {
    return Math.round((profit / sellingPrice) * 100) / 100;
}

/**
 * Calculate the addiction value of a mix
 * @param effectCodes - The effects in the mix
 * @returns The addiction value
 */
export function calculateAddiction(effectCodes: EffectCode[]): number {
    let value = 0;
    for (const code of effectCodes) {
        value += effects[code]?.addictiveness || 0;
    }
    return Math.round(value * 100) / 100;
}

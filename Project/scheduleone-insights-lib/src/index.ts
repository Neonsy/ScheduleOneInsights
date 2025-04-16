// Export types
export * from './types';

// Import types for internal use
import { Customer, DealerCode, EffectCode, IngredientCode, MixResult, ProductCode } from './types';
import { dealers } from './data/dealers';
import { customers } from './data/customers';
import { products } from './data/products';
import { ingredients } from './data/ingredients';
import { mixIngredients } from './core/mixer';

// Export core functionality
export { mixIngredients, mixFromSeed } from './core/mixer';
export { generateSeed, parseSeed } from './core/seedManager';
export { createEffectSet, addEffect, removeEffect, hasEffect, toArray, getSize, cloneSet } from './core/effectSet';
export { findMixForEffects, findMixFromIngredients } from './core/reverseMixer';
export type { FindMixOptions, MixSearchResult } from './core/reverseMixer';

// Export utilities
export { calculateIngredientCost, calculateSellingPrice, calculateProfit, calculateProfitMargin, calculateAddiction } from './utils/calculator';

// Export utility functions for the website
export function formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
}

export function formatPercentage(value: number): string {
    return `${(value * 100).toFixed(0)}%`;
}

// Helper function to get all available locations
export function getAllLocations(): string[] {
    const locationSet = new Set<string>();

    // Add dealer locations
    Object.values(dealers).forEach((dealer) => {
        locationSet.add(dealer.location);
    });

    // Add customer schedule locations
    Object.values(customers).forEach((customer) => {
        customer.schedule.forEach((entry) => {
            if (entry.location) {
                locationSet.add(entry.location);
            }
        });
    });

    return Array.from(locationSet).sort();
}

// Helper function to calculate dealer profit
export function calculateDealerProfit(sellingPrice: number, dealerCode: DealerCode): number {
    const dealer = dealers[dealerCode];
    if (!dealer) return 0;

    return sellingPrice * dealer.cut;
}

/**
 * Find the best product for a given effect
 *
 * This function finds the product that produces the highest profit margin
 * when combined with any ingredient to create the specified effect.
 *
 * @param effectCode - The effect code to search for
 * @returns The product code with the highest profit margin, or null if no product creates the effect
 */
export function findBestProductForEffect(effectCode: EffectCode): ProductCode | null {
    let bestProduct: ProductCode | null = null;
    let highestMultiplier = 0;

    // Create a cache of results to avoid redundant calculations
    const resultCache = new Map<string, MixResult>();

    // Get all product codes and ingredient codes once
    const productCodes = Object.keys(products) as ProductCode[];
    const ingredientCodes = Object.keys(ingredients) as IngredientCode[];

    // Check each product with each ingredient
    for (const productCode of productCodes) {
        const productName = products[productCode].name;

        for (const ingredientCode of ingredientCodes) {
            const ingredientName = ingredients[ingredientCode].name;

            // Create a cache key
            const cacheKey = `${productName}|${ingredientName}`;

            // Check if we've already calculated this mix
            let result: MixResult;
            if (resultCache.has(cacheKey)) {
                result = resultCache.get(cacheKey)!;
            } else {
                result = mixIngredients(productName, [ingredientName]);
                resultCache.set(cacheKey, result);
            }

            if (result.effects.includes(effectCode) && result.profitMargin > highestMultiplier) {
                highestMultiplier = result.profitMargin;
                bestProduct = productCode;
            }
        }
    }

    return bestProduct;
}

// Helper function to find customers who might be interested in a mix
export function findInterestedCustomers(effectCodes: EffectCode[]): Customer[] {
    return Object.values(customers).filter((customer) => {
        // Check if any of the customer's preferred effects are in the mix
        return customer.preferences.some((preference) => effectCodes.includes(preference));
    });
}

// Export data
export { effects, effectCodeToName } from './data/effects';
export { ingredients, ingredientNameToCode, ingredientCodeToName } from './data/ingredients';
export { products, productNameToCode, productCodeToName } from './data/products';
export { dealers, dealerNameToCode, dealerCodeToName, locationToDealerCode } from './data/dealers';
export {
    customers,
    customersByLocation,
    getCustomersByLocation,
    getCustomersByScheduleLocation,
    getCustomersByPreference,
    getCustomersBySpendingLevel,
} from './data/customers';
export { effectTransformationsByIngredient } from './data/transformations';

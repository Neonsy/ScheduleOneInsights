// Helper function exports
import { Customer, DealerCode, EffectCode, IngredientCode, ProductCode } from '../types';
import { dealers } from '../data/dealers';
import { customers } from '../data/customers';
import { products } from '../data/products';
import { ingredients } from '../data/ingredients';
import { mixIngredients } from '../core/mixer';

/**
 * Get all available locations from dealers and customer schedules
 * @returns Array of unique location names
 */
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

/**
 * Calculate a dealer's profit from a sale
 * @param sellingPrice - The selling price of the product
 * @param dealerCode - The dealer's code
 * @returns The dealer's profit
 */
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

    // Get all product codes and ingredient codes once
    const productCodes = Object.keys(products) as ProductCode[];
    const ingredientCodes = Object.keys(ingredients) as IngredientCode[];

    // Check each product with each ingredient
    for (const productCode of productCodes) {
        const productName = products[productCode].name;

        for (const ingredientCode of ingredientCodes) {
            const ingredientName = ingredients[ingredientCode].name;

            // Calculate the mix result
            const result = mixIngredients(productName, [ingredientName]);

            if (result.effects.includes(effectCode) && result.profitMargin > highestMultiplier) {
                highestMultiplier = result.profitMargin;
                bestProduct = productCode;
            }
        }
    }

    return bestProduct;
}

/**
 * Find customers who might be interested in a mix based on its effects
 * @param effectCodes - The effects in the mix
 * @returns Array of customers who prefer at least one of the effects
 */
export function findInterestedCustomers(effectCodes: EffectCode[]): Customer[] {
    return Object.values(customers).filter((customer) => {
        // Check if any of the customer's preferred effects are in the mix
        return customer.preferences.some((preference) => effectCodes.includes(preference));
    });
}

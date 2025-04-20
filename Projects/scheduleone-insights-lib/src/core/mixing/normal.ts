/**
 * Normal mixing functionality
 * Provides functions for mixing products with ingredients
 */
import { Effect } from '@/types/Effect';
import { MixResult } from '@/types/MixResult';
import { findProductByCode } from '@/utils/productUtils';
import { findIngredientByCode } from '@/utils/ingredientUtils';
import { findEffectByCode } from '@/utils/effectUtils';

/**
 * Mix a product with ingredients to create a new product
 * @param productCode The code of the base product
 * @param ingredientCodes Array of ingredient codes to mix with the product
 * @returns The result of mixing the product with the ingredients
 */
export const mixProduct = (productCode: string, ingredientCodes: string[]): MixResult => {
    // Look up the base product by code → get its basePrice
    const product = findProductByCode(productCode);
    const basePrice = product.basePrice;

    // Initialize an empty array appliedEffects: Effect[]
    const appliedEffects: Effect[] = [];

    // Initialize running totals
    let totalCost = 0;
    let totalAddiction = 0;

    // Process each ingredient in the exact order provided
    for (const ingCode of ingredientCodes) {
        // Find the ingredient → add its price to totalCost
        const ingredient = findIngredientByCode(ingCode);
        totalCost += ingredient.price;

        // Take its defaultEffect name → look up the corresponding effect object
        const effect = findEffectByCode(ingredient.defaultEffect);

        // If that effect is not already in appliedEffects, append it
        if (!appliedEffects.some((e) => e.code === effect.code)) {
            appliedEffects.push(effect);
        }

        // Add that effect's addictiveness to totalAddiction
        totalAddiction += effect.addictiveness;
    }

    // After processing all ingredients, compute:
    // totalMultiplier = sum(e.multiplier for e in appliedEffects)
    const totalMultiplier = appliedEffects.reduce((sum, effect) => sum + effect.multiplier, 0);

    // sellPrice = basePrice * (1 + totalMultiplier)
    const sellPrice = basePrice * (1 + totalMultiplier);

    // profit = sellPrice - totalCost
    const profit = sellPrice - totalCost;

    // Return the mix result
    return {
        effects: appliedEffects.map((e) => e.name),
        totalAddiction,
        totalCost,
        sellPrice,
        profit,
    };
};

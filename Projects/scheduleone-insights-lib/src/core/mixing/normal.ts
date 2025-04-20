/**
 * Normal mixing functionality
 * Provides functions for mixing products with ingredients
 */
import { Effect } from '@/types/Effect';
import { MixResult } from '@/types/MixResult';
import { transformationRules } from '@/data/transformationRules';
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

    // SEED the product's inherent effect if it has one (marijuana products have default effects)
    // Check if it's a marijuana product by checking the type directly
    if (product.type === 'Marijuana') {
        // For marijuana products, we know they have a defaultEffect
        // Use type assertion to tell TypeScript that this product has a defaultEffect property
        const marijuanaProduct = product as { defaultEffect: string };
        const baseEffect = findEffectByCode(marijuanaProduct.defaultEffect);
        appliedEffects.push(baseEffect);
        // Addiction will be calculated after all effects are processed
    }

    // Process each ingredient in the exact order provided
    for (const ingCode of ingredientCodes) {
        // Find the ingredient → add its price to totalCost
        const ingredient = findIngredientByCode(ingCode);
        totalCost += ingredient.price;

        // First apply transformation rules for this ingredient if they exist
        const ingredientRules = transformationRules[ingCode as keyof typeof transformationRules];
        if (ingredientRules) {
            // Get the current effect codes in appliedEffects
            const currentEffectCodes = appliedEffects.map((e) => e.code);

            // Check each rule
            for (const rule of ingredientRules) {
                // Check if all ifPresent effects are present
                const allPresent = rule.ifPresent.every((code) => {
                    // Use type-safe string comparison instead of direct includes
                    return currentEffectCodes.some((effectCode) => effectCode === code);
                });

                // Check if all ifNotPresent effects are not present
                const allNotPresent = rule.ifNotPresent.every((code) => {
                    // Use type-safe string comparison instead of direct includes
                    return !currentEffectCodes.some((effectCode) => effectCode === code);
                });

                // If both conditions are met, apply the replacements
                if (allPresent && allNotPresent) {
                    // Apply each replacement
                    for (const [oldCode, newCode] of Object.entries(rule.replace)) {
                        // Find the index of the effect to replace
                        const indexToReplace = appliedEffects.findIndex((e) => e.code === oldCode);

                        // If the effect exists, replace it
                        if (indexToReplace !== -1) {
                            // Get the new effect - we know newCode is a string from Object.entries
                            const effectCode = String(newCode);
                            const newEffect = findEffectByCode(effectCode);

                            // Replace the old effect with the new one
                            appliedEffects[indexToReplace] = newEffect;
                        }
                    }
                }
            }
        }

        // After applying transformation rules, add the ingredient's default effect if not already present
        const effect = findEffectByCode(ingredient.defaultEffect);
        if (!appliedEffects.some((e) => e.code === effect.code)) {
            appliedEffects.push(effect);
        }
    }

    // After processing all ingredients, compute:
    // totalMultiplier = sum(e.multiplier for e in appliedEffects)
    const totalMultiplier = appliedEffects.reduce((sum, effect) => sum + effect.multiplier, 0);

    // sellPrice = basePrice * (1 + totalMultiplier)
    // Round to nearest whole number
    const sellPrice = Math.round(basePrice * (1 + totalMultiplier));

    // profit = sellPrice - totalCost
    // Round to ensure consistent test results
    const profit = Math.round(sellPrice - totalCost);

    // Ensure a stable, deterministic ordering of effects for consistent test results
    // Sort by effect code to guarantee the same order every time
    appliedEffects.sort((a, b) => a.code.localeCompare(b.code));

    // Calculate the total addiction from all applied effects and cap it at 1
    const rawAddiction = appliedEffects.reduce((sum, e) => sum + e.addictiveness, 0);
    // Round to 2 decimal places for consistent test results
    const totalAddiction = Math.min(Math.round(rawAddiction * 100) / 100, 1);

    // Return the mix result
    return {
        effects: appliedEffects.map((e) => e.name),
        totalAddiction,
        totalCost,
        sellPrice,
        profit,
    };
};

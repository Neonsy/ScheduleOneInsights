/**
 * Normal mixing functionality
 * Provides functions for mixing products with ingredients
 */
import { Effect } from '@/code/types/effects/Effect';
import { MixResult } from '@/code/types/mix/MixResult';
import { transformationRules } from '@/code/data/mix/transformationRules';
import { findProductByCode } from '@/code/utils/products/productUtils';
import { findIngredientByCode } from '@/code/utils/products/ingredientUtils';
import { findEffectByCode } from '@/code/utils/effects/effectUtils';
import { isMarijuanaProduct } from '@/code/types/products/Product';
import { Product } from '@/code/types/products/Product';
import { Ingredient } from '@/code/types/products/Ingredient';

/**
 * Mix a product with ingredients to create a new product
 * @param productCode The code of the base product
 * @param ingredientCodes Array of ingredient codes to mix with the product
 * @returns The result of mixing the product with the ingredients
 */
export const mixProduct = (productCode: Product['code'], ingredientCodes: Ingredient['code'][]): MixResult => {
    const product = findProductByCode(productCode);
    const basePrice = product.basePrice;

    const effectMap = new Map<Effect['code'], Effect>();
    let totalCost = 0;

    if (isMarijuanaProduct(product)) {
        const baseEffect = findEffectByCode(product.defaultEffect);
        effectMap.set(baseEffect.code, baseEffect);
    }

    for (const ingCode of ingredientCodes) {
        const ingredient = findIngredientByCode(ingCode);
        totalCost += ingredient.price;

        const rules = transformationRules[ingCode as keyof typeof transformationRules];
        if (rules) {
            for (const { ifPresent, ifNotPresent, replace } of rules) {
                const presentOK = ifPresent.every((code) => effectMap.has(code));
                const notPresentOK = ifNotPresent.every((code) => !effectMap.has(code));
                if (presentOK && notPresentOK) {
                    for (const [oldCode, newCode] of Object.entries(replace) as [Effect['code'], Effect['code']][]) {
                        if (effectMap.has(oldCode)) {
                            const newEffect = findEffectByCode(newCode);
                            effectMap.delete(oldCode);
                            effectMap.set(newCode, newEffect);
                        }
                    }
                }
            }
        }

        if (!effectMap.has(ingredient.defaultEffect)) {
            const defaultEffect = findEffectByCode(ingredient.defaultEffect);
            effectMap.set(defaultEffect.code, defaultEffect);
        }
    }

    const appliedEffects = Array.from(effectMap.values());
    appliedEffects.sort((a, b) => a.code.localeCompare(b.code));

    const totalMultiplier = appliedEffects.reduce((sum, e) => sum + e.multiplier, 0);
    const sellPrice = Math.round(basePrice * (1 + totalMultiplier));
    const profit = Math.round(sellPrice - totalCost);

    const rawAddiction = appliedEffects.reduce((sum, e) => sum + e.addictiveness, 0);
    const totalAddiction = Math.min(Math.round(rawAddiction * 100) / 100, 1);

    return {
        effects: appliedEffects.map((e) => e.name),
        totalAddiction,
        totalCost,
        sellPrice,
        profit,
    };
};

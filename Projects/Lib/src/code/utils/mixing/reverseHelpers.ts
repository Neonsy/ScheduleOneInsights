/* global console */
import { findIngredientByCode } from '@/code/utils/products/ingredientUtils';
import { findEffectByName } from '@/code/utils/effects/effectUtils';
import type { Ingredient } from '@/code/types/products/Ingredient';
import type { Effect } from '@/code/types/effects/Effect';
import type { EffectCode } from '@/code/types/effects/Effect';

export function calculateIngredientCost(ingredientCodes: Ingredient['code'][]): number {
    let cost = 0;
    for (const code of ingredientCodes) {
        try {
            cost += findIngredientByCode(code).price;
        } catch {
            console.warn(`[reverseByEffect] Could not find ingredient ${code} for cost calculation.`);
        }
    }
    return cost;
}

export function getSortedEffectCodesFromNames(effectNames: Effect['name'][]): EffectCode[] {
    try {
        // Ensure findEffectByName returns EffectCode or handle potential errors/mismatches
        // The 'as EffectCode[]' might be needed if findEffectByName strictly returns string
        return effectNames.map((name) => findEffectByName(name)).sort() as EffectCode[];
    } catch (e) {
        console.warn(`[reverseByEffect] Error converting effect names to codes: ${e}`);
        return [];
    }
}

export function doEffectsMatchTarget(actualSortedCodes: EffectCode[], targetSet: Set<EffectCode>): boolean {
    if (targetSet.size === 0) return true;
    if (actualSortedCodes.length < targetSet.size) return false;
    const actualCodesSet = new Set(actualSortedCodes);
    for (const targetCode of targetSet) {
        if (!actualCodesSet.has(targetCode)) return false;
    }
    return true;
}

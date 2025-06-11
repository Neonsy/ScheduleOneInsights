/* eslint-env node, vitest */
import { test, expect } from 'vitest';
import { mixProduct } from '@/exports/core/mixing/normal';
import type { IngredientCode } from '@/code/types/products/Ingredient';

/**
 * Verifies mixProduct produces the known optimal mix for OG Kush
 */
test('mixProduct for OG Kush with specific ingredients sequence', () => {
    const ingredientCodes = ['MB', 'BNN', 'C', 'ED', 'BNN', 'ED', 'DN', 'DN', 'PRCTM', 'MO'] as IngredientCode[];
    const result = mixProduct('OK', ingredientCodes);

    const expectedEffects = [
        'Cyclopean',
        'Thought-Provoking',
        'Athletic',
        'Gingeritis',
        'Shrinking',
        'Explosive',
        'Calorie-Dense',
        'Anti-Gravity',
    ];
    // Sort both arrays to ensure order-independent comparison
    expect(result.effects.sort()).toEqual(expectedEffects.sort());

    // Cost, sale price, profit, and maximal addiction
    expect(result.totalCost).toBe(40);
    expect(result.sellPrice).toBe(138);
    expect(result.profit).toBe(98);
    expect(result.totalAddiction).toBe(1);
});

/* eslint-env node, vitest */
import { test, expect } from 'vitest';
import { mixProduct } from '@/exports/core/mixing/normal';
import type { IngredientCode } from '@/exports/types/products';

/**
 * Verifies mixProduct produces the known optimal mix for Sour Diesel
 */
test('mixProduct for Sour Diesel with specific ingredients sequence', () => {
    const ingredientCodes = ['C', 'MW', 'DN', 'DN', 'BTY', 'AD', 'PRCTM', 'VAR'] as IngredientCode[];
    const result = mixProduct('SD', ingredientCodes)._unsafeUnwrap();

    // Should have exactly the 8 desired effects (order doesn't matter)
    const expectedEffects = [
        'Refreshing',
        'Paranoia',
        'Sneaky',
        'Euphoric',
        'Calorie-Dense',
        'Bright-Eyed',
        'Thought-Provoking',
        'Tropic Thunder',
    ];
    // Sort both arrays to ensure order-independent comparison
    expect(result.effects.sort()).toEqual(expectedEffects.sort());

    // Cost, sale price, profit, and maximal addiction
    expect(result.totalCost).toBe(36);
    expect(result.sellPrice).toBe(110);
    expect(result.profit).toBe(74);
    expect(result.totalAddiction).toBe(1);
});

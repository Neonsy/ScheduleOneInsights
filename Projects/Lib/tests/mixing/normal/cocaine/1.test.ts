/* eslint-env node, vitest */
import { test, expect } from 'vitest';
import { mixProduct } from '@/exports/core/mixing/normal';
import type { IngredientCode } from '@/code/types/products/Ingredient';

/**
 * Verifies mixProduct produces the known optimal mix for Cocaine
 */
test('mixProduct for Cocaine with specific ingredients sequence', () => {
    const ingredientCodes = ['MO', 'MB', 'C', 'PRCTM', 'BTY', 'AD', 'DN', 'DN', 'HS'] as IngredientCode[];
    const result = mixProduct('CC', ingredientCodes);

    // Should have exactly the 8 desired effects (order doesn't matter)
    const expectedEffects = [
        'Zombifying',
        'Refreshing',
        'Paranoia',
        'Sneaky',
        'Bright-Eyed',
        'Electrifying',
        'Explosive',
        'Calorie-Dense',
    ];
    // Sort both arrays to ensure order-independent comparison
    expect(result.effects.sort()).toEqual(expectedEffects.sort());

    // Cost, sale price, profit, and maximal addiction
    expect(result.totalCost).toBe(50);
    expect(result.sellPrice).toBe(471);
    expect(result.profit).toBe(421);
    expect(result.totalAddiction).toBe(1);
});

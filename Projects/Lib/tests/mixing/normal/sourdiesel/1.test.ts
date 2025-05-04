/* eslint-env node, vitest */
import { test, expect } from 'vitest';
import { mixProduct } from '@/exports/core/mixing/normal';

/**
 * Verifies mixProduct produces the known optimal mix for Sour Diesel
 */
test('mixProduct for Sour Diesel with specific ingredients sequence', () => {
    const ingredientCodes: string[] = ['C', 'MW', 'DN', 'DN', 'BTY', 'AD', 'PRCTM', 'VAR'];
    const result = mixProduct('SD', ingredientCodes);

    // Should have exactly the 8 desired effects (order doesn't matter)
    expect(result.effects).toHaveLength(8);
    expect(result.effects).toEqual(
        expect.arrayContaining([
            'Refreshing',
            'Paranoia',
            'Sneaky',
            'Euphoric',
            'Calorie-Dense',
            'Bright-Eyed',
            'Thought-Provoking',
            'Tropic Thunder',
        ])
    );

    // Cost, sale price, profit, and maximal addiction
    expect(result.totalCost).toBe(36);
    expect(result.sellPrice).toBe(110);
    expect(result.profit).toBe(74);
    expect(result.totalAddiction).toBe(1);
});

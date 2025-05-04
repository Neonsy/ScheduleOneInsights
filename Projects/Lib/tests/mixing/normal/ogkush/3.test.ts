/* eslint-env node, vitest */
import { test, expect } from 'vitest';
import { mixProduct } from '@/exports/core/mixing/normal';

/**
 * Verifies mixProduct produces the known optimal mix for OG Kush
 */
test('mixProduct for OG Kush with specific ingredients sequence', () => {
    const ingredientCodes: string[] = ['MB', 'BNN', 'C', 'ED', 'BNN', 'ED', 'DN', 'DN', 'PRCTM', 'MO'];
    const result = mixProduct('OK', ingredientCodes);

    // Should have exactly the 8 desired effects (order doesn't matter)
    expect(result.effects).toHaveLength(8);
    expect(result.effects).toEqual(
        expect.arrayContaining([
            'Cyclopean',
            'Thought-Provoking',
            'Athletic',
            'Gingeritis',
            'Shrinking',
            'Explosive',
            'Calorie-Dense',
            'Anti-Gravity',
        ])
    );

    // Cost, sale price, profit, and maximal addiction
    expect(result.totalCost).toBe(40);
    expect(result.sellPrice).toBe(138);
    expect(result.profit).toBe(98);
    expect(result.totalAddiction).toBe(1);
});

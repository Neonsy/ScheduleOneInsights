/* eslint-env node, vitest */
import { test, expect } from 'vitest';
import { mixProduct } from '@/exports/core/mixing/normal';

/**
 * Verifies mixProduct produces the known optimal mix for Cocaine
 */
test('mixProduct for Cocaine with specific ingredients sequence', () => {
    const ingredientCodes: string[] = ['MO', 'MB', 'C', 'PRCTM', 'BTY', 'AD', 'DN', 'DN', 'HS'];
    const result = mixProduct('CC', ingredientCodes);

    // Should have exactly the 8 desired effects (order doesn't matter)
    expect(result.effects).toHaveLength(8);
    expect(result.effects).toEqual(
        expect.arrayContaining([
            'Zombifying',
            'Refreshing',
            'Paranoia',
            'Sneaky',
            'Bright-Eyed',
            'Electrifying',
            'Explosive',
            'Calorie-Dense',
        ])
    );

    // Cost, sale price, profit, and maximal addiction
    expect(result.totalCost).toBe(50);
    expect(result.sellPrice).toBe(471);
    expect(result.profit).toBe(421);
    expect(result.totalAddiction).toBe(1);
});

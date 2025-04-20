/**
 * OG Kush mixing test - Scenario #1
 * Tests mixing OG Kush with Cuke, Chili, Banana, and Donut (x2)
 */
import { describe, it, expect } from 'vitest';
import { mixProduct } from '@/core/mixing/normal';

describe('OG Kush mixing (scenario #1): mix Cuke → Chili → Banana → Donut → Donut', () => {
    it('should correctly calculate effects, addiction, cost, price and profit', () => {
        // Call the mixProduct function with OG Kush and the specified ingredients
        const result = mixProduct('OK', ['C', 'CL', 'BNN', 'DN', 'DN']);

        // Assert that the returned object has the expected values
        expect(result.effects).toEqual(['Calorie-Dense', 'Gingeritis', 'Spicy', 'Energizing', 'Thought-Provoking', 'Explosive']);
        expect(result.totalAddiction).toEqual(1);
        expect(result.totalCost).toEqual(17);
        expect(result.sellPrice).toEqual(89);
        expect(result.profit).toEqual(72);
    });
});

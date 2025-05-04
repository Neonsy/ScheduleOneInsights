// tests/mixing/normal/ogkush/1.test.ts
import { describe, it, expect } from 'vitest';
import { mixProduct } from '@/code/core/mixing/normal/algorithm';

describe('OG Kush mixing (scenario #1): mix Cuke → Chili → Banana → Donut → Donut', () => {
    it('should include all required effects regardless of order', () => {
        const result = mixProduct('OK', ['C', 'CL', 'BNN', 'DN', 'DN']);

        const expectedEffects = ['Sneaky', 'Thought-Provoking', 'Spicy', 'Gingeritis', 'Explosive', 'Calorie-Dense'];

        // Verify that every expected effect is present (order does not matter)
        expect(result.effects).toEqual(expect.arrayContaining(expectedEffects));
        // (Optional) Verify no unexpected effects
        expect(result.effects).toHaveLength(expectedEffects.length);

        expect(result.totalAddiction).toEqual(1);
        expect(result.totalCost).toEqual(17);
        expect(result.sellPrice).toEqual(89);
        expect(result.profit).toEqual(72);
    });
});

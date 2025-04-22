// tests/mixing/normal/granddaddypurple/1.test.ts
import { describe, it, expect } from 'vitest';
import { mixProduct } from '@/code/core/mixing/normal';

describe('Granddaddy Purple mixing: mix Chili → Battery → Donut → Donut → Mouth Wash → Banana', () => {
    it('should include all required effects regardless of order', () => {
        const result = mixProduct('GP', ['CL', 'BTY', 'DN', 'DN', 'MW', 'BNN']);

        const expectedEffects = ['Sedating', 'Spicy', 'Bright-Eyed', 'Explosive', 'Sneaky', 'Balding', 'Gingeritis'];

        // Verify that every expected effect is present (order does not matter)
        expect(result.effects).toEqual(expect.arrayContaining(expectedEffects));
        // Verify no unexpected effects
        expect(result.effects).toHaveLength(expectedEffects.length);

        expect(result.totalAddiction).toEqual(1);
        expect(result.totalCost).toEqual(27);
        expect(result.sellPrice).toEqual(97);
        expect(result.profit).toEqual(70);
    });
});

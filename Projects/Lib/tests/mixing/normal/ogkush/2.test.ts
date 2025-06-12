// tests/mixing/normal/ogkush/2.test.ts
import { describe, it, expect } from 'vitest';
import { mixProduct } from '@/exports/core/mixing/normal';
import type { IngredientCode } from '@/exports/types/products';

describe('OG Kush mixing (scenario #2): mix Banana → Donut', () => {
    it('should include all required effects regardless of order', () => {
        const res = mixProduct('OK', ['BNN', 'DN']);
        res.match(
            (result) => {
                const expectedEffects = ['Calorie-Dense', 'Gingeritis', 'Sneaky'];

                // Verify that every expected effect is present (order does not matter)
                expect(result.effects).toEqual(expect.arrayContaining(expectedEffects));
                // Verify no unexpected effects
                expect(result.effects).toHaveLength(expectedEffects.length);

                expect(result.totalAddiction).toEqual(0.47);
                expect(result.totalCost).toEqual(5);
                expect(result.sellPrice).toEqual(60);
                expect(result.profit).toEqual(55);
            },
            (err) => {
                throw new Error(err.message);
            }
        );
    });
});

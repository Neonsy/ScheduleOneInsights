// tests/mixing/normal/ogkush/1.test.ts
import { describe, it, expect } from 'vitest';
import { mixProduct } from '@/exports/core/mixing/normal';

describe('OG Kush mixing (scenario #1): mix Cuke → Chili → Banana → Donut → Donut', () => {
    it('should include all required effects regardless of order', () => {
        const result = mixProduct('OK', ['C', 'CL', 'BNN', 'DN', 'DN'])._unsafeUnwrap();
        const expectedEffects = ['Sneaky', 'Thought-Provoking', 'Spicy', 'Gingeritis', 'Explosive', 'Calorie-Dense'];

        expect(result.effects).toEqual(expect.arrayContaining(expectedEffects));
        expect(result.effects).toHaveLength(expectedEffects.length);

        expect(result.totalAddiction).toEqual(1);
        expect(result.totalCost).toEqual(17);
        expect(result.sellPrice).toEqual(89);
        expect(result.profit).toEqual(72);
    });
});

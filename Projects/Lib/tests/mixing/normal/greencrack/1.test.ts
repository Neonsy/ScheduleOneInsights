// tests/mixing/normal/greencrack/1.test.ts
import { describe, it, expect } from 'vitest';
import { mixProduct } from '@/code/core/mixing/normal/algorithm';

describe('Green Crack mixing: mix Banana → Gasoline', () => {
    it('should include all required effects regardless of order', () => {
        const result = mixProduct('GC', ['BNN', 'GOL']);

        const expectedEffects = ['Thought-Provoking', 'Smelly', 'Toxic'];

        // Verify that every expected effect is present (order does not matter)
        expect(result.effects).toEqual(expect.arrayContaining(expectedEffects));
        // Verify no unexpected effects
        expect(result.effects).toHaveLength(expectedEffects.length);

        expect(result.totalAddiction).toEqual(0.42);
        expect(result.totalCost).toEqual(7);
        expect(result.sellPrice).toEqual(50);
        expect(result.profit).toEqual(43);
    });
});

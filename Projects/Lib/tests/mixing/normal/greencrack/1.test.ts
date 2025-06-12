// tests/mixing/normal/greencrack/1.test.ts
import { describe, it, expect } from 'vitest';
import { mixProduct } from '@/exports/core/mixing/normal';
import type { IngredientCode } from '@/exports/types/products';

describe('Green Crack mixing: mix Banana → Gasoline', () => {
    it('should include all required effects regardless of order', () => {
        const ingredientCodes = ['BNN', 'GOL'] as IngredientCode[];
        const expectedEffects = ['Thought-Provoking', 'Smelly', 'Toxic'];

        const result = mixProduct('GC', ingredientCodes)._unsafeUnwrap();
        expect(result.effects).toEqual(expect.arrayContaining(expectedEffects));
        expect(result.totalAddiction).toEqual(0.42);
        expect(result.totalCost).toEqual(7);
        expect(result.sellPrice).toEqual(50);
        expect(result.profit).toEqual(43);
    });
});

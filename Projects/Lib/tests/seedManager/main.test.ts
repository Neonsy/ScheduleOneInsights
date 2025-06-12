// tests/seedManager/seedManager.test.ts
import { describe, it, expect } from 'vitest';
import type { IngredientCode } from '@/exports/types/products';
import { encodeRecipe, decodeRecipe } from '@/exports/core/seedManager';

describe('seedManager encode/decode', () => {
    const productCode = 'OK';
    const ingredientsA = ['C', 'CL', 'BNN'] as IngredientCode[];
    const ingredientsB = ['BNN', 'CL', 'C'] as IngredientCode[];

    it('should produce different seeds for the same ingredients with different order', () => {
        const seedA = encodeRecipe(productCode, ingredientsA);
        const seedB = encodeRecipe(productCode, ingredientsB);
        expect(seedA).not.toEqual(seedB);
    });

    it('should decode seeds back to the original recipe preserving order', () => {
        const seedA = encodeRecipe(productCode, ingredientsA);
        const seedB = encodeRecipe(productCode, ingredientsB);

        const decodedA = decodeRecipe(seedA)._unsafeUnwrap();
        const decodedB = decodeRecipe(seedB)._unsafeUnwrap();

        expect(decodedA.productCode).toEqual(productCode);
        expect(decodedB.productCode).toEqual(productCode);

        expect(decodedA.ingredientCodes).toEqual(ingredientsA);
        expect(decodedB.ingredientCodes).toEqual(ingredientsB);
    });
});

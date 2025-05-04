// tests/seedManager/seedManager.test.ts
import { describe, it, expect } from 'vitest';
import { encodeRecipe } from '@/code/core/seedManager/encode';
import { decodeRecipe } from '@/code/core/seedManager/decode';

describe('seedManager encode/decode', () => {
    const productCode = 'OK';
    const ingredientsA = ['C', 'CL', 'BNN'];
    const ingredientsB = ['BNN', 'CL', 'C'];

    it('should produce different seeds for the same ingredients with different order', () => {
        const seedA = encodeRecipe(productCode, ingredientsA);
        const seedB = encodeRecipe(productCode, ingredientsB);
        expect(seedA).not.toEqual(seedB);
    });

    it('should decode seeds back to the original recipe preserving order', () => {
        const seedA = encodeRecipe(productCode, ingredientsA);
        const seedB = encodeRecipe(productCode, ingredientsB);

        const decodedA = decodeRecipe(seedA);
        const decodedB = decodeRecipe(seedB);

        expect(decodedA.productCode).toEqual(productCode);
        expect(decodedB.productCode).toEqual(productCode);

        expect(decodedA.ingredientCodes).toEqual(ingredientsA);
        expect(decodedB.ingredientCodes).toEqual(ingredientsB);
    });
});

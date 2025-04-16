import { describe, expect, it } from 'vitest';
import { mixIngredients, mixFromSeed } from '../../src';

describe('Seed Functionality', () => {
    it('should generate a deterministic seed for a mix', () => {
        const result = mixIngredients('OG Kush', ['Cuke', 'Banana']);
        expect(result.seed).toBeDefined();
        expect(typeof result.seed).toBe('string');
        expect(result.seed.length).toBeGreaterThan(0);
    });

    it('should recreate the same mix from a seed', () => {
        const originalResult = mixIngredients('OG Kush', ['Cuke', 'Banana']);
        const recreatedResult = mixFromSeed(originalResult.seed);

        expect(recreatedResult.effects).toEqual(originalResult.effects);
        expect(recreatedResult.sellingPrice).toEqual(originalResult.sellingPrice);
        expect(recreatedResult.profit).toEqual(originalResult.profit);
        expect(recreatedResult.profitMargin).toEqual(originalResult.profitMargin);
        expect(recreatedResult.addictiveness).toEqual(originalResult.addictiveness);
    });

    it('should generate the same seed for mixes with the same effects', () => {
        // These two mixes should produce the same effects
        const result1 = mixIngredients('OG Kush', ['Cuke', 'Banana']);
        const result2 = mixIngredients('OG Kush', ['Banana', 'Cuke']);

        // Verify they have the same effects
        expect(result1.effects.sort()).toEqual(result2.effects.sort());

        // Since they have the same effects, they should have the same seed
        expect(result1.seed).toEqual(result2.seed);
    });

    it('should generate different seeds for mixes with different effects', () => {
        // These two mixes should produce different effects
        const result1 = mixIngredients('OG Kush', ['Cuke']);
        const result2 = mixIngredients('OG Kush', ['Banana']);

        // Verify they have different effects
        expect(result1.effects).not.toEqual(result2.effects);

        // Since they have different effects, they should have different seeds
        expect(result1.seed).not.toEqual(result2.seed);
    });
});

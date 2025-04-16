import { describe, expect, it } from 'vitest';

import { mixIngredients } from '../../src';

describe('Basic Mixing', () => {
    it('should calculate a basic mix correctly', () => {
        const result = mixIngredients('OG Kush', ['Cuke']);

        expect(result.effects).toContain('Ca'); // Calming
        expect(result.effects).toContain('En'); // Energizing
        expect(result.ingredientCost).toBe(2);
        expect(result.productCost).toBe(35);
        expect(result.sellingPrice).toBeGreaterThan(result.productCost);
        // Profit should be selling price minus ingredient cost
        expect(result.profit).toBe(result.sellingPrice - result.ingredientCost);
    });

    it('should apply transformation rules correctly', () => {
        const result = mixIngredients('OG Kush', ['Mouth Wash']);

        expect(result.effects).toContain('AG'); // AntiGravity
        expect(result.effects).toContain('Ba'); // Balding
        expect(result.effects).not.toContain('Ca'); // Calming
    });

    it('should handle empty ingredients array', () => {
        const result = mixIngredients('OG Kush', []);

        expect(result.effects).toEqual(['Ca']); // Calming
        expect(result.ingredientCost).toBe(0);
    });
});

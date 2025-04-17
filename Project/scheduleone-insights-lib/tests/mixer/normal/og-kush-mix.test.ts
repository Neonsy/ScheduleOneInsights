import { describe, it, expect } from 'vitest';
import { mixIngredients } from '../../../src';

describe('OG Kush Mix Test', () => {
    it('should produce the expected effects for a specific ingredient sequence', () => {
        // Mega Bean → Cuke → Energy Drink → Banana → Horse Semen → Gasoline → Iodine → Mega Bean → Mega Bean → Energy Drink
        const result = mixIngredients('OG Kush', [
            'Mega Bean',
            'Cuke',
            'Energy Drink',
            'Banana',
            'Horse Semen',
            'Gasoline',
            'Iodine',
            'Mega Bean',
            'Mega Bean',
            'Energy Drink',
        ]);

        // Expected effects: Long Faced, Seizure-Inducing, Laxative, Paranoia, Cyclopean, Electrifying, Shrinking, Disorienting
        expect(result.effects).toHaveLength(8);
        expect(result.effects).toContain('LF'); // Long Faced
        expect(result.effects).toContain('SI'); // Seizure-Inducing
        expect(result.effects).toContain('La'); // Laxative
        expect(result.effects).toContain('Pa'); // Paranoia
        expect(result.effects).toContain('Cy'); // Cyclopean
        expect(result.effects).toContain('El'); // Electrifying
        expect(result.effects).toContain('Sh'); // Shrinking
        expect(result.effects).toContain('Di'); // Disorienting

        // Expected costs and prices
        expect(result.ingredientCost).toBe(59);
        expect(result.sellingPrice).toBe(111);
        expect(result.profit).toBe(52);
    });
});

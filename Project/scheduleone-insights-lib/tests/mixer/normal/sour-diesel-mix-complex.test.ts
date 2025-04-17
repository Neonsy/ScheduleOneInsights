import { describe, it, expect } from 'vitest';
import { mixIngredients } from '../../../src/core/mixer';
import { EffectCode } from '../../../src/types';

describe('Sour Diesel Complex Mix Test', () => {
    it('should produce the expected effects when mixing Sour Diesel with multiple ingredients', () => {
        // Define the expected effects in the exact order shown in-game
        const expectedEffects: EffectCode[] = [
            'Re', // Refreshing
            'Ca', // Calming
            'Se', // Sedating
            'At', // Athletic
            'TT', // Tropic Thunder
            'Pa', // Paranoia
            'BE', // Bright-Eyed
            'En'  // Energizing
        ];

        // Mix the ingredients in the exact order specified
        const result = mixIngredients('Sour Diesel', [
            'Gasoline', 
            'Cuke', 
            'Cuke', 
            'Motor Oil', 
            'Gasoline', 
            'Paracetamol', 
            'Battery', 
            'Cuke', 
            'Cuke'
        ]);

        // Verify the effects
        const matchingEffects = result.effects.filter((effect) => expectedEffects.includes(effect));
        const missingEffects = expectedEffects.filter((effect) => !result.effects.includes(effect));

        // Verify that all expected effects are present
        expect(matchingEffects.length).toBe(expectedEffects.length);
        expect(missingEffects.length).toBe(0);

        // Verify the costs
        expect(result.ingredientCost).toBe(35);
        expect(result.sellingPrice).toBe(102);
        expect(result.profit).toBe(67);
    });
});

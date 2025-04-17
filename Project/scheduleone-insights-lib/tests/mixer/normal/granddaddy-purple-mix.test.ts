import { describe, it, expect } from 'vitest';
import { mixIngredients } from '../../../src/core/mixer';
import { EffectCode } from '../../../src/types';

describe('Granddaddy Purple Mix Test', () => {
    it('should produce the expected effects when mixing Granddaddy Purple with Viagra, Paracetamol, Cuke, and two Donuts', () => {
        // Define the expected effects in the exact order shown in-game
        const expectedEffects: EffectCode[] = [
            'Pa', // Paranoia
            'Se', // Sedating
            'TT', // Tropic Thunder
            'En', // Energizing
            'CD', // Calorie-Dense
            'Ex', // Explosive
        ];

        // Mix the ingredients in the exact order specified
        const result = mixIngredients('Granddaddy Purple', ['Viagra', 'Paracetamol', 'Cuke', 'Donut', 'Donut']);

        // Verify the effects
        const matchingEffects = result.effects.filter((effect) => expectedEffects.includes(effect));
        const missingEffects = expectedEffects.filter((effect) => !result.effects.includes(effect));

        // Verify that all expected effects are present
        expect(matchingEffects.length).toBe(expectedEffects.length);
        expect(missingEffects.length).toBe(0);

        // Verify the costs
        expect(result.ingredientCost).toBe(15);
        expect(result.sellingPrice).toBe(78);
        expect(result.profit).toBe(63);
    });
});

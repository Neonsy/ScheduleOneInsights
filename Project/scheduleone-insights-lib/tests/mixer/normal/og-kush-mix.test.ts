import { describe, it, expect } from 'vitest';
import { mixIngredients } from '../../../src/core/mixer';
import { EffectCode } from '../../../src/types';

describe('OG Kush Mix Test', () => {
    it('should produce the expected effects when mixing OG Kush with Energy Drink, Cuke, Banana, and two Flu Medicines', () => {
        // Define the expected effects in the exact order shown in-game
        const expectedEffects: EffectCode[] = [
            'Sn', // Sneaky
            'Sl', // Slippery
            'TP', // Thought-Provoking
            'Gi', // Gingeritis
            'Se'  // Sedating
        ];

        // Mix the ingredients in the exact order specified
        const result = mixIngredients('OG Kush', ['Energy Drink', 'Cuke', 'Banana', 'Flu Medicine', 'Flu Medicine']);

        // Verify the effects
        const matchingEffects = result.effects.filter((effect) => expectedEffects.includes(effect));
        const missingEffects = expectedEffects.filter((effect) => !result.effects.includes(effect));

        // Verify that all expected effects are present
        expect(matchingEffects.length).toBe(expectedEffects.length);
        expect(missingEffects.length).toBe(0);

        // Verify the costs
        expect(result.ingredientCost).toBe(20);
        expect(result.sellingPrice).toBe(87);
        expect(result.profit).toBe(67);
    });
});

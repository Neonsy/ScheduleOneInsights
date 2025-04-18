import { describe, it, expect } from 'vitest';
import { mixIngredients } from '../../../src/core/mixer';
import { EffectCode } from '../../../src/types';

describe('Green Crack Mix Test', () => {
    it('should produce the expected effects when mixing Green Crack with Banana, Chili, Mouth Wash, Mega Bean, Mega Bean, and Horse Semen', () => {
        // Define the expected effects
        const expectedEffects: EffectCode[] = [
            'Cclpn', // Cyclopean
            'Rfrs', // Refreshing
            'Spcy', // Spicy
            'Bldg', // Balding
            'Fg', // Foggy
            'LF', // Long Faced
        ];

        // Mix the ingredients in the exact order specified
        const result = mixIngredients('Green Crack', ['Banana', 'Chili', 'Mouth Wash', 'Mega Bean', 'Mega Bean', 'Horse Semen']);

        // Verify the effects
        const matchingEffects = result.effects.filter((effect) => expectedEffects.includes(effect));
        const missingEffects = expectedEffects.filter((effect) => !result.effects.includes(effect));

        // Log the actual effects for debugging
        console.log('Expected effects:', expectedEffects);
        console.log('Actual effects:', result.effects);
        console.log('Missing effects:', missingEffects);

        // Verify that all expected effects are present
        expect(matchingEffects.length).toBe(expectedEffects.length);
        expect(missingEffects.length).toBe(0);

        // Verify the costs
        expect(result.ingredientCost).toBe(36);
        expect(result.sellingPrice).toBe(114);
        expect(result.profit).toBe(78);
    });
});

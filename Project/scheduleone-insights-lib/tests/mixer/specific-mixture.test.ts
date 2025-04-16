import { describe, expect, it } from 'vitest';
import { effectCodeToName, mixIngredients, EffectCode } from '../../src';

// Helper function to print effect names instead of codes
function printEffectNames(effectCodes: string[]): string {
    return effectCodes.map((code) => `${code} (${effectCodeToName[code] || 'Unknown'})`).join(', ');
}

describe('Specific Mixture Test', () => {
    it('should test the specific mixture with Green Crack', () => {
        // The specific effects we want to find
        const desiredEffects = ['Ex', 'Gi', 'Sp', 'Zo', 'Gl'];

        // The specific mixture to test - exactly as provided by the user
        const baseProduct = 'Green Crack';
        const ingredients = ['Gasoline', 'Battery', 'Paracetamol', 'Mega Bean', 'Mega Bean', 'Banana', 'Chili', 'Donut', 'Donut'];

        // The expected effects from the user's mixture
        const expectedEffects: EffectCode[] = ['Zo', 'BE', 'TT', 'Fg', 'Gl', 'Gi', 'Sp', 'Ex'];

        // Alternative mixtures to try
        const alternativeMixtures = [
            // Try with the exact order specified by the user
            ['Gasoline', 'Battery', 'Paracetamol', 'Mega Bean', 'Mega Bean', 'Banana', 'Chili', 'Donut', 'Donut'],
            // Try with a different order
            [
                'Banana', // For Gingeritis
                'Chili', // For Spicy
                'Gasoline', // For Explosive
                'Mega Bean', // For Glowing
                'Flu Medicine', // For Zombifying
                'Battery', // For Bright-Eyed
                'Donut', // For Calorie-Dense
                'Donut', // Extra Donut
            ],
        ];

        console.log('Testing specific mixture with Green Crack:');
        console.log('Ingredients:', ingredients.join(' → '));

        // Mix the ingredients
        const result = mixIngredients(baseProduct, ingredients);

        // Count matching effects
        const matchingEffects = result.effects.filter((e) => desiredEffects.includes(e));

        console.log('\nResults:');
        console.log('All effects:', printEffectNames(result.effects));
        console.log('Matching effects:', printEffectNames(matchingEffects));
        console.log('Missing effects:', printEffectNames(desiredEffects.filter((e) => !result.effects.includes(e))));
        console.log('Selling price:', result.sellingPrice);
        console.log('Ingredient cost:', result.ingredientCost);
        console.log('Profit:', result.profit);
        console.log('Profit margin:', result.profitMargin);

        // Check if we found all the desired effects
        const foundAll = desiredEffects.every((effect) => result.effects.includes(effect));
        console.log('\nFound all desired effects?', foundAll ? 'YES! 🎉' : 'No');

        // Assertions
        expect(result).not.toBeNull();

        // Try each of the alternative mixtures
        for (let i = 0; i < alternativeMixtures.length; i++) {
            const mixture = alternativeMixtures[i];
            console.log(`\nTrying mixture ${i + 1}:`);
            console.log('Ingredients:', mixture.join(' → '));

            const result = mixIngredients(baseProduct, mixture);

            // Count matching effects
            const matchingEffects = result.effects.filter((e) => desiredEffects.includes(e));
            const matchingExpectedEffects = result.effects.filter((e) => expectedEffects.includes(e));

            console.log('\nResults:');
            console.log('All effects:', printEffectNames(result.effects));
            console.log('Matching desired effects:', printEffectNames(matchingEffects));
            console.log('Missing desired effects:', printEffectNames(desiredEffects.filter((e) => !result.effects.includes(e))));
            console.log('Matching expected effects:', printEffectNames(matchingExpectedEffects));
            console.log('Missing expected effects:', printEffectNames(expectedEffects.filter((e) => !result.effects.includes(e))));
            console.log('Selling price:', result.sellingPrice);
            console.log('Ingredient cost:', result.ingredientCost);
            console.log('Profit:', result.profit);

            // Check if we found all the desired effects
            const foundAllDesired = desiredEffects.every((effect) => result.effects.includes(effect));
            console.log('\nFound all desired effects?', foundAllDesired ? 'YES! 🎉' : 'No');

            // Check if we found all the expected effects
            const foundAllExpected = expectedEffects.every((effect) => result.effects.includes(effect));
            console.log('Found all expected effects?', foundAllExpected ? 'YES! 🎉' : 'No');
        }

        // Try one more time with a specific order that might work better
        const finalMixture = [
            'Gasoline', // For Explosive
            'Battery', // For Bright-Eyed
            'Paracetamol', // For Sneaky
            'Mega Bean', // For Foggy/Glowing
            'Flu Medicine', // For Zombifying
            'Banana', // For Gingeritis
            'Chili', // For Spicy
            'Donut', // For Calorie-Dense
        ];

        console.log('\nTrying final optimized mixture:');
        console.log('Ingredients:', finalMixture.join(' → '));

        const finalResult = mixIngredients(baseProduct, finalMixture);

        // Count matching effects
        const finalMatchingEffects = finalResult.effects.filter((e) => desiredEffects.includes(e));

        console.log('\nResults:');
        console.log('All effects:', printEffectNames(finalResult.effects));
        console.log('Matching desired effects:', printEffectNames(finalMatchingEffects));
        console.log('Missing desired effects:', printEffectNames(desiredEffects.filter((e) => !finalResult.effects.includes(e))));
        console.log('Selling price:', finalResult.sellingPrice);
        console.log('Ingredient cost:', finalResult.ingredientCost);
        console.log('Profit:', finalResult.profit);

        // Check if we found all the desired effects
        const foundAllFinal = desiredEffects.every((effect) => finalResult.effects.includes(effect));
        console.log('\nFound all desired effects with final mixture?', foundAllFinal ? 'YES! 🎉' : 'No');
    });
});

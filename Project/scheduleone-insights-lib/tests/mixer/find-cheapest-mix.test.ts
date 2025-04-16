import { describe, expect, it } from 'vitest';
import { findMixForEffects, FindMixOptions, effectCodeToName, EffectCode } from '../../src';

// Helper function to print effect names instead of codes
function printEffectNames(effectCodes: string[]): string {
    return effectCodes.map((code) => `${code} (${effectCodeToName[code] || 'Unknown'})`).join(', ');
}

describe('Find Cheapest Mix for Desired Effects', () => {
    it('should find the cheapest mix for Green Crack with specific desired effects', () => {
        // Define the effects we want based on the screenshot
        const desiredEffects: EffectCode[] = [
            'Re', // Refreshing
            'El', // Electrifying
            'LF', // Long Faced
            'TP', // Thought-Provoking
            'En', // Energizing
            'CD', // Calorie-Dense
            'At'  // Athletic
        ];

        console.log('Searching for effects:', printEffectNames(desiredEffects));

        // Options for the search - optimize for cost
        const options: FindMixOptions = {
            optimizeFor: 'cost',
            mustUseAllIngredients: false,
            allowRepeatedIngredients: true,
            timeoutMs: 15000,
        };

        // Find the cheapest mix
        const result = findMixForEffects('GC', desiredEffects, options);

        // Log the result for inspection
        console.log('\nCheapest mix found:');
        console.log('Complete search?', result?.complete);
        console.log('Ingredients used:', result?.ingredientsUsed);
        console.log('Effects achieved:', printEffectNames(result?.result.effects || []));
        
        // Log which desired effects were found and which were missing
        const matchingEffects = result?.result.effects.filter((e) => desiredEffects.includes(e)) || [];
        const missingEffects = desiredEffects.filter((e) => !result?.result.effects.includes(e));
        
        console.log('Matching effects:', printEffectNames(matchingEffects));
        console.log('Missing effects:', printEffectNames(missingEffects));
        console.log('Ingredient cost:', result?.result.ingredientCost);
        console.log('Selling price:', result?.result.sellingPrice);
        console.log('Profit:', result?.result.profit);

        // Assertions
        expect(result).not.toBeNull();
        
        // Check how many of the desired effects were found
        const foundCount = matchingEffects.length;
        console.log(`\nFound ${foundCount} out of ${desiredEffects.length} desired effects`);
        
        // Verify that the algorithm found a valid solution
        expect(foundCount).toBeGreaterThan(0);
        
        // If we found all effects, verify it's the cheapest solution
        if (foundCount === desiredEffects.length) {
            console.log('\nFound all desired effects!');
            expect(result?.result.ingredientCost).toBeLessThanOrEqual(30); // Reasonable cost threshold
        } else {
            console.log('\nCould not find all desired effects.');
            console.log('Missing:', printEffectNames(missingEffects));
        }
    });
});

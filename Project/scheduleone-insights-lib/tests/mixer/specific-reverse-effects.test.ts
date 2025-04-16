import { describe, expect, it } from 'vitest';
import { findMixForEffects, FindMixOptions, effectCodeToName, EffectCode } from '../../src';

// Helper function to print effect names instead of codes
function printEffectNames(effectCodes: string[]): string {
    return effectCodes.map((code) => `${code} (${effectCodeToName[code] || 'Unknown'})`).join(', ');
}

describe('Specific Reverse Effects Test', () => {
    it('should find a mix for Green Crack with specific desired effects', () => {
        // Define the effects we want
        const desiredEffects: EffectCode[] = [
            'El',  // Electrifying
            'Di',  // Disorienting
            'Je',  // Jennerising
            'To',  // Toxic
            'Gl'   // Glowing
        ];

        console.log('Searching for effects:', printEffectNames(desiredEffects));

        // Options for the search
        const options: FindMixOptions = {
            optimizeFor: 'profit',
            mustUseAllIngredients: false,
            allowRepeatedIngredients: true,
            timeoutMs: 30000, // Give it more time for this complex search
        };

        // Find the best mix
        const result = findMixForEffects('GC', desiredEffects, options);

        // Log the result for inspection
        console.log('\nBest mix found:');
        console.log('Complete search?', result?.complete);
        console.log('Ingredients used:', result?.ingredientsUsed);
        console.log('Effects achieved:', printEffectNames(result?.result.effects || []));
        
        // Log which desired effects were found and which were missing
        const matchingEffects = result?.result.effects.filter((e) => desiredEffects.includes(e)) || [];
        const missingEffects = desiredEffects.filter((e) => !result?.result.effects.includes(e));
        
        console.log('Matching effects:', printEffectNames(matchingEffects));
        console.log('Missing effects:', printEffectNames(missingEffects));
        console.log('Selling price:', result?.result.sellingPrice);
        console.log('Ingredient cost:', result?.result.ingredientCost);
        console.log('Profit:', result?.result.profit);
        console.log('Profit margin:', result?.result.profitMargin);

        // Assertions
        expect(result).not.toBeNull();
        
        // Check how many of the desired effects were found
        const foundCount = matchingEffects.length;
        console.log(`\nFound ${foundCount} out of ${desiredEffects.length} desired effects`);
        
        // Verify that we found at least some of the desired effects
        expect(foundCount).toBeGreaterThan(0);
    });
});

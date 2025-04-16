import { describe, expect, it } from 'vitest';
import { findMixForEffects, FindMixOptions, effects, effectCodeToName } from '../../src';

// Helper function to print effect names instead of codes
function printEffectNames(effectCodes: string[]): string {
    return effectCodes.map((code) => `${code} (${effectCodeToName[code] || 'Unknown'})`).join(', ');
}

describe('Specific Effects Search', () => {
    it('should find a mix for Green Crack with specific effects', () => {
        // Define the effects we want
        const desiredEffects = ['Ex', 'Gi', 'Sp', 'Zo', 'Gl'];
        const desiredEffectNames = desiredEffects.map((code) => effectCodeToName[code]);

        console.log('Searching for effects:', printEffectNames(desiredEffects));

        // Options for the search
        const options: FindMixOptions = {
            optimizeFor: 'profit',
            mustUseAllIngredients: false,
            allowRepeatedIngredients: false,
            timeoutMs: 10000, // Give it more time for this complex search
        };

        // Find the best mix
        const result = findMixForEffects('GC', desiredEffects, options);

        // Log the result for inspection
        console.log('\nGreen Crack mix with desired effects:');
        console.log('Complete search?', result?.complete);
        console.log('Ingredients used:', result?.ingredientsUsed);
        console.log('Effects achieved:', printEffectNames(result?.result.effects || []));
        console.log('Matching effects:', printEffectNames(result?.result.effects.filter((e) => desiredEffects.includes(e)) || []));
        console.log('Missing effects:', printEffectNames(desiredEffects.filter((e) => !result?.result.effects.includes(e))));
        console.log('Selling price:', result?.result.sellingPrice);
        console.log('Ingredient cost:', result?.result.ingredientCost);
        console.log('Profit:', result?.result.profit);
        console.log('Profit margin:', result?.result.profitMargin);

        // Assertions
        expect(result).not.toBeNull();

        // Check that we found at least some of the desired effects
        const matchingEffects = result?.result.effects.filter((e) => desiredEffects.includes(e)) || [];
        expect(matchingEffects.length).toBeGreaterThan(0);

        // Try with repeated ingredients allowed
        const resultWithRepeats = findMixForEffects('GC', desiredEffects, {
            ...options,
            allowRepeatedIngredients: true,
        });

        console.log('\nGreen Crack mix with repeated ingredients:');
        console.log('Complete search?', resultWithRepeats?.complete);
        console.log('Ingredients used:', resultWithRepeats?.ingredientsUsed);
        console.log('Effects achieved:', printEffectNames(resultWithRepeats?.result.effects || []));
        console.log('Matching effects:', printEffectNames(resultWithRepeats?.result.effects.filter((e) => desiredEffects.includes(e)) || []));
        console.log('Missing effects:', printEffectNames(desiredEffects.filter((e) => !resultWithRepeats?.result.effects.includes(e))));

        // Compare the results
        const matchingEffectsWithRepeats = resultWithRepeats?.result.effects.filter((e) => desiredEffects.includes(e)) || [];
        console.log('\nComparison:');
        console.log('Effects matched without repeats:', matchingEffects.length);
        console.log('Effects matched with repeats:', matchingEffectsWithRepeats.length);
    });

    it('should try to find all desired effects with extended search', () => {
        // Define the effects we want
        const desiredEffects = ['Ex', 'Gi', 'Sp', 'Zo', 'Gl'];

        console.log('\nExtended search for effects:', printEffectNames(desiredEffects));

        // Options for the search with longer timeout
        const options: FindMixOptions = {
            optimizeFor: 'profit',
            mustUseAllIngredients: false,
            allowRepeatedIngredients: true, // Allow repeats for more combinations
            timeoutMs: 30000, // 30 seconds
        };

        // Find the best mix
        const result = findMixForEffects('GC', desiredEffects, options);

        // Log the result for inspection
        console.log('\nBest mix found:');
        console.log('Complete search?', result?.complete);
        console.log('Ingredients used:', result?.ingredientsUsed);
        console.log('Effects achieved:', printEffectNames(result?.result.effects || []));
        console.log('Matching effects:', printEffectNames(result?.result.effects.filter((e) => desiredEffects.includes(e)) || []));
        console.log('Missing effects:', printEffectNames(desiredEffects.filter((e) => !result?.result.effects.includes(e))));
        console.log('Selling price:', result?.result.sellingPrice);
        console.log('Profit:', result?.result.profit);

        // Assertions
        expect(result).not.toBeNull();

        // Check how many effects we found
        const matchingEffects = result?.result.effects.filter((e) => desiredEffects.includes(e)) || [];
        console.log(`Found ${matchingEffects.length} out of ${desiredEffects.length} desired effects`);
    });

    it('should try each effect individually', () => {
        // Define the effects we want
        const desiredEffects = ['Ex', 'Gi', 'Sp', 'Zo', 'Gl'];

        console.log('\nSearching for each effect individually:');

        // Options for the search
        const options: FindMixOptions = {
            optimizeFor: 'profit',
            mustUseAllIngredients: false,
            allowRepeatedIngredients: true,
            timeoutMs: 5000, // 5 seconds per effect
        };

        // Try each effect individually
        for (const effect of desiredEffects) {
            const result = findMixForEffects('GC', [effect], options);

            console.log(`\nSearch for ${effect} (${effectCodeToName[effect]}):`);
            console.log('Found?', result?.result.effects.includes(effect));
            console.log('Ingredients:', result?.ingredientsUsed);
            console.log('All effects:', printEffectNames(result?.result.effects || []));
        }
    });
});

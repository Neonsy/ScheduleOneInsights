import { describe, expect, it } from 'vitest';
import { findMixForEffects, FindMixOptions, effectCodeToName, EffectCode, mixIngredients } from '../../src';

// Helper function to print effect names instead of codes
function printEffectNames(effectCodes: string[]): string {
    return effectCodes.map((code) => `${code} (${effectCodeToName[code] || 'Unknown'})`).join(', ');
}

describe('Finding Thought-Provoking Effect', () => {
    it('should try to find a mix that includes the Thought-Provoking effect', () => {
        // Just look for the Thought-Provoking effect
        const desiredEffects: EffectCode[] = ['TP']; // Thought-Provoking

        console.log('Searching for effect:', printEffectNames(desiredEffects));

        // Options for the search
        const options: FindMixOptions = {
            optimizeFor: 'cost',
            mustUseAllIngredients: false,
            allowRepeatedIngredients: true,
            timeoutMs: 15000,
        };

        // Find a mix with the Thought-Provoking effect
        const result = findMixForEffects('GC', desiredEffects, options);

        // Log the result
        console.log('\nResult for Thought-Provoking effect:');
        console.log('Complete search?', result?.complete);
        
        if (result) {
            console.log('Ingredients used:', result.ingredientsUsed);
            console.log('Effects achieved:', printEffectNames(result.result.effects || []));
            console.log('Has Thought-Provoking effect?', result.result.effects.includes('TP') ? 'Yes' : 'No');
            console.log('Ingredient cost:', result.result.ingredientCost);
        } else {
            console.log('No solution found for Thought-Provoking effect');
        }

        // Try all individual ingredients to see if any produce the Thought-Provoking effect
        console.log('\nTesting all individual ingredients for Thought-Provoking effect:');
        const ingredients = [
            'Addy', 'Banana', 'Cuke', 'Donut', 'Energy Drink', 
            'Horse Semen', 'Jenkem', 'Ketamine', 'LSD', 'Meth', 
            'Nutmeg', 'Opium', 'PCP', 'Quaaludes', 'Rum', 
            'Shrooms', 'Tobacco', 'Uranium'
        ];
        
        for (const ingredient of ingredients) {
            const mix = mixIngredients('Green Crack', [ingredient]);
            const hasTP = mix.effects.includes('TP');
            console.log(`${ingredient}: ${hasTP ? 'Has TP ✓' : 'No TP ✗'}`);
            
            if (hasTP) {
                console.log(`  Effects: ${printEffectNames(mix.effects)}`);
            }
        }
        
        // Try some common combinations
        console.log('\nTesting some combinations for Thought-Provoking effect:');
        const combinations = [
            ['Banana', 'Horse Semen'],
            ['Banana', 'Cuke'],
            ['Banana', 'Donut'],
            ['Banana', 'Energy Drink'],
            ['Horse Semen', 'Cuke'],
            ['Horse Semen', 'Donut'],
            ['Horse Semen', 'Energy Drink'],
            ['Cuke', 'Donut'],
            ['Cuke', 'Energy Drink'],
            ['Donut', 'Energy Drink'],
            ['Shrooms', 'LSD'],
            ['Addy', 'Meth'],
            ['Opium', 'PCP']
        ];
        
        for (const combo of combinations) {
            const mix = mixIngredients('Green Crack', combo);
            const hasTP = mix.effects.includes('TP');
            console.log(`${combo.join(' + ')}: ${hasTP ? 'Has TP ✓' : 'No TP ✗'}`);
            
            if (hasTP) {
                console.log(`  Effects: ${printEffectNames(mix.effects)}`);
            }
        }
    });
});

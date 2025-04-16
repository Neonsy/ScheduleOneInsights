import { describe, expect, it } from 'vitest';
import { 
    findMixForEffects, 
    FindMixOptions, 
    effectCodeToName,
    mixIngredients,
    EffectCode
} from '../../src';

// Helper function to print effect names instead of codes
function printEffectNames(effectCodes: string[]): string {
    return effectCodes.map(code => `${code} (${effectCodeToName[code] || 'Unknown'})`).join(', ');
}

describe('Combined Approach for Finding Effects', () => {
    // The specific effects we want to find
    const desiredEffects = ['Ex', 'Gi', 'Sp', 'Zo', 'Gl'];
    
    it('should try to find ingredients for each effect individually and then combine them', () => {
        console.log('Searching for ingredients that produce each effect individually:');
        
        // Options for individual searches
        const options: FindMixOptions = {
            optimizeFor: 'profit',
            mustUseAllIngredients: false,
            allowRepeatedIngredients: true,
            timeoutMs: 10000 // 10 seconds per effect
        };
        
        // Store the best ingredients for each effect
        const effectToIngredients: Record<EffectCode, string[]> = {};
        
        // Try to find each effect individually
        for (const effect of desiredEffects) {
            console.log(`\nSearching for ${effect} (${effectCodeToName[effect]}):`);
            
            // Try with different base products
            const baseProducts = ['OK', 'SD', 'GC', 'GP'];
            let bestResult = null;
            
            for (const productCode of baseProducts) {
                const result = findMixForEffects(productCode, [effect], options);
                
                if (result && result.result.effects.includes(effect)) {
                    console.log(`Found with ${productCode}: ${result.ingredientsUsed.join(', ')}`);
                    bestResult = result;
                    break;
                }
            }
            
            if (bestResult) {
                effectToIngredients[effect] = bestResult.ingredientsUsed;
            } else {
                console.log(`Could not find ${effect} with any base product`);
            }
        }
        
        console.log('\nBest ingredients for each effect:');
        for (const effect of desiredEffects) {
            if (effectToIngredients[effect]) {
                console.log(`${effect} (${effectCodeToName[effect]}): ${effectToIngredients[effect].join(', ')}`);
            } else {
                console.log(`${effect} (${effectCodeToName[effect]}): Not found`);
            }
        }
        
        // Now try to combine all the ingredients we found
        console.log('\nTrying to combine all found ingredients:');
        
        // Collect all unique ingredients
        const allIngredients = new Set<string>();
        for (const ingredients of Object.values(effectToIngredients)) {
            if (ingredients) {
                ingredients.forEach(ing => allIngredients.add(ing));
            }
        }
        
        // Try with different base products
        const baseProducts = ['OK', 'SD', 'GC', 'GP'];
        let bestResult = null;
        let bestEffectsMatched = 0;
        
        for (const productCode of baseProducts) {
            // Try with all ingredients
            const ingredientsList = Array.from(allIngredients);
            const result = mixIngredients(productCode === 'OK' ? 'OG Kush' : 
                           productCode === 'SD' ? 'Sour Diesel' :
                           productCode === 'GC' ? 'Green Crack' : 'Granddaddy Purple', 
                           ingredientsList.slice(0, 8)); // Max 8 ingredients
            
            // Count matching effects
            const matchingEffects = result.effects.filter(e => desiredEffects.includes(e));
            
            console.log(`\nWith ${productCode} and ${ingredientsList.slice(0, 8).join(', ')}:`);
            console.log(`Found ${matchingEffects.length} out of ${desiredEffects.length} desired effects`);
            console.log('Matching effects:', printEffectNames(matchingEffects));
            console.log('Missing effects:', printEffectNames(desiredEffects.filter(e => !result.effects.includes(e))));
            
            if (matchingEffects.length > bestEffectsMatched) {
                bestEffectsMatched = matchingEffects.length;
                bestResult = result;
            }
        }
        
        // Print the best result
        console.log('\n===== BEST COMBINED RESULT =====');
        console.log('All effects:', printEffectNames(bestResult?.effects || []));
        console.log('Matching effects:', printEffectNames(bestResult?.effects.filter(e => desiredEffects.includes(e)) || []));
        console.log('Missing effects:', printEffectNames(desiredEffects.filter(e => !bestResult?.effects.includes(e))));
        console.log('Selling price:', bestResult?.sellingPrice);
        console.log('Profit:', bestResult?.profit);
        
        // Assertions
        expect(bestResult).not.toBeNull();
        expect(bestEffectsMatched).toBeGreaterThan(0);
    });
});

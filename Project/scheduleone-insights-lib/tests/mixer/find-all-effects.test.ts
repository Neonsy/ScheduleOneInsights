import { describe, expect, it } from 'vitest';
import { 
    findMixForEffects, 
    FindMixOptions, 
    effectCodeToName, 
    products, 
    ProductCode 
} from '../../src';

// Helper function to print effect names instead of codes
function printEffectNames(effectCodes: string[]): string {
    return effectCodes.map(code => `${code} (${effectCodeToName[code] || 'Unknown'})`).join(', ');
}

describe('Find All Desired Effects', () => {
    // The specific effects we want to find
    const desiredEffects = ['Ex', 'Gi', 'Sp', 'Zo', 'Gl'];
    
    it('should try to find all desired effects with different base products', () => {
        console.log('Searching for ALL of these effects:', printEffectNames(desiredEffects));
        console.log('Note: Additional effects are fine, as long as all desired effects are included');
        
        // Options for the search
        const options: FindMixOptions = {
            optimizeFor: 'profit',
            mustUseAllIngredients: false,
            allowRepeatedIngredients: true, // Allow repeats for more combinations
            timeoutMs: 15000 // 15 seconds per product
        };
        
        // Try each product as a base
        const productCodes = Object.keys(products) as ProductCode[];
        let bestResult = null;
        let bestProductCode = null;
        let bestMatchCount = 0;
        
        for (const productCode of productCodes) {
            const productName = products[productCode].name;
            console.log(`\nTrying base product: ${productName} (${productCode})`);
            
            // Find the best mix for this product
            const result = findMixForEffects(productCode, desiredEffects, options);
            
            // Count how many desired effects were found
            const matchingEffects = result?.result.effects.filter(e => desiredEffects.includes(e)) || [];
            const matchCount = matchingEffects.length;
            
            console.log(`Found ${matchCount} out of ${desiredEffects.length} desired effects`);
            console.log('Matching effects:', printEffectNames(matchingEffects));
            console.log('Missing effects:', printEffectNames(desiredEffects.filter(e => !result?.result.effects.includes(e))));
            
            // If this is the best result so far, save it
            if (matchCount > bestMatchCount) {
                bestMatchCount = matchCount;
                bestResult = result;
                bestProductCode = productCode;
                
                // If we found all desired effects, we can stop
                if (matchCount === desiredEffects.length) {
                    console.log('\n🎉 Found all desired effects!');
                    break;
                }
            }
        }
        
        // Print the best result
        console.log('\n===== BEST RESULT =====');
        console.log(`Base product: ${products[bestProductCode!].name} (${bestProductCode})`);
        console.log('Ingredients used:', bestResult?.ingredientsUsed);
        console.log('All effects:', printEffectNames(bestResult?.result.effects || []));
        console.log('Matching effects:', printEffectNames(bestResult?.result.effects.filter(e => desiredEffects.includes(e)) || []));
        console.log('Missing effects:', printEffectNames(desiredEffects.filter(e => !bestResult?.result.effects.includes(e))));
        console.log('Selling price:', bestResult?.result.sellingPrice);
        console.log('Profit:', bestResult?.result.profit);
        
        // Assertions
        expect(bestResult).not.toBeNull();
        expect(bestMatchCount).toBeGreaterThan(0);
    });
    
    it('should try to find a mix with all desired effects using a more aggressive search', () => {
        console.log('\nAggressive search for ALL desired effects:', printEffectNames(desiredEffects));
        
        // More aggressive options
        const options: FindMixOptions = {
            optimizeFor: 'profit',
            mustUseAllIngredients: false,
            allowRepeatedIngredients: true,
            timeoutMs: 30000 // 30 seconds
        };
        
        // Try with OG Kush as the base (a common starting product)
        const result = findMixForEffects('OK', desiredEffects, options);
        
        // Count how many desired effects were found
        const matchingEffects = result?.result.effects.filter(e => desiredEffects.includes(e)) || [];
        
        console.log(`\nFound ${matchingEffects.length} out of ${desiredEffects.length} desired effects with OG Kush`);
        console.log('Ingredients used:', result?.ingredientsUsed);
        console.log('All effects:', printEffectNames(result?.result.effects || []));
        console.log('Matching effects:', printEffectNames(matchingEffects));
        console.log('Missing effects:', printEffectNames(desiredEffects.filter(e => !result?.result.effects.includes(e))));
        
        // Assertions
        expect(result).not.toBeNull();
    });
});

import { describe, expect, it } from 'vitest';
import { 
    effectCodeToName, 
    mixIngredients, 
    EffectCode,
    products,
    ProductCode
} from '../../src';

// Helper function to print effect names instead of codes
function printEffectNames(effectCodes: string[]): string {
    return effectCodes.map(code => `${code} (${effectCodeToName[code] || 'Unknown'})`).join(', ');
}

describe('Final Attempt to Find All Effects', () => {
    it('should try a very specific combination to get all desired effects', () => {
        // The specific effects we want to find
        const desiredEffects = ['Ex', 'Gi', 'Sp', 'Zo', 'Gl'];
        
        console.log('Attempting to find a mix with ALL of these effects:', printEffectNames(desiredEffects));
        
        // Try with different base products
        const productCodes = Object.keys(products) as ProductCode[];
        
        // Specific combinations to try
        const combinations = [
            // Combination 1: Based on user's example but modified
            ['Gasoline', 'Battery', 'Paracetamol', 'Mega Bean', 'Flu Medicine', 'Banana', 'Chili', 'Donut'],
            
            // Combination 2: Focus on getting Zombifying and Glowing
            ['Flu Medicine', 'Mega Bean', 'Gasoline', 'Battery', 'Banana', 'Chili', 'Donut', 'Mouth Wash'],
            
            // Combination 3: Try with Energy Drink
            ['Energy Drink', 'Flu Medicine', 'Mega Bean', 'Gasoline', 'Banana', 'Chili', 'Battery', 'Donut'],
            
            // Combination 4: Try with Motor Oil
            ['Motor Oil', 'Flu Medicine', 'Mega Bean', 'Gasoline', 'Banana', 'Chili', 'Battery', 'Donut'],
            
            // Combination 5: Try with Addy
            ['Addy', 'Flu Medicine', 'Mega Bean', 'Gasoline', 'Banana', 'Chili', 'Battery', 'Donut'],
            
            // Combination 6: Try with Horse Semen
            ['Horse Semen', 'Flu Medicine', 'Mega Bean', 'Gasoline', 'Banana', 'Chili', 'Battery', 'Donut'],
            
            // Combination 7: Try with Iodine
            ['Iodine', 'Flu Medicine', 'Mega Bean', 'Gasoline', 'Banana', 'Chili', 'Battery', 'Donut'],
            
            // Combination 8: Try with Viagra
            ['Viagra', 'Flu Medicine', 'Mega Bean', 'Gasoline', 'Banana', 'Chili', 'Battery', 'Donut'],
        ];
        
        let bestResult = null;
        let bestProductCode = null;
        let bestCombination = null;
        let bestMatchCount = 0;
        
        // Try each product with each combination
        for (const productCode of productCodes) {
            const productName = products[productCode].name;
            
            for (let i = 0; i < combinations.length; i++) {
                const combo = combinations[i];
                
                console.log(`\nTrying ${productName} with combination ${i + 1}:`);
                console.log('Ingredients:', combo.join(' → '));
                
                const result = mixIngredients(productName, combo);
                
                // Count matching effects
                const matchingEffects = result.effects.filter(e => desiredEffects.includes(e));
                
                console.log('All effects:', printEffectNames(result.effects));
                console.log('Matching effects:', printEffectNames(matchingEffects));
                console.log('Missing effects:', printEffectNames(desiredEffects.filter(e => !result.effects.includes(e))));
                console.log('Selling price:', result.sellingPrice);
                console.log('Ingredient cost:', result.ingredientCost);
                console.log('Profit:', result.profit);
                
                // Check if this is the best result so far
                if (matchingEffects.length > bestMatchCount) {
                    bestMatchCount = matchingEffects.length;
                    bestResult = result;
                    bestProductCode = productCode;
                    bestCombination = combo;
                    
                    // If we found all effects, we can stop
                    if (matchingEffects.length === desiredEffects.length) {
                        console.log('\n🎉 FOUND ALL DESIRED EFFECTS! 🎉');
                        break;
                    }
                }
            }
            
            // If we found all effects, we can stop
            if (bestMatchCount === desiredEffects.length) {
                break;
            }
        }
        
        // Print the best result
        console.log('\n===== BEST RESULT =====');
        console.log(`Base product: ${products[bestProductCode!].name}`);
        console.log('Ingredients:', bestCombination!.join(' → '));
        console.log('All effects:', printEffectNames(bestResult!.effects));
        console.log('Matching effects:', printEffectNames(bestResult!.effects.filter(e => desiredEffects.includes(e))));
        console.log('Missing effects:', printEffectNames(desiredEffects.filter(e => !bestResult!.effects.includes(e))));
        console.log('Selling price:', bestResult!.sellingPrice);
        console.log('Ingredient cost:', bestResult!.ingredientCost);
        console.log('Profit:', bestResult!.profit);
        
        // Check if we found all the desired effects
        const foundAll = desiredEffects.every(effect => bestResult!.effects.includes(effect));
        console.log('\nFound all desired effects?', foundAll ? 'YES! 🎉' : 'No');
        
        // Assertions
        expect(bestResult).not.toBeNull();
        expect(bestMatchCount).toBeGreaterThan(0);
    });
});

import { describe, expect, it } from 'vitest';
import { 
    effectCodeToName,
    mixIngredients,
    ingredients,
    IngredientCode
} from '../../src';

// Helper function to print effect names instead of codes
function printEffectNames(effectCodes: string[]): string {
    return effectCodes.map(code => `${code} (${effectCodeToName[code] || 'Unknown'})`).join(', ');
}

describe('Brute Force Approach for Finding Effects', () => {
    // The specific effects we want to find
    const desiredEffects = ['Ex', 'Gi', 'Sp', 'Zo', 'Gl'];
    
    it('should try specific combinations of ingredients known to produce interesting effects', () => {
        console.log('Trying specific combinations of ingredients:');
        
        // Base product to use
        const baseProduct = 'OG Kush';
        
        // Combinations to try
        const combinations = [
            // Combination 1: Focus on Explosive and Glowing
            ['Mega Bean', 'Cuke', 'Donut', 'Donut', 'Battery', 'Chili', 'Addy', 'Viagra'],
            
            // Combination 2: Focus on Gingeritis and Spicy
            ['Banana', 'Chili', 'Cuke', 'Donut', 'Horse Semen', 'Viagra', 'Addy', 'Iodine'],
            
            // Combination 3: Try with Flu Medicine for Zombifying
            ['Flu Medicine', 'Banana', 'Chili', 'Mega Bean', 'Cuke', 'Donut', 'Battery', 'Viagra'],
            
            // Combination 4: Try with Gasoline for Explosive
            ['Gasoline', 'Banana', 'Chili', 'Mega Bean', 'Cuke', 'Donut', 'Battery', 'Viagra'],
            
            // Combination 5: Try with Motor Oil
            ['Motor Oil', 'Banana', 'Chili', 'Mega Bean', 'Cuke', 'Donut', 'Battery', 'Viagra'],
            
            // Combination 6: Try with Mouth Wash
            ['Mouth Wash', 'Banana', 'Chili', 'Mega Bean', 'Cuke', 'Donut', 'Battery', 'Viagra'],
            
            // Combination 7: Try with Paracetamol
            ['Paracetamol', 'Banana', 'Chili', 'Mega Bean', 'Cuke', 'Donut', 'Battery', 'Viagra'],
            
            // Combination 8: Try with Energy Drink
            ['Energy Drink', 'Banana', 'Chili', 'Mega Bean', 'Cuke', 'Donut', 'Battery', 'Viagra'],
        ];
        
        let bestResult = null;
        let bestMatchCount = 0;
        let bestCombination: string[] = [];
        
        // Try each combination
        for (const combo of combinations) {
            const result = mixIngredients(baseProduct, combo);
            
            // Count matching effects
            const matchingEffects = result.effects.filter(e => desiredEffects.includes(e));
            
            console.log(`\nWith ${combo.join(', ')}:`);
            console.log(`Found ${matchingEffects.length} out of ${desiredEffects.length} desired effects`);
            console.log('Matching effects:', printEffectNames(matchingEffects));
            console.log('Missing effects:', printEffectNames(desiredEffects.filter(e => !result.effects.includes(e))));
            
            if (matchingEffects.length > bestMatchCount) {
                bestMatchCount = matchingEffects.length;
                bestResult = result;
                bestCombination = combo;
            }
        }
        
        // Print the best result
        console.log('\n===== BEST SPECIFIC COMBINATION =====');
        console.log('Ingredients:', bestCombination.join(', '));
        console.log('All effects:', printEffectNames(bestResult?.effects || []));
        console.log('Matching effects:', printEffectNames(bestResult?.effects.filter(e => desiredEffects.includes(e)) || []));
        console.log('Missing effects:', printEffectNames(desiredEffects.filter(e => !bestResult?.effects.includes(e))));
        console.log('Selling price:', bestResult?.sellingPrice);
        console.log('Profit:', bestResult?.profit);
        
        // Assertions
        expect(bestResult).not.toBeNull();
        expect(bestMatchCount).toBeGreaterThan(0);
    });
    
    it('should try ingredients that are known to produce each effect', () => {
        console.log('\nTrying ingredients known to produce specific effects:');
        
        // Base product to use
        const baseProduct = 'OG Kush';
        
        // Map of effects to ingredients that might produce them
        const effectToIngredients: Record<string, string[]> = {
            'Ex': ['Gasoline', 'Donut', 'Donut'], // Explosive - try with Gasoline and double Donut
            'Gi': ['Banana'], // Gingeritis - Banana is known to produce this
            'Sp': ['Chili'], // Spicy - Chili is known to produce this
            'Zo': ['Flu Medicine', 'Gasoline'], // Zombifying - try with Flu Medicine and Gasoline
            'Gl': ['Mega Bean', 'Battery'] // Glowing - try with Mega Bean and Battery
        };
        
        // Combine all the ingredients
        const allIngredients = new Set<string>();
        for (const ingredients of Object.values(effectToIngredients)) {
            ingredients.forEach(ing => allIngredients.add(ing));
        }
        
        // Try the combined ingredients
        const ingredientsList = Array.from(allIngredients);
        console.log('Trying with:', ingredientsList.join(', '));
        
        const result = mixIngredients(baseProduct, ingredientsList);
        
        // Count matching effects
        const matchingEffects = result.effects.filter(e => desiredEffects.includes(e));
        
        console.log(`Found ${matchingEffects.length} out of ${desiredEffects.length} desired effects`);
        console.log('Matching effects:', printEffectNames(matchingEffects));
        console.log('Missing effects:', printEffectNames(desiredEffects.filter(e => !result.effects.includes(e))));
        console.log('All effects:', printEffectNames(result.effects));
        
        // Assertions
        expect(result).not.toBeNull();
        expect(matchingEffects.length).toBeGreaterThan(0);
    });
});

import type { EffectCode } from '@/code/types/effects/Effect';
import type { Ingredient } from '@/code/types/products/Ingredient';
import { findEffectByNameOrThrow } from '@/code/utils/effects/effectUtils';
import { reverseMixByEffect } from '@/exports/core/mixing/reverse';
import type { ProductCode } from '@/code/types/products/Product';
// Import mixProduct if we want to verify the result and get full details
// import { mixProduct } from '@/exports/core/mixing/normal';
// import { findIngredientByCode } from '@/code/utils/products/ingredientUtils'; // For getting names from codes

// Define targets as names
const targetEffectNames: string[] = ['Explosive', 'Zombifying', 'Gingeritis', 'Cyclopean'];
const baseProductCodeForTest: ProductCode = 'OK'; // Using OG Kush
const searchMaxDepth = 8;

console.log(
    `Starting rule-based DFS reverse mix search for target effects: ${targetEffectNames.join(', ')} with base product ${baseProductCodeForTest} (max depth: ${searchMaxDepth})...`
);

// Convert names to EffectCodes and create a Set
let targetEffectsSet: Set<EffectCode>;
try {
    targetEffectsSet = new Set(targetEffectNames.map((name) => findEffectByNameOrThrow(name)));
} catch (error) {
    console.error('Error preparing target effects:', error);
    process.exit(1);
}

const startTime = Date.now();
console.log('[DEBUG] About to call reverseMixByEffect...');
console.log('[DEBUG] targetEffectsSet:', targetEffectsSet);
console.log('[DEBUG] baseProductCodeForTest:', baseProductCodeForTest);
console.log('[DEBUG] searchMaxDepth:', searchMaxDepth);

let result: Ingredient[] | null = null;
let errorDuringSearch: Error | null = null;

// Call the updated reverseMixByEffect with the new parameter structure
try {
    result = reverseMixByEffect({
        targetEffects: targetEffectsSet,
        baseProductCode: baseProductCodeForTest,
        maxSearchDepth: searchMaxDepth,
    });
    console.log('[DEBUG] reverseMixByEffect call completed.');
    console.log('[DEBUG] Type of result:', typeof result);
    if (result === null) {
        console.log('[DEBUG] Value of result: null');
    } else {
        // Check if result is an array before trying to map, to prevent errors if it's not
        console.log(
            '[DEBUG] Value of result (codes):',
            Array.isArray(result) ? JSON.stringify(result.map((r) => r.code)) : 'Not an array'
        );
    }
} catch (e: any) {
    console.error('[DEBUG] Error during reverseMixByEffect call:', e.message, e.stack);
    errorDuringSearch = e;
}

const endTime = Date.now();
console.log(`Search completed in ${(endTime - startTime) / 1000} seconds.`);

if (errorDuringSearch) {
    console.log('\n--- Search aborted due to an error ---');
    console.error('Error details:', errorDuringSearch.message);
} else if (result) {
    // result can be [] (empty array, which is truthy) or an array with ingredients
    console.log('\n--- Solution Found (Ingredients) ---');
    if (result.length === 0) {
        console.log('(Base product already met target effects, or target effects list was empty)');
    }
    result.forEach((ingredient) => {
        console.log(`- ${ingredient.name} (Code: ${ingredient.code}, Default Effect: ${ingredient.defaultEffect})`);
    });
    console.log('Sequence Length:', result.length);
} else {
    // result is null
    console.log('\n--- No solution found ---');
}

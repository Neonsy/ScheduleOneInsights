import { reverseMixByEffect } from '@/exports/core/mixing/reverse'; // Assuming main index exports it
import type { EffectCode } from '@/code/types/effects/Effect';
import type { ProductCode } from '@/code/types/products/Product';

const targetEffects: EffectCode[] = ['EPS', 'ZBFI', 'GGIT', 'CCPA'];
const productCode: ProductCode = 'OK';

console.log(`Starting reverse mix search for ${productCode} with effects: ${targetEffects.join(', ')}...`);
const startTime = Date.now();

const reverseCalculation = reverseMixByEffect(productCode, targetEffects);

const endTime = Date.now();
console.log(`Search completed in ${(endTime - startTime) / 1000} seconds.`);

// Use match for cleaner handling of Result
reverseCalculation.match(
    (success) => {
        console.log('\n--- Success ---');
        console.log('Effects:', success.result.effects);
        console.log('Ingredient Names:', success.result.ingredientNames);
        // console.log("Full Result Object:", success.result);
        console.log('Stats:', success.stats);
        console.log('Cheapest Cost:', success.result.totalCost);
        console.log('Sequence Length:', success.result.ingredientNames.length);
    },
    (error) => {
        console.error('\n--- Error ---');
        console.error('Reverse calculation failed:', error);
    }
);

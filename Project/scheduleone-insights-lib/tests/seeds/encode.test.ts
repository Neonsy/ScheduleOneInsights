import { describe, it, expect } from 'vitest';
import { mixIngredients } from '../../src/core/mixer';

describe('Seed Encoding Tests', () => {
    it('should generate different seeds for different ingredient orders', () => {
        // Mix OG Kush with ingredients in first order
        const mix1 = mixIngredients('OG Kush', ['Banana', 'Cuke', 'Cuke', 'Donut', 'Battery']);

        // Mix OG Kush with ingredients in second order
        const mix2 = mixIngredients('OG Kush', ['Banana', 'Cuke', 'Cuke', 'Battery', 'Donut']);

        // Store the seeds for use in the decode test
        const seed1 = mix1.seed;
        const seed2 = mix2.seed;

        // Log the seeds for debugging
        console.log('Seed 1:', seed1);
        console.log('Seed 2:', seed2);

        // Verify that the seeds are different
        expect(seed1).not.toBe(seed2);

        // Verify that the effects are different (since the ingredient order affects the outcome)
        expect(mix1.effects).not.toEqual(mix2.effects);

        // Export the seeds for use in the decode test
        // This is just for documentation, the actual values will be hardcoded in the decode test
        console.log('Export for decode test:');
        console.log(`const seed1 = '${seed1}';`);
        console.log(`const seed2 = '${seed2}';`);
        console.log(`const ingredients1 = ['Bnn', 'Ck', 'Ck', 'Dnt', 'Btry'];`);
        console.log(`const ingredients2 = ['Bnn', 'Ck', 'Ck', 'Btry', 'Dnt'];`);
    });
});

import { describe, it, expect } from 'vitest';
import { mixFromSeed } from '../../src/core/mixer';
import { parseSeed } from '../../src/core/seedManager';

describe('Seed Decoding Tests', () => {
    it('should correctly decode seeds back to their original ingredients', () => {
        // Seeds from the encode test
        const seed1 = 'OK|Cm,TP,Enrg,CD,BE|Bnn,Ck,Ck,Dnt,Btry';
        const seed2 = 'OK|Cm,TP,Enrg,BE,CD|Bnn,Ck,Ck,Btry,Dnt';

        // Expected ingredients for each seed
        const ingredients1 = ['Bnn', 'Ck', 'Ck', 'Dnt', 'Btry'];
        const ingredients2 = ['Bnn', 'Ck', 'Ck', 'Btry', 'Dnt'];

        // Parse the seeds
        const mixState1 = parseSeed(seed1);
        const mixState2 = parseSeed(seed2);

        // Verify that the mix states are not null
        expect(mixState1).not.toBeNull();
        expect(mixState2).not.toBeNull();

        // Verify that the product is OG Kush
        expect(mixState1?.product).toBe('OK');
        expect(mixState2?.product).toBe('OK');

        // Verify that the ingredients match the expected ingredients
        expect(mixState1?.ingredients).toEqual(ingredients1);
        expect(mixState2?.ingredients).toEqual(ingredients2);

        // Recreate the mixes from the seeds
        const mix1 = mixFromSeed(seed1);
        const mix2 = mixFromSeed(seed2);

        // Verify that the effects match the expected effects
        expect(mix1.effects).toEqual(['Cm', 'TP', 'Eegz', 'CD', 'BE']);
        expect(mix2.effects).toEqual(['Cm', 'TP', 'Eegz', 'BE', 'CD']);

        // Verify that the seeds match the original seeds
        expect(mix1.seed).toBe(seed1);
        expect(mix2.seed).toBe(seed2);
    });
});

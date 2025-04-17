import { describe, it, expect, vi } from 'vitest';
import { findMixForEffects } from '../../../../src/core/reverseMixer';
import { EffectCode } from '../../../../src/types';

describe('OG Kush Reverse Mixer - Desired Effects Test', () => {
    // Set timeout to exactly 18 seconds
    vi.setConfig({ testTimeout: 18000 });
    it('should find the cheapest mix for OG Kush that includes the specified effects', () => {
        // Define the desired effects
        const desiredEffects: EffectCode[] = [
            'BE', // Bright-Eyed
            'LF', // Long Faced
            'SI', // Seizure-Inducing
            'Di', // Disorienting
            'Sh', // Shrinking
        ];

        // Set options to optimize for cost and allow repeated ingredients
        const options = {
            optimizeFor: 'cost' as const,
            mustUseAllIngredients: false,
            allowRepeatedIngredients: true,
            timeoutMs: 18000, // 18 seconds timeout
        };

        // Find the cheapest mix
        const result = findMixForEffects('OK', desiredEffects, options);

        // Verify that a result was found
        expect(result).not.toBeNull();

        // Verify that the search completed
        expect(result?.complete).toBe(true);

        // Verify that all desired effects are present in the result
        const foundEffects = result?.result.effects || [];
        const matchingEffects = desiredEffects.filter((effect) => foundEffects.includes(effect));

        // Verify that all desired effects are found
        expect(matchingEffects.length).toBe(desiredEffects.length);

        // Verify that the result has a reasonable cost
        // Note: We don't know the exact cost in advance, but we can verify it's not unreasonably high
        expect(result?.result.ingredientCost).toBeLessThan(100);
    });
});

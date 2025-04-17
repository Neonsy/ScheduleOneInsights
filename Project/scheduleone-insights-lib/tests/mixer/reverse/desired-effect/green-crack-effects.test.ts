import { describe, it, expect, vi } from 'vitest';
import { findMixForEffects } from '../../../../src/core/reverseMixer';
import { EffectCode } from '../../../../src/types';

describe('Green Crack Reverse Mixer - Desired Effects Test', () => {
    // Set timeout to exactly 18 seconds
    vi.setConfig({ testTimeout: 18000 });
    it('should find the cheapest mix for Green Crack that includes the specified effects', () => {
        // Define the desired effects
        const desiredEffects: EffectCode[] = [
            'AG', // Anti-Gravity
            'Gl', // Glowing
            'TP', // Thought-Provoking
            'Zo', // Zombifying
            'El', // Electrifying
            'Sp', // Spicy
        ];

        // Set options to optimize for cost and allow repeated ingredients
        const options = {
            optimizeFor: 'cost' as const,
            mustUseAllIngredients: false,
            allowRepeatedIngredients: true,
            timeoutMs: 18000, // 18 seconds timeout
        };

        // Find the cheapest mix
        const result = findMixForEffects('GC', desiredEffects, options);

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

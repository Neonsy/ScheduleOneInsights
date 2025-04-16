import { describe, expect, it } from 'vitest';
import { findMixForEffects, findMixFromIngredients, FindMixOptions } from '../../src';

describe('Reverse Calculation', () => {
    // Common options for tests
    const defaultOptions: FindMixOptions = {
        optimizeFor: 'profit',
        mustUseAllIngredients: false,
        allowRepeatedIngredients: false,
        timeoutMs: 5000,
    };

    describe('findMixForEffects', () => {
        it('should find a mix that produces a single effect', () => {
            const result = findMixForEffects('OK', ['Ca'], defaultOptions);

            expect(result).not.toBeNull();
            expect(result?.result.effects).toContain('Ca');
        });

        it('should find a mix that produces multiple effects', () => {
            const result = findMixForEffects('OK', ['Ca', 'En'], {
                ...defaultOptions,
                timeoutMs: 10000, // Give it more time for multiple effects
            });

            expect(result).not.toBeNull();
            expect(result?.result.effects).toContain('Ca');
            expect(result?.result.effects).toContain('En');
        });

        it('should optimize for profit when specified', () => {
            const profitResult = findMixForEffects('OK', ['Ca'], {
                ...defaultOptions,
                optimizeFor: 'profit',
            });

            expect(profitResult).not.toBeNull();

            // The profit-optimized result should have higher profit
            expect(profitResult?.result.profit).toBeGreaterThan(0);
        });

        it('should optimize for cost when specified', () => {
            const costResult = findMixForEffects('OK', ['Ca'], {
                ...defaultOptions,
                optimizeFor: 'cost',
            });

            expect(costResult).not.toBeNull();

            // The cost-optimized result should have lower ingredient cost
            expect(costResult?.result.ingredientCost).toBeLessThan(20);
        });

        it('should find the cheapest mix that includes ALL desired effects', () => {
            // Test with a subset of effects that we know can be achieved together
            const result = findMixForEffects('GC', ['Ex', 'Gi', 'Sp'], {
                ...defaultOptions,
                optimizeFor: 'cost',
                timeoutMs: 15000, // Give it more time for multiple effects
                allowRepeatedIngredients: true, // Allow repeated ingredients to find more combinations
            });

            expect(result).not.toBeNull();
            // Verify ALL desired effects are present
            expect(result?.result.effects).toContain('Ex');
            expect(result?.result.effects).toContain('Gi');
            expect(result?.result.effects).toContain('Sp');

            // Log the result for debugging
            console.log('Found mix with desired effects:', {
                ingredients: result?.ingredientsUsed,
                effects: result?.result.effects,
                cost: result?.result.ingredientCost,
                profit: result?.result.profit,
            });
        });
    });

    describe('findMixFromIngredients', () => {
        it('should find the best mix using specified ingredients', () => {
            const result = findMixFromIngredients('OK', ['Cu', 'Ba'], defaultOptions);

            expect(result).not.toBeNull();
            expect(result?.ingredientsUsed).toContain('Cuke');
            expect(result?.ingredientsUsed).toContain('Banana');
        });

        it('should respect the mustUseAllIngredients option', () => {
            const result = findMixFromIngredients('OK', ['Cu', 'Ba', 'Bt'], {
                ...defaultOptions,
                mustUseAllIngredients: true,
            });

            expect(result).not.toBeNull();
            expect(result?.ingredientsUsed).toContain('Cuke');
            expect(result?.ingredientsUsed).toContain('Banana');
            expect(result?.ingredientsUsed).toContain('Battery');
        });

        it('should respect the allowRepeatedIngredients option', () => {
            const result = findMixFromIngredients('OK', ['Cu'], {
                ...defaultOptions,
                allowRepeatedIngredients: true,
                timeoutMs: 10000, // Give it more time to try repeated ingredients
            });

            expect(result).not.toBeNull();

            // If repeated ingredients are allowed, it might use the same ingredient multiple times
            // This is hard to test deterministically, but we can check that it found something
            expect(result?.ingredientsUsed.length).toBeGreaterThan(0);
        });
    });
});

import { describe, expect, it } from 'vitest';

import { mixIngredients } from '../../src';

describe('Granddaddy Purple Mixing', () => {
    it('should correctly mix Granddaddy Purple with multiple ingredients', () => {
        const result = mixIngredients('Granddaddy Purple', ['Banana', 'Battery', 'Mouth Wash', 'Viagra', 'Horse Semen', 'Banana']);

        // Granddaddy Purple starts with Se (Sedating)
        // First Banana may transform Se and adds Gi (Gingeritis)
        // Battery adds BE (BrightEyed) and may transform other effects
        // Mouth Wash adds Ba (Balding) and may transform other effects
        // Viagra adds TT (TropicThunder) and may transform other effects
        // Horse Semen adds LF (LongFaced) and may transform other effects
        // Second Banana may transform effects and tries to add Gi (Gingeritis) again

        console.log('Granddaddy Purple mix result:', {
            effects: result.effects,
            sellingPrice: result.sellingPrice,
            profit: result.profit,
            profitMargin: result.profitMargin,
        });

        // Check that we have effects
        expect(result.effects.length).toBeGreaterThan(0);

        // Check costs
        const expectedIngredientCost = 2 + 8 + 4 + 4 + 9 + 2; // 29
        expect(result.ingredientCost).toBe(expectedIngredientCost);
        expect(result.productCost).toBe(35);

        // Check that selling price is calculated based on effects
        // This test would be more precise if we imported the effects data
        // and calculated the exact multiplier, but this is a good sanity check
        expect(result.sellingPrice).toBeGreaterThan(result.productCost);

        // Check profit calculation (profit = selling price - ingredient cost)
        expect(result.profit).toBe(result.sellingPrice - expectedIngredientCost);

        // Check profit margin calculation
        const expectedProfitMargin = Math.round((result.profit / result.sellingPrice) * 100) / 100;
        expect(result.profitMargin).toBe(expectedProfitMargin);
    });
});

import { describe, expect, it } from 'vitest';

import { mixIngredients } from '../../src';

describe('Complex Mixing', () => {
    it('should respect maximum effects limit', () => {
        const result = mixIngredients('OG Kush', [
            'Cuke',
            'Flu Medicine',
            'Gasoline',
            'Donut',
            'Energy Drink',
            'Mouth Wash',
            'Motor Oil',
            'Banana',
            'Chili',
        ]);

        expect(result.effects.length).toBeLessThanOrEqual(8);
    });

    it('should correctly mix Green Crack with Banana, Battery, and Mouth Wash', () => {
        const result = mixIngredients('Green Crack', ['Banana', 'Battery', 'Mouth Wash']);

        // Green Crack starts with En (Energizing)
        // Banana transforms En to TP (ThoughtProvoking) and adds Gi (Gingeritis)
        // Battery adds BE (BrightEyed) and may transform other effects
        // Mouth Wash adds Ba (Balding) and may transform other effects

        // Check specific effects we expect to see
        expect(result.effects).toContain('TP'); // ThoughtProvoking
        expect(result.effects).toContain('Gi'); // Gingeritis
        expect(result.effects).toContain('BE'); // BrightEyed
        expect(result.effects).toContain('Ba'); // Balding

        // The original Energizing effect should be transformed
        expect(result.effects).not.toContain('En'); // Energizing

        // Check costs
        expect(result.ingredientCost).toBe(14); // 2 + 8 + 4 = 14
        expect(result.productCost).toBe(35);

        // Check pricing
        expect(result.sellingPrice).toBe(82);
        // Profit is selling price minus ingredient cost (not product cost)
        expect(result.profit).toBe(68); // 82 - 14 = 68
        expect(result.profitMargin).toBe(0.83); // 68 / 82 = 0.83
    });
});

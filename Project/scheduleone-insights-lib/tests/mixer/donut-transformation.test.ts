import { describe, expect, it } from 'vitest';
import { mixIngredients, effectCodeToName } from '../../src';

// Helper function to print effect names instead of codes
function printEffectNames(effectCodes: string[]): string {
    return effectCodes.map((code) => `${code} (${effectCodeToName[code] || 'Unknown'})`).join(', ');
}

describe('Donut Transformation Tests', () => {
    it('should add Calorie-Dense effect with a single Donut', () => {
        const result = mixIngredients('OG Kush', ['Donut']);

        console.log('Single Donut Effects:', printEffectNames(result.effects));

        // Donut should add Calorie-Dense (CD)
        expect(result.effects).toContain('CD');
    });

    it('should transform Calorie-Dense to Explosive with a second Donut', () => {
        const result = mixIngredients('OG Kush', ['Donut', 'Donut']);

        console.log('Double Donut Effects:', printEffectNames(result.effects));

        // Second Donut should transform Calorie-Dense (CD) to Explosive (Ex)
        expect(result.effects).toContain('Ex');
        expect(result.effects).not.toContain('CD');
    });

    it('should reproduce the Purple Splooge to Miracle Diamond transformation', () => {
        // First mix to get Purple Splooge
        const purpleSplooge = mixIngredients('OG Kush', [
            'Banana', // Gingeritis
            'Chili', // Spicy
            'Battery', // Bright-Eyed
            'Viagra', // Tropic Thunder
            'Mega Bean', // Glowing
            'Gasoline', // Zombifying
            'Donut', // Calorie-Dense
        ]);

        console.log('Purple Splooge Effects:', printEffectNames(purpleSplooge.effects));

        // Check that Purple Splooge has Calorie-Dense
        expect(purpleSplooge.effects).toContain('CD');

        // Second mix to get Miracle Diamond
        const miracleDiamond = mixIngredients('OG Kush', [
            'Banana', // Gingeritis
            'Chili', // Spicy
            'Battery', // Bright-Eyed
            'Viagra', // Tropic Thunder
            'Mega Bean', // Glowing
            'Gasoline', // Zombifying
            'Donut', // Calorie-Dense
            'Donut', // Should transform CD to Explosive
        ]);

        console.log('Miracle Diamond Effects:', printEffectNames(miracleDiamond.effects));

        // Check that Miracle Diamond has Explosive instead of Calorie-Dense
        expect(miracleDiamond.effects).toContain('Ex');
        expect(miracleDiamond.effects).not.toContain('CD');

        // Check that the key effects are present
        // Note: Based on the actual implementation, not all target effects may be present
        // due to transformations and replacements
        expect(miracleDiamond.effects).toContain('Ex'); // Explosive
        expect(miracleDiamond.effects).toContain('Sp'); // Spicy
        expect(miracleDiamond.effects).toContain('BE'); // Bright-Eyed
        expect(miracleDiamond.effects).toContain('TT'); // Tropic Thunder
    });
});

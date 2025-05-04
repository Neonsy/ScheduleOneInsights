// tests/mixing/normal/ogkush/4.test.ts
import { describe, it, expect } from 'vitest';
import { mixProduct } from '@/code/core/mixing/normal/algorithm';

describe('OG Kush mixing (scenario #4): mix Banana → Cuke → Banana → Mega Bean → Donut → Donut', () => {
    it('should include all required effects regardless of order', () => {
        const result = mixProduct('OK', ['BNN', 'C', 'BNN', 'MB', 'DN', 'DN']);

        const expectedEffects = [
            'Paranoia',
            'Gingeritis',
            'Energizing',
            'Calorie-Dense',
            'Explosive',
            'Foggy',
            'Cyclopean',
        ];

        expect(result.effects).toEqual(expect.arrayContaining(expectedEffects));
        expect(result.effects).toHaveLength(expectedEffects.length);

        expect(result.totalAddiction).toEqual(0.69);
        expect(result.totalCost).toEqual(19);
        expect(result.sellPrice).toEqual(92);
        expect(result.profit).toEqual(73);
    });
});

import { describe, expect, it } from 'vitest';

import { reverseMix } from '@/code/core/mixing/reverse/byEffect';
import { findEffectByCode } from '@/code/utils/effects/effectUtils';
import type { EffectCode } from '@/code/types/effects/Effect';

describe('reverseMix basic', () => {
    it('finds ingredient sequence for Bright-Eyed + Focused + Refreshing on OG Kush', () => {
        const codes: EffectCode[] = ['BE', 'FCE', 'RFI'];
        const plan = reverseMix('OK', codes);
        expect(plan).not.toBeNull();
        // Convert desired codes to effect names for comparison
        const desiredNames = codes.map((code) =>
            findEffectByCode(code).match(
                (eff) => eff.name,
                () => ''
            )
        );
        desiredNames.forEach((name) => expect(plan!.mixResult.effects).toEqual(expect.arrayContaining([name])));
        // Ingredient codes should be 1-8 long
        expect(plan!.ingredientCodes.length).toBeGreaterThan(0);
        expect(plan!.ingredientCodes.length).toBeLessThanOrEqual(8);
    });
});

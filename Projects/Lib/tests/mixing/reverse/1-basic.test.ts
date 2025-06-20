import { describe, expect, it } from 'vitest';

import { reverseMix } from '@/exports/core/mixing/reverse';
import { findEffectByCode } from '@/exports/utils/effects';
import type { EffectCode } from '@/exports/types/effects';

describe('reverseMix basic', () => {
    it('finds ingredient sequence for Bright-Eyed + Focused + Refreshing on OG Kush', () => {
        const codes: EffectCode[] = ['BE', 'FCE', 'RFI'];
        const planResult = reverseMix('OK', codes);
        planResult.match(
            (plan) => {
                // Convert desired codes to effect names for comparison
                const desiredNames = codes.map((code) =>
                    findEffectByCode(code).match(
                        (eff) => eff.name,
                        () => ''
                    )
                );
                desiredNames.forEach((name) => expect(plan.mixResult.effects).toEqual(expect.arrayContaining([name])));
                // Ingredient sequence should be within search depth (default 32)
                expect(plan.ingredientCodes.length).toBeGreaterThan(0);
                expect(plan.ingredientCodes.length).toBeLessThanOrEqual(32);
            },
            (err) => {
                throw new Error(`reverseMix failed: ${err.message}`);
            }
        );
    });
});

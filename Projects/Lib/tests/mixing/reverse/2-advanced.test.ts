import { describe, it, expect } from 'vitest';

import { reverseMix } from '@/exports/core/mixing/reverse';
import { findEffectByCode } from '@/exports/utils/effects';
import type { EffectCode } from '@/exports/types/effects';

// Desired effect codes derived from effects data
const desired: ReadonlyArray<EffectCode> = ['AG', 'GI', 'LF', 'ZBFI', 'EPS'];

describe('reverseMix OG Kush – advanced set', () => {
    it('finds ingredient sequence for Anti-Gravity + Glowing + Long Faced + Zombifying + Explosive', () => {
        const planResult = reverseMix('OK', desired, { maxDepth: 32 });

        planResult.match(
            (plan) => {
                // Verify each desired effect name is present in the resulting mix
                const desiredNames = desired.map((code) =>
                    findEffectByCode(code).match(
                        (eff) => eff.name,
                        () => ''
                    )
                );
                desiredNames.forEach((name) => expect(plan.mixResult.effects).toEqual(expect.arrayContaining([name])));

                // Ingredient sequence length should respect depth limit (<=32)
                expect(plan.ingredientCodes.length).toBeGreaterThan(0);
                expect(plan.ingredientCodes.length).toBeLessThanOrEqual(32);
            },
            (err) => {
                throw new Error(`reverseMix failed: ${err.message}`);
            }
        );
    });
});

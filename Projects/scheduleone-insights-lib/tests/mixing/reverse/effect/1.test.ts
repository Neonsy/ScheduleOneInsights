/* eslint-env node, vitest */
/* global console */
import { test } from 'vitest';
import type { ReverseMixByEffectsPayload } from '@/exports/types/mix/reverse/byEffects';
import { getMixtureByEffects } from '@/exports/core/mixing/reverse/byEffects';

// Prints the mix result for OG Kush with Anti-Gravity, Cyclopean, Shrinking, Explosive
test('getMixtureByEffects for OG Kush [AG, CCPA, SI, EPS]', () => {
    const payload: ReverseMixByEffectsPayload = {
        productCode: 'OK',
        effectCodes: ['AG', 'CCPA', 'SI', 'EPS'],
    };
    const result = getMixtureByEffects(payload);
    console.log(JSON.stringify(result, null, 2));
});

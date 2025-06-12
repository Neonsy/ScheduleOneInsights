/**
 * Outcome returned by {@link safeReverseMix} on success.
 */
import type { MixResult } from '@/code/types/mixing/MixResult';

export interface ReverseMixOutcome {
    readonly ingredientCodes: string[];
    readonly mixResult: MixResult;
}

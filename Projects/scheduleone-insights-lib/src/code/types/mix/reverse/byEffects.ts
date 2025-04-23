/**
 * Payload for reverse mixing by effects.
 * Defines the inputs for getting a mixture that achieves desired effects.
 */
import { Product } from '@/code/types/products/Product';
import { Effect } from '@/code/types/effects/Effect';
import { Ingredient } from '@/code/types/products/Ingredient';
import type { MixResult } from '@/code/types/mix/MixResult';

export interface ReverseMixByEffectsPayload {
    /** Code of the base product */
    readonly productCode: Product['code'];
    /** Desired effect codes (min 1, max 8) */
    readonly effectCodes: Effect['code'][];
}

export interface ReverseMixByEffectsResult {
    /** Ingredient codes that achieve the desired effects */
    readonly ingredientCodes: Ingredient['code'][];
    /** Detailed mix result (cost, profit, effects, etc.) */
    readonly result: MixResult;
}

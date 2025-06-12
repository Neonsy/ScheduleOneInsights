// All reverse mixing logic removed.
// This file intentionally left blank pending future implementation.

import type { Ingredient } from '@/code/types/products/Ingredient';
import { ingredients as allIngredientsData } from '@/code/data/products/ingredients';
import { transformationRules } from '@/code/data/mix/transformationRules';
import type { EffectCode } from '@/code/types/effects/Effect';
import type { TransformationRule } from '@/code/types/mixing/TransformationRule';
import type { ProductCode } from '@/code/types/products/Product';
import { isMarijuanaProduct } from '@/code/types/products/Product';
import { findProductByCode } from '@/code/utils/products/productUtils';
import { simulateEffectSet } from '@/code/utils/mixing/mixSimulator';
import { mixProductCore } from '@/code/core/mixing/normal/algorithm';
import { Result, ok, err } from 'neverthrow';
import type { ReverseMixError } from '@/code/types/errors/ReverseMixError';
import { REVERSE_MIX_ERROR } from '@/code/types/errors/ReverseMixError';

// NEW: externalised types & helpers
import type { ReverseSearchParams } from '@/code/types/mixing/ReverseSearchParams';
import type { SearchNode } from '@/code/lib/mixing/reverse/searchInternals';
import { MinHeap } from '@/code/lib/mixing/reverse/searchInternals';
import { reverseMixIddfs } from '@/code/core/mixing/reverse/iddfs';

import type { ReverseMixOutcome } from '@/code/types/mixing/ReverseMixOutcome';
import type { MixResult } from '@/code/types/mixing/MixResult';

// --- Constants ------------------------------------------------------------

const allIngredients: ReadonlyArray<Ingredient> = allIngredientsData;

// --- Heuristic ------------------------------------------------------------
/** Pre-compute, for each ingredient code, the full set of effects it can provide
 * (its default effect plus every rule output it can trigger alone). */
const ingredientCoverage = new Map<string, Set<EffectCode>>();
let globalMaxCoverage = 1;
for (const ing of allIngredients) {
    const set = new Set<EffectCode>();
    set.add(ing.defaultEffect);
    const rules = transformationRules[ing.code] as ReadonlyArray<TransformationRule> | undefined;
    if (rules) {
        for (const rule of rules) {
            for (const out of Object.values(rule.replace)) {
                if (out !== undefined) set.add(out);
            }
        }
    }
    ingredientCoverage.set(ing.code, set);
    if (set.size > globalMaxCoverage) globalMaxCoverage = set.size;
}

/**
 * Estimates the minimum number of additional ingredients needed to cover all missing effects.
 *
 * Calculates an admissible lower bound by assuming each future ingredient can provide the maximum number of missing effects that any single ingredient can cover.
 *
 * @param missingCnt - The number of effects still missing from the current state.
 * @returns The estimated minimum number of additional ingredients required.
 */
function heuristic(missingCnt: number): number {
    return Math.ceil(missingCnt / globalMaxCoverage);
}

// --- Main search ----------------------------------------------------------
/**
 * Searches for a sequence of ingredients that, when combined, produce all specified target effects, optionally starting from a given base product.
 *
 * Returns the ordered list of ingredients to use, or `null` if no solution is found within the allowed maximum ingredient count.
 *
 * @param params - Search parameters including the set of target effects, optional base product code, maximum ingredient count, and debug flag.
 * @returns An array of ingredients in the order they should be added to achieve the target effects, or `null` if no valid combination is found within the maximum depth.
 *
 * @remark The order of ingredients affects the resulting effects due to transformation rules. The search uses ingredient count as the cost metric and may return any minimal-length solution.
 */
export function reverseMixByEffect(params: ReverseSearchParams): Ingredient[] | null {
    // Delegate to IDDFS implementation that is complete and depth-optimal.
    return reverseMixIddfs(params);
}

/**
 * Convenience wrapper: returns both the ingredient list and the full MixResult (effects, price, profit, etc.).
 * Equivalent to running `reverseMixByEffect` and then feeding the result into `mixProduct`.
 */
export function planReverseMix(
    params: ReverseSearchParams
): { ingredientCodes: string[]; mixResult: MixResult } | null {
    const ingredients = reverseMixByEffect(params);
    if (ingredients === null) return null;

    const productCode: ProductCode = params.baseProductCode ?? ('M' as ProductCode); // Meth = no default effect
    const ingredientCodes = ingredients.map((i) => i.code);
    const mixResult = mixProductCore(productCode, ingredientCodes);

    return { ingredientCodes, mixResult };
}

/**
 * Simplest ergonomic entry-point: mirror the normal `mixProduct` signature but in reverse.
 *
 * @param baseProductCode  Same as normal mixer – undefined means "no base product".
 * @param desiredEffects   Ordered (or unordered) list of EffectCode literals you want to see in the final mix.
 * @param opts             Optional search controls (maxDepth & debug).
 * @returns `{ ingredients, mixResult }` or `null` if impossible within the given depth.
 */
export function reverseMixCore(
    baseProductCode: ProductCode | undefined,
    desiredEffects: ReadonlyArray<EffectCode>,
    opts?: { maxDepth?: number; debug?: boolean }
): { ingredientCodes: string[]; mixResult: MixResult } | null {
    const set = new Set<EffectCode>(desiredEffects);
    return planReverseMix({
        targetEffects: set,
        baseProductCode,
        maxDepth: opts?.maxDepth,
        debug: opts?.debug,
    });
}

// ---------------------------------------------------------------------------
/**
 * neverthrow-safe wrapper around {@link reverseMixCore}.
 */
export function reverseMix(
    baseProductCode: ProductCode | undefined,
    desiredEffects: ReadonlyArray<EffectCode>,
    opts?: { maxDepth?: number; debug?: boolean }
): Result<ReverseMixOutcome, ReverseMixError> {
    try {
        const res = reverseMixCore(baseProductCode, desiredEffects, opts);
        if (res === null) {
            return err({
                type: REVERSE_MIX_ERROR,
                message: 'No plan found for desired effects',
                context: { desiredEffects },
            });
        }
        return ok(res);
    } catch (e) {
        const error = e as Error;
        return err({ type: REVERSE_MIX_ERROR, message: error.message, context: {} });
    }
}

import { mixProductCore } from '@/code/core/mixing/normal/algorithm';
import { findEffectByName } from '@/code/utils/effects/effectUtils';
import type { EffectCode } from '@/code/types/effects/Effect';
import type { ProductCode } from '@/code/types/products/Product';
import type { IngredientCode } from '@/code/types/products/Ingredient';

const effectSetCache = new Map<string, Set<EffectCode>>();

/**
 * Simulate the Schedule One mixing process and return the final set of effect codes (after 8-effect cap).
 * The logic is delegated to the already-battle-tested `mixProduct` function so that forward and reverse
 * calculations stay perfectly in sync.
 *
 * @param baseProductCode – Optional product code. If omitted, a non-marijuana placeholder product ("M" = Meth)
 *                          is used so that no default effect is injected.
 * @param ingredientCodes – Ordered list of ingredient codes to apply.
 * @returns A Set of `EffectCode` representing the effects that survive the cap.
 */
export function simulateEffectSet(
    baseProductCode: ProductCode | undefined,
    ingredientCodes: ReadonlyArray<IngredientCode>
): Set<EffectCode> {
    const productCode: ProductCode = baseProductCode ?? ('M' as ProductCode); // Meth has no default effect.

    // ---- Memoization ---------------------------------------------------
    // Use a stable string key (product|ing1,ing2,...) for quick lookup.
    // This significantly reduces forward-mix computations during reverse search.
    const cacheKey = `${productCode}|${ingredientCodes.join(',')}`;
    const cached = effectSetCache.get(cacheKey);
    if (cached) return cached;

    // --------------------------------------------------------------------
    const mixResult = mixProductCore(productCode, ingredientCodes as IngredientCode[]);

    // `mixProduct` returns effect *names*; convert them back to codes for internal use.
    const codes: EffectCode[] = mixResult.effects.map((name) =>
        findEffectByName(name).match(
            (code) => code,
            (err) => {
                throw new Error(`simulateEffectSet: could not resolve effect name "${name}": ${err.message}`);
            }
        )
    );

    const set = new Set(codes);
    effectSetCache.set(cacheKey, set);
    return set;
}

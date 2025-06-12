/**
 * Search parameters for the reverse-mixing algorithm family.
 *
 * Located in the public `types` tree so consumers can create type-safe
 * parameter objects when calling the exported helpers.
 */
export interface ReverseSearchParams {
    /**
     * Exact set of effect codes the final product must contain.
     * Use a `Set` so look-ups are O(1) and duplicates are impossible.
     */
    readonly targetEffects: ReadonlySet<import('@/code/types/effects/Effect').EffectCode>;

    /**
     * Optional base product code to start mixing from. `undefined` means
     * we are starting with the default (meth) product that has no initial
     * effect.
     */
    readonly baseProductCode?: import('@/code/types/products/Product').ProductCode;

    /** Maximum number of ingredients allowed in the final mix (default 8). */
    readonly maxDepth?: number;

    /** Enable verbose debug logging. */
    readonly debug?: boolean;
}

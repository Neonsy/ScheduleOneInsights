import type { EffectCode } from '@/code/types/effects/Effect';
import type { MixResult } from '@/code/types/mixing/MixResult'; // Corrected to alias path
import type { ProductCode } from '@/code/types/products/Product';

/**
 * Represents the single cheapest solution found by reverseByEffect.
 */
export interface CheapestReverseMixResult extends MixResult {
    /** The product code used for the mix */
    readonly productCode: ProductCode;
    /** The ordered ingredient names for the cheapest solution */
    readonly ingredientNames: readonly string[];
    // Inherits effects, totalAddiction, totalCost, sellPrice, profit from MixResult
}

/**
 * Represents the statistics of the reverse search operation.
 */
export interface ReverseSearchStats {
    readonly maxDepthSearched: number;
    readonly pathsExplored: number;
    readonly solutionsFound: number; // Total valid solutions found before picking cheapest
}

/**
 * The overall result structure for reverseByEffect, which might contain
 * the cheapest solution or indicate that none was found.
 */
export type ReverseByEffectOutcome =
    | {
          readonly found: true;
          readonly result: CheapestReverseMixResult;
          readonly stats: ReverseSearchStats;
      }
    | {
          readonly found: false;
          readonly productCode: ProductCode;
          readonly desiredEffectCodes: EffectCode[];
          readonly stats: ReverseSearchStats;
      };

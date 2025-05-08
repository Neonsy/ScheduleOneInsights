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
 * Represents a successful result from the reverseMixByEffect function.
 * Contains the cheapest mix result and search statistics.
 */
export interface ReverseMixSuccess {
    readonly result: CheapestReverseMixResult;
    readonly stats: ReverseSearchStats;
}

/**
 * Represents the statistics of the reverse search operation.
 */
export interface ReverseSearchStats {
    readonly pathsExplored: number; // Nodes visited / states explored
    readonly solutionsFound: number; // Should be 1 if successful with Dijkstra
}

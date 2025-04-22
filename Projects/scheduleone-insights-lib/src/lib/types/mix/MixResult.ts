/**
 * Mix result interface
 * Defines the structure of the result returned by the mixing functions
 */

/**
 * Interface for the result of mixing a product with ingredients
 */
export interface MixResult {
    /** Names of the effects applied to the product */
    effects: string[];
    /** Total addiction value of the mix */
    totalAddiction: number;
    /** Total cost of the ingredients */
    totalCost: number;
    /** Selling price of the mixed product */
    sellPrice: number;
    /** Profit from selling the mixed product */
    profit: number;
}

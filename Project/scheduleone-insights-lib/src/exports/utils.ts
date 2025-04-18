// Utility exports
export {
    calculateIngredientCost,
    calculateSellingPrice,
    calculateProfit,
    calculateProfitMargin,
    calculateAddiction,
    calculateEffectValue,
} from '../utils/calculator';

// Effect utilities
export { getEffectCode, getEffectName } from '../utils/effects';

// Ingredient utilities
export { getIngredientCode, getIngredientName } from '../utils/ingredients';

// Product utilities
export { getProductCode, getProductName } from '../utils/products';

// Effect code normalization
export { normalizeEffectCode } from '../utils/effectCodes';

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @returns The formatted currency string
 */
export function formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
}

/**
 * Format a number as a percentage
 * @param value - The value to format (0-1)
 * @returns The formatted percentage string
 */
export function formatPercentage(value: number): string {
    return `${(value * 100).toFixed(0)}%`;
}

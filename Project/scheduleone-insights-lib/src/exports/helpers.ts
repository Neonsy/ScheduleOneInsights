// Helper function exports
import { Customer, DealerCode, EffectCode } from '../types';
import { dealers } from '../data/dealers';
import { customers } from '../data/customers';

/**
 * Calculate a dealer's profit from a sale
 * @param sellingPrice - The selling price of the product
 * @param dealerCode - The dealer's code
 * @returns The dealer's profit
 */
export function calculateDealerProfit(sellingPrice: number, dealerCode: DealerCode): number {
    const dealer = dealers[dealerCode];
    if (!dealer) return 0;

    return sellingPrice * dealer.cut;
}

/**
 * Find customers who might be interested in a mix based on its effects
 * @param effectCodes - The effects in the mix
 * @returns Array of customers who prefer at least one of the effects
 */
export function findInterestedCustomers(effectCodes: EffectCode[]): Customer[] {
    return Object.values(customers).filter((customer) => {
        // Check if any of the customer's preferred effects are in the mix
        return customer.preferences.some((preference) => effectCodes.includes(preference));
    });
}

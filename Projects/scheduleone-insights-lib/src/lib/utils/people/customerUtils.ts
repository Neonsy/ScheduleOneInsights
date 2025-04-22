/**
 * Customer utility functions
 */
import { customers } from '@/lib/data/people/customers';
import { findEffectByName, findEffectByCode } from '@/lib/utils/effects/effectUtils';
import type { Customer } from '@/lib/types/people/Customer';
import type { Effect } from '@/lib/types/effects/Effect';

/**
 * Find customers by effect name.
 * @param name The effect name to search for.
 * @returns Array of customers whose preferredEffects include the effect's code.
 */
export const findCustomersByEffectName = (name: Effect['name']): Customer[] => {
    const code = findEffectByName(name);
    return customers.filter((customer) => customer.preferredEffects.includes(code));
};

/**
 * Find customers by effect code.
 * @param code The effect code to search for.
 * @returns Array of customers whose preferredEffects include the effect code.
 */
export const findCustomersByEffectCode = (code: Effect['code']): Customer[] => {
    findEffectByCode(code);
    return customers.filter((customer) => customer.preferredEffects.includes(code));
};

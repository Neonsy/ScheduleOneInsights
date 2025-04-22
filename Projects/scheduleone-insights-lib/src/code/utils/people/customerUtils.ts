/**
 * Customer utility functions
 */
import { customers } from '@/code/data/people/customers';
import { findEffectByName, findEffectByCode } from '@/code/utils/effects/effectUtils';
import type { Customer } from '@/code/types/people/Customer';
import type { Effect } from '@/code/types/effects/Effect';

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

/**
 * Customer utility functions
 */
import { customers } from '@/code/data/people/customers';
import { findEffectByName, findEffectByCode } from '@/code/utils/effects/effectUtils';
import type { Customer } from '@/code/types/people/Customer';
import type { Effect } from '@/code/types/effects/Effect';
import type { EffectCode } from '@/code/types/effects/Effect';

/**
 * Find customers by effect name.
 * @param name The effect name to search for.
 * @returns Array of customers whose preferredEffects include the effect's code.
 * Returns empty array if the effect name is invalid.
 */
export const findCustomersByEffectName = (name: Effect['name']): Customer[] => {
    return findEffectByName(name).match(
        (effectCode) => customers.filter((customer) => customer.preferredEffects.includes(effectCode)),
        () => [] // If the effect name is invalid, return empty array
    );
};

/**
 * Find customers by effect code.
 * @param code The effect code to search for.
 * @returns Array of customers whose preferredEffects include the effect code.
 * Returns empty array if the effect code is invalid.
 */
export const findCustomersByEffectCode = (code: EffectCode): Customer[] => {
    return findEffectByCode(code).match(
        () => customers.filter((customer) => customer.preferredEffects.includes(code)),
        () => [] // If the effect code is invalid, return empty array
    );
};

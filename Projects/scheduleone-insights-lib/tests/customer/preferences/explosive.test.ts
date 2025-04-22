import { describe, it, expect } from 'vitest';
import { findCustomersByEffectName, findCustomersByEffectCode } from '@/code/utils/people/customerUtils';

const expectedNames = ['Herbert Bleuball', 'Pearl Moore'].sort();

describe('customerUtils - explosive effect', () => {
    it('should return all customers who prefer Explosive effect using name', () => {
        const customersByName = findCustomersByEffectName('Explosive');
        const names = customersByName.map((c) => c.name).sort();
        expect(names).toEqual(expectedNames);
    });

    it('should return all customers who prefer Explosive effect using code', () => {
        const customersByCode = findCustomersByEffectCode('EPS');
        const namesByCode = customersByCode.map((c) => c.name).sort();
        expect(namesByCode).toEqual(expectedNames);
    });
});

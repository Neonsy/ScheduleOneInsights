import { customers } from '@/code/data/people/customers';
import { dealers } from '@/code/data/people/dealers';
import type { District } from '@/code/types/consts/districts';
import type { Person } from '@/code/types/people/Person';

/**
 * Get all people (customers and dealers) by district.
 * @param district The district to filter by.
 * @returns Array of Person objects located in the specified district.
 */
export const getPeopleByDistrict = (district: District): Person[] => {
    // Combine customers and dealers filtered by the same district
    const filteredCustomers = customers.filter((customer) => customer.district === district);
    const filteredDealers = dealers.filter((dealer) => dealer.district === district);
    return [...filteredCustomers, ...filteredDealers];
};

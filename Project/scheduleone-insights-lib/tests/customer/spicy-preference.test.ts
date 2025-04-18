import { describe, it, expect } from 'vitest';
import { getCustomersByPreference } from '../../src';
import { getEffectName } from '../../src/utils/effects';

describe('Customer Preference Tests', () => {
    it('should find all customers who prefer the Spicy effect', () => {
        // Get all customers who prefer the Spicy effect (code: 'Sc')
        const spicyCustomers = getCustomersByPreference('Sc');

        // Log the customers for debugging
        console.log('Customers who prefer Spicy effect:');
        spicyCustomers.forEach((customer) => {
            console.log(`- ${customer.code} from ${customer.livingLocation}`);
        });

        // Verify that all returned customers have 'Sc' in their preferences
        spicyCustomers.forEach((customer) => {
            expect(customer.preferences).toContain('Sc');
        });

        // Verify that we found at least one customer
        // This test will fail if no customers prefer the Spicy effect
        expect(spicyCustomers.length).toBeGreaterThan(0);

        // Output some additional information about the Spicy effect
        console.log(`\nSpicy effect (Sc): ${getEffectName('Sc')}`);
        console.log(`Total customers who prefer Spicy: ${spicyCustomers.length}`);

        // Group customers by quality standard
        const qualityStandards = {
            'Very Low': spicyCustomers.filter((c) => c.qualityStandard === 'Very Low').length,
            Low: spicyCustomers.filter((c) => c.qualityStandard === 'Low').length,
            Moderate: spicyCustomers.filter((c) => c.qualityStandard === 'Moderate').length,
            High: spicyCustomers.filter((c) => c.qualityStandard === 'High').length,
        };

        console.log('Quality standards:');
        console.log(`- Very Low: ${qualityStandards['Very Low']}`);
        console.log(`- Low: ${qualityStandards['Low']}`);
        console.log(`- Moderate: ${qualityStandards['Moderate']}`);
        console.log(`- High: ${qualityStandards['High']}`);

        // Group customers by location
        const locations = {};
        spicyCustomers.forEach((customer) => {
            const location = customer.livingLocation;
            locations[location] = (locations[location] || 0) + 1;
        });

        console.log('Locations:');
        Object.entries(locations).forEach(([location, count]) => {
            console.log(`- ${location}: ${count}`);
        });
    });
});

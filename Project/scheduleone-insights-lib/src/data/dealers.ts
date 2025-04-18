// Dealer data with name as key and dealer details as value
export const dealers = {
    'Benji Coleman': {
        code: 'BC',
        location: 'Northtown',
        unlockCost: 500,
        cut: 0.2, // 20%
    },
    'Molly Presley': {
        code: 'MP',
        location: 'Westville',
        unlockCost: 1000,
        cut: 0.2, // 20%
    },
    'Brad Crosby': {
        code: 'BR',
        location: 'Downtown',
        unlockCost: 2000,
        cut: 0.2, // 20%
    },
    'Jane Lucero': {
        code: 'JL',
        location: 'Docks',
        unlockCost: 3000,
        cut: 0.2, // 20%
    },
    'Wei Long': {
        code: 'WL',
        location: 'Suburbia',
        unlockCost: 4000,
        cut: 0.2, // 20%
    },
    'Leo Rivers': {
        code: 'LR',
        location: 'Uptown',
        unlockCost: 5000,
        cut: 0.2, // 20%
    },
} as const;

// Define the DealerCode type as the possible code values
export type DealerCode = 'BC' | 'MP' | 'BR' | 'JL' | 'WL' | 'LR';

// Helper function to get dealer code by name
export function getDealerCode(name: string): DealerCode | undefined {
    const dealer = dealers[name as keyof typeof dealers];
    return dealer ? (dealer.code as DealerCode) : undefined;
}

// Helper function to get dealer name by code
export function getDealerName(code: DealerCode): string | undefined {
    for (const [name, dealer] of Object.entries(dealers)) {
        if (dealer.code === code) {
            return name;
        }
    }
    return undefined;
}

// Helper function to get dealer code by location
export function getDealerCodeByLocation(location: string): DealerCode | undefined {
    for (const [_, dealer] of Object.entries(dealers)) {
        if (dealer.location === location) {
            return dealer.code as DealerCode;
        }
    }
    return undefined;
}

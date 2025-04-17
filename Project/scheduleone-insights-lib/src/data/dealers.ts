// Dealer data with code as key and dealer details as value
export const dealers = {
    BC: {
        name: 'Benji Coleman',
        location: 'Northtown',
        unlockCost: 500,
        cut: 0.2, // 20%
    },
    MP: {
        name: 'Molly Presley',
        location: 'Westville',
        unlockCost: 1000,
        cut: 0.2, // 20%
    },
    BR: {
        name: 'Brad Crosby',
        location: 'Downtown',
        unlockCost: 2000,
        cut: 0.2, // 20%
    },
    JL: {
        name: 'Jane Lucero',
        location: 'Docks',
        unlockCost: 3000,
        cut: 0.2, // 20%
    },
    WL: {
        name: 'Wei Long',
        location: 'Suburbia',
        unlockCost: 4000,
        cut: 0.2, // 20%
    },
    LR: {
        name: 'Leo Rivers',
        location: 'Uptown',
        unlockCost: 5000,
        cut: 0.2, // 20%
    },
} as const;

// Derive the DealerCode type from the keys of the dealers object
export type DealerCode = keyof typeof dealers;

// Map from dealer names to codes for easier lookup
export const dealerNameToCode: Record<string, DealerCode> = {
    'Benji Coleman': 'BC',
    'Molly Presley': 'MP',
    'Brad Crosby': 'BR',
    'Jane Lucero': 'JL',
    'Wei Long': 'WL',
    'Leo Rivers': 'LR',
};

// Map from dealer codes to names for easier display
export const dealerCodeToName: Record<DealerCode, string> = Object.entries(dealers).reduce(
    (acc, [code, dealer]) => {
        acc[code as DealerCode] = dealer.name;
        return acc;
    },
    {} as Record<DealerCode, string>
);

// Map from locations to dealer codes for easier lookup
export const locationToDealerCode: Record<string, DealerCode> = {
    Northtown: 'BC',
    Westville: 'MP',
    Downtown: 'BR',
    Docks: 'JL',
    Suburbia: 'WL',
    Uptown: 'LR',
};

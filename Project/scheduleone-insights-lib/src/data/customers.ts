import type { Customer, CustomerCode, EffectCode, SpendingLevel } from '../types';

// Customer data with code as key and customer details as value
// Using Partial<Record> since we don't have all customers implemented yet
export const customers: Partial<Record<CustomerCode, Customer>> = {
    AK: {
        code: 'AK',
        name: 'Alison Knight',
        preferences: ['En', 'Ca', 'Re'],
        spendingLevel: 'Medium',
        livingLocation: 'Suburbia',
        schedule: [
            { entryNumber: 1, location: "Bleuball's Boutique", startTime: '7:00am', endTime: '9:00am' },
            { entryNumber: 2, location: 'Gets in the black car at the house with the couch on the porch in Suburbia', startTime: '10:00am' },
            { entryNumber: 3, location: 'Parking lot behind Les Ordures Puantes', startTime: '10:55am' },
            { entryNumber: 4, location: 'Hyland Tower 2', startTime: '11:10am', endTime: '2:00pm' },
            { entryNumber: 5, location: 'Standing behind Hyland Tower by the pay phone.', startTime: '2:25pm', endTime: '3:30pm' },
            { entryNumber: 6, location: 'Hyland Tower 2', startTime: '3:50pm', endTime: '6:30pm' },
            { entryNumber: 7, location: 'Black car in parking lot behind Les Ordures Puantes', startTime: '6:45pm' },
            { entryNumber: 8, location: 'House with the couch on the porch in Suburbia', startTime: '8:15pm' },
        ],
    },
    AC: {
        code: 'AC',
        name: 'Anna Chesterfield',
        preferences: ['Eu', 'Se', 'Mu'],
        spendingLevel: 'Medium',
        livingLocation: 'Docks',
        schedule: [
            { entryNumber: 1, location: 'Barbershop', startTime: '7:00am', endTime: '6:00pm' },
            { entryNumber: 2, location: 'Across the street from the Barbershop', startTime: '6:10pm', endTime: '8:05pm' },
            { entryNumber: 3, location: 'Building to the south of the Parking Garage', startTime: '8:30pm' },
        ],
    },
    AS: {
        code: 'AS',
        name: 'Austin Steiner',
        preferences: ['At', 'En', 'TP'],
        spendingLevel: 'Low',
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Yellow house with the yellow sh*tbox in front in Westville', startTime: '7:00am', endTime: '7:30am' },
            { entryNumber: 2, location: 'Community Center', startTime: '8:20am', endTime: '10:30am' },
            { entryNumber: 3, location: 'Bench behind building', startTime: '10:50am', endTime: '11:30am' },
            { entryNumber: 4, location: 'Inside Taco Ticklers', startTime: '12:30pm', endTime: '1:40pm' },
            { entryNumber: 5, location: 'Arcade', startTime: '3:00pm', endTime: '6:00pm' },
            { entryNumber: 6, location: 'Stands just outside Arcade', startTime: '6:00pm', endTime: '6:45pm' },
            { entryNumber: 7, location: 'Arcade', startTime: '6:45pm', endTime: '11:00pm' },
            { entryNumber: 8, location: 'Yellow house with the yellow sh*tbox in front in Westville', startTime: '11:50pm' },
        ],
    },
    BP: {
        code: 'BP',
        name: 'Beth Penn',
        preferences: ['Gl', 'TT', 'BE'],
        spendingLevel: 'Medium',
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Bus stop in front of Motel Office', startTime: '7:00am', endTime: '7:50am' },
            { entryNumber: 2, location: 'Hyland Tower 2 (tower next to HAM Legal Services)', startTime: '9:20am', endTime: '12:40pm' },
            { entryNumber: 3, location: 'In front of Parking Garage', startTime: '1:50pm', endTime: '2:50pm' },
            { entryNumber: 4, location: 'Hyland Tower 2', startTime: '4:00pm', endTime: '4:50pm' },
            { entryNumber: 5, location: 'ATM in front of Thrifty Threads', startTime: '6:15pm' },
            { entryNumber: 6, location: 'Outside the southeast corner of the Warehouse', startTime: '6:45pm', endTime: '7:20pm' },
            { entryNumber: 7, location: 'Motel Room #4', startTime: '8:25pm' },
        ],
    },
    BK: {
        code: 'BK',
        name: 'Billy Kramer',
        preferences: ['Sh', 'AG', 'Zo'],
        spendingLevel: 'Medium',
        livingLocation: 'Docks',
        schedule: [
            {
                entryNumber: 1,
                location: 'In the Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                startTime: '7:00am',
                endTime: '7:45am',
            },
            { entryNumber: 2, location: 'Red car next to Grey Docks Building', startTime: '7:50am' },
            { entryNumber: 3, location: 'Inside Koyama Chemical Company', startTime: '8:45am', endTime: '11:50am' },
            { entryNumber: 4, location: 'Cuke machine by Top Tattoo', startTime: '12:18pm' },
            { entryNumber: 5, location: 'Western Gas Mart', startTime: '12:35pm', endTime: '1:15pm' },
            { entryNumber: 6, location: 'Standing outside Koyama Chemical Company', startTime: '1:40pm', endTime: '3:00pm' },
            { entryNumber: 7, location: 'Inside Koyama Chemical Company', startTime: '3:10pm', endTime: '5:30pm' },
            { entryNumber: 8, location: 'On a bench by the water in southern Westville', startTime: '6:45pm', endTime: '8:00pm' },
            { entryNumber: 9, location: 'Red car at Koyama Chemical Company', startTime: '9:05pm' },
            {
                entryNumber: 10,
                location: 'Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                startTime: '9:55pm',
            },
        ],
    },
    CB: {
        code: 'CB',
        name: 'Carl Bundy',
        preferences: ['Sh', 'AG', 'Zo'],
        spendingLevel: 'High',
        livingLocation: 'Suburbia',
        schedule: [
            { entryNumber: 1, location: 'White house with white door in Suburbia', startTime: '7:00am', endTime: '11:00am' },
            { entryNumber: 2, location: 'Behind the bus stop near the Docks Warehouse property', startTime: '12:30pm', endTime: '3:00pm' },
            { entryNumber: 3, location: 'ATM in front of Supermarket', startTime: '4:40pm' },
            { entryNumber: 4, location: 'The Crimson Canary', startTime: '4:55pm' },
        ],
    },
    CR: {
        code: 'CR',
        name: 'Charles Rowland',
        preferences: ['Gl', 'TT', 'BE'],
        spendingLevel: 'Low',
        livingLocation: 'Westville',
        schedule: [
            { entryNumber: 1, location: 'Yellow house with blue pickup truck in Westville', startTime: '7:00am', endTime: '1:00pm' },
            { entryNumber: 2, location: 'Liquor Store', startTime: '2:25pm', endTime: '3:00pm' },
            { entryNumber: 3, location: 'Bus stop near Motel Office', startTime: '3:20pm', endTime: '5:10pm' },
            { entryNumber: 4, location: 'West Gas Mart', startTime: '6:00pm' },
        ],
    },
    CL: {
        code: 'CL',
        name: 'Chloe Bowers',
        preferences: ['Eu', 'Se', 'Mu'],
        spendingLevel: 'Low',
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Westville Gas Mart', startTime: '7:00am', endTime: '6:00pm' },
            { entryNumber: 2, location: 'Bus stop in front of Gas Mart', startTime: '6:30pm', endTime: '7:30pm' },
            { entryNumber: 3, location: 'Building south of the Parking Garage', startTime: '8:50pm' },
        ],
    },
    CS: {
        code: 'CS',
        name: 'Chris Sullivan',
        preferences: ['At', 'En', 'TP'],
        spendingLevel: 'Medium',
        livingLocation: 'Suburbia',
        schedule: [
            { entryNumber: 1, location: '???', startTime: '7:00am', endTime: '9:35am' },
            {
                entryNumber: 2,
                location:
                    'Teleports to the ATM in front of the Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                startTime: '9:35am',
            },
            { entryNumber: 3, location: "Randy's Bait & Tackle", startTime: '10:15am', endTime: '12:40pm' },
            { entryNumber: 4, location: 'Teleports somewhere', startTime: '12:40pm' },
        ],
    },
    CF: {
        code: 'CF',
        name: 'Cranky Frank',
        preferences: ['Sh', 'AG', 'Zo'],
        spendingLevel: 'Low',
        livingLocation: 'Docks',
        schedule: [
            { entryNumber: 1, location: 'On a bench in the encampment next to the western Gas Mart', startTime: '7:00am', endTime: '8:00am' },
            { entryNumber: 2, location: 'Standing at the fire barrel in the encampment', startTime: '8:05am', endTime: '9:15am' },
            { entryNumber: 3, location: 'Top Tattoo', startTime: '9:45am', endTime: '11:05am' },
            { entryNumber: 4, location: 'Bus stop behind western construction site', startTime: '12:05pm', endTime: '2:10pm' },
            {
                entryNumber: 5,
                location: 'Stading by the fire barrel near the water behind the building to the rear of the Arcade',
                startTime: '3:20pm',
                endTime: '6:25pm',
            },
            { entryNumber: 6, location: 'Sauerkraut Supreme Pizza', startTime: '6:50pm', endTime: '8:20pm' },
            { entryNumber: 7, location: 'Liquor Store', startTime: '9:30pm', endTime: '10:05pm' },
            { entryNumber: 8, location: 'By the dumpster behind the Motel Office', startTime: '10:45pm', endTime: '12:30am' },
            { entryNumber: 9, location: 'Taco Ticklers', startTime: '1:00am', endTime: '2:00am' },
            { entryNumber: 10, location: 'On a bench in the encampment next to the western Gas Mart', startTime: '3:00am' },
        ],
    },
};

// Map locations to customer names for easier lookup
export const customersByLocation: Record<string, string[]> = {
    Northtown: [
        'Jessi Waters',
        'Donna Martin',
        'Kathy Henderson',
        'Kyle Cooley',
        'Austin Steiner',
        'Beth Penn',
        'Ludwig Meyer',
        'Chloe Bowers',
        'Peter File',
        'Geraldine Poon',
        'Peggy Meyers',
        'Sam Thompson',
        'Mick Lubbin',
    ],
    Westville: [
        'Trent Sherman',
        'Meg Cooley',
        'Joyce Ball',
        'Keith Wagner',
        'Doris Lubbin',
        'Kim Delaney',
        'Charles Rowland',
        'Jerry Montero',
        'Dean Webster',
        'George Greene',
        'Mac Cooper',
    ],
    Downtown: [
        'Eugene Buckley',
        'Randy Caulfield',
        'Louis Fourier',
        'Elizabeth Homley',
        'Lucy Pennington',
        'Kevin Oakley',
        'Jennifer Rivera',
        'Jeff Gilmore',
        'Sam Thompson',
    ],
    Docks: [
        'Cranky Frank',
        'Marco Barone',
        'Anna Chesterfield',
        'Genghis Barn',
        'Javier Perez',
        'Greg Figgle',
        'Lisa Gardner',
        'Phillip Wentworth',
        'Melissa Wood',
        'Billy Kramer',
    ],
    Suburbia: [
        'Carl Bundy',
        'Jackie Stevenson',
        'Jeremy Wilkinson',
        'Harold Colt',
        'Alison Knight',
        'Karen Kennedy',
        'Jack Knight',
        'Chris Sullivan',
        'Dennis Kennedy',
        'Hank Stevenson',
    ],
    Uptown: ['Ray Hoffman', 'Michael Boog', 'Fiona Hancock', 'Herbert Blueball', 'Jen Heard', 'Lily Turner', 'Pearl Moore', 'Walter Cussler'],
};

// This mapping is no longer needed since we're using location-based organization
// Keeping it commented out in case it's needed in the future
/*
export const customerCodeToName: Record<CustomerCode, string> = {
    // Northtown
    JW: 'Jessi Waters',
    DM: 'Donna Martin',
    KH: 'Kathy Henderson',
    KC: 'Kyle Cooley',
    AS: 'Austin Steiner',
    BP: 'Beth Penn',
    LM: 'Ludwig Meyer',
    CL: 'Chloe Bowers',
    PF: 'Peter File',
    GP: 'Geraldine Poon',
    PM: 'Peggy Meyers',
    ST: 'Sam Thompson',
    ML: 'Mick Lubbin',

    // Westville
    TS: 'Trent Sherman',
    MC: 'Meg Cooley',
    JB: 'Joyce Ball',
    KW: 'Keith Wagner',
    DL: 'Doris Lubbin',
    KD: 'Kim Delaney',
    CR: 'Charles Rowland',
    JM: 'Jerry Montero',
    DW: 'Dean Webster',
    GG: 'George Greene',
    MA: 'Mac Cooper',

    // Downtown
    EB: 'Eugene Buckley',
    RC: 'Randy Caulfield',
    LF: 'Louis Fourier',
    EH: 'Elizabeth Homley',
    LP: 'Lucy Pennington',
    KO: 'Kevin Oakley',
    JR: 'Jennifer Rivera',
    JG: 'Jeff Gilmore',
    ST2: 'Sam Thompson (Downtown)',

    // Docks
    CF: 'Cranky Frank',
    MB: 'Marco Barone',
    AC: 'Anna Chesterfield',
    GB: 'Genghis Barn',
    JP: 'Javier Perez',
    GF: 'Greg Figgle',
    LG: 'Lisa Gardner',
    PW: 'Phillip Wentworth',
    MW: 'Melissa Wood',
    BK: 'Billy Kramer',

    // Suburbia
    CB: 'Carl Bundy',
    JS: 'Jackie Stevenson',
    JW2: 'Jeremy Wilkinson',
    HC: 'Harold Colt',
    AK: 'Alison Knight',
    KK: 'Karen Kennedy',
    JK: 'Jack Knight',
    CS: 'Chris Sullivan',
    DK: 'Dennis Kennedy',
    HS: 'Hank Stevenson',

    // Uptown
    RH: 'Ray Hoffman',
    MB2: 'Michael Boog',
    FH: 'Fiona Hancock',
    HB: 'Herbert Blueball',
    JH: 'Jen Heard',
    LT: 'Lily Turner',
    PM2: 'Pearl Moore',
    WC: 'Walter Cussler',
};
*/

// Get customers by location
export function getCustomersByLocation(location: string): string[] {
    return customersByLocation[location] || [];
}

// Get customers by schedule location
export function getCustomersByScheduleLocation(location: string): Customer[] {
    return Object.values(customers).filter(
        (customer) => customer && customer.schedule && customer.schedule.some((entry) => entry.location === location)
    );
}

// Get customers by effect preference
export function getCustomersByPreference(effectCode: EffectCode): Customer[] {
    return Object.values(customers).filter((customer) => customer.preferences.includes(effectCode));
}

// Get customers by spending level
export function getCustomersBySpendingLevel(spendingLevel: SpendingLevel): Customer[] {
    return Object.values(customers).filter((customer) => customer.spendingLevel === spendingLevel);
}

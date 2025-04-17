import type { EffectCode } from './effects';

// Customer data with code as key and customer details as value
// Using Partial<Record> since we don't have all customers implemented yet
export const customers = {
    // Northtown Customers
    KC: {
        code: 'KC',
        name: 'Kyle Cooley',
        preferences: ['Cm', 'Mcs', 'Sm'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Across the street from the back staff entrance of Taco Ticklers', startTime: '7:00am', endTime: '7:10am' },
            { entryNumber: 2, location: 'Taco Ticklers counter', startTime: '7:30am', endTime: '12:30pm' },
            { entryNumber: 3, location: 'Bench by Skatepark', startTime: '12:40pm', endTime: '1:30pm' },
            { entryNumber: 4, location: 'Taco Ticklers counter', startTime: '1:40pm', endTime: '10:00pm' },
            { entryNumber: 5, location: 'Teleports to the yellow house with the yellow sh*tbox in front in Westville', startTime: '10:00pm' },
        ],
    },
    AS: {
        code: 'AS',
        name: 'Austin Steiner',
        preferences: ['CD', 'Epc', 'Mcs'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
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
    JW: {
        code: 'JW',
        name: 'Jessi Waters',
        preferences: ['Egz', 'Pna', 'Sn'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Very Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Motel Room #5', startTime: '7:00am', endTime: '11:00am' },
            { entryNumber: 2, location: 'In front of Taco Ticklers', startTime: '11:30am', endTime: '12:30pm' },
            { entryNumber: 3, location: 'Gets a Cuke across the street from Slop Shop', startTime: '12:50 pm' },
            { entryNumber: 4, location: 'In the alley behind Hyland Bank', startTime: '1:30 pm', endTime: '4:00pm' },
            { entryNumber: 5, location: 'Teleports to the bench where central canal meets the water', startTime: '4:00pm', endTime: '7:00pm' },
            { entryNumber: 6, location: 'In front of the Docks Warehouse property', startTime: '7:30pm', endTime: '9:00pm' },
            { entryNumber: 7, location: 'Motel Room #5', startTime: '11:00pm' },
        ],
    },
    KH: {
        code: 'KH',
        name: 'Kathy Henderson',
        preferences: ['Al', 'Egz', 'Fcd'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Westville Apartment Building, Unit #2', startTime: '7:00am', endTime: '7:30am' },
            { entryNumber: 2, location: 'Community Center', startTime: '7:50am', endTime: '8:10am' },
            { entryNumber: 3, location: 'By the water in southern Westville', startTime: '8:50am', endTime: '9:20am' },
            { entryNumber: 4, location: 'Community Center', startTime: '10:00am', endTime: '1:20pm' },
            { entryNumber: 5, location: 'Western Gas Mart', startTime: '1:50pm', endTime: '2:30pm' },
            { entryNumber: 6, location: 'Cuke machine outside Top Tattoo', startTime: '2:50pm' },
            { entryNumber: 7, location: 'Sitting on bench next to statue in west park', startTime: '3:15pm', endTime: '4:00pm' },
            { entryNumber: 8, location: 'Community Center', startTime: '4:40pm', endTime: '6:30pm' },
            { entryNumber: 9, location: 'Westville Apartment Building, Unit #2', startTime: '6:50pm' },
        ],
    },
    ML: {
        code: 'ML',
        name: 'Mick Lubbin',
        preferences: ['Epc', 'BE', 'Sn'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Pawn Shop', startTime: '7:00am', endTime: '6:00pm' },
            { entryNumber: 2, location: 'Red Pickup Truck in the Taco Ticklers parking lot', startTime: '6:45pm' },
            { entryNumber: 3, location: 'Sauerkraut Supreme Pizza parking lot in truck', startTime: '7:15pm' },
            { entryNumber: 4, location: "Bud's Bar", startTime: '7:30pm', endTime: '10:30pm' },
            { entryNumber: 5, location: 'Red pickup truck in Sauerkraut Supreme Pizza parking lot', startTime: '10:45pm' },
            { entryNumber: 6, location: 'House behind Westville Gas Mart', startTime: '11:40pm' },
        ],
    },
    ST: {
        code: 'ST',
        name: 'Sam Thompson',
        preferences: ['Mcs', 'Al', 'Sm'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Light blue house in Suburbia', startTime: '7:00am', endTime: '9:00am' },
            { entryNumber: 2, location: 'Drives an orange Cheetah', startTime: '9:00am' },
            { entryNumber: 3, location: 'Outside Thompson Construction & Demo in car', startTime: '10:30am' },
            { entryNumber: 4, location: 'Cuke machine in front of Motel Office', startTime: '10:45am' },
            {
                entryNumber: 5,
                location: 'In front of Thompson Construction & Demo, next to Cash for Trash machine',
                startTime: '11:10am',
                endTime: '11:50am',
            },
            { entryNumber: 6, location: 'Inside Thompson Construction & Demo', startTime: '11:50am', endTime: '4:30pm' },
            { entryNumber: 7, location: 'In front of Skatepark with Donna', startTime: '4:30pm', endTime: '6:00pm' },
            { entryNumber: 8, location: 'At ATM next to parking garage', startTime: '6:30pm' },
            { entryNumber: 9, location: 'Supermarket', startTime: '7:10pm', endTime: '8:40pm' },
            { entryNumber: 10, location: 'Gets into orange Cheetah in front of Thompson Construction & Demo', startTime: '9:50pm' },
            { entryNumber: 11, location: 'Drives back to light blue house in Suburbia', startTime: '11:15pm' },
        ],
    },
    PF: {
        code: 'PF',
        name: 'Peter File',
        preferences: ['Fcd', 'Rfs', 'Sn'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Motel Room #3', startTime: '7:00am', endTime: '9:15am' },
            { entryNumber: 2, location: 'Westville Gas Mart', startTime: '10:10am', endTime: '10:30am' },
            { entryNumber: 3, location: 'Statue in west park', startTime: '11:00am', endTime: '11:15am' },
            { entryNumber: 4, location: 'Cuke machine in front of Top Tattoo', startTime: '11:40am' },
            { entryNumber: 5, location: 'Outside southwest corner of Warehouse', startTime: '12:50pm', endTime: '1:30pm' },
            { entryNumber: 6, location: 'Inside Taco Ticklers', startTime: '2:20pm', endTime: '2:30pm' },
            { entryNumber: 7, location: 'Thrifty Threads', startTime: '3:20pm', endTime: '4:00pm' },
            { entryNumber: 8, location: 'ATM next to Parking Garage', startTime: '4:40pm' },
            { entryNumber: 9, location: 'Sauerkraut Supreme Pizza', startTime: '5:40pm', endTime: '7:15pm' },
            { entryNumber: 10, location: 'Bench outside Hyland Range', startTime: '7:35pm', endTime: '8:45pm' },
            { entryNumber: 11, location: 'Motel Room #3', startTime: '9:30pm' },
        ],
    },
    DM: {
        code: 'DM',
        name: 'Donna Martin',
        preferences: ['Rfs', 'Lt', 'Mcs'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Motel Office', startTime: '7:00am', endTime: '9:15am' },
            { entryNumber: 2, location: 'Westville Gas Mart', startTime: '10:00am', endTime: '10:30am' },
            { entryNumber: 3, location: 'Barbershop', startTime: '11:40am', endTime: '12:00pm' },
            { entryNumber: 4, location: 'Motel Office', startTime: '12:45pm', endTime: '4:30pm' },
            { entryNumber: 5, location: 'In front of Skatepark with Sam', startTime: '4:45pm', endTime: '6:00pm' },
            { entryNumber: 6, location: 'On West Bridge', startTime: '6:40pm', endTime: '8:00pm' },
            { entryNumber: 7, location: 'Motel Office', startTime: '8:30pm' },
        ],
    },
    GP: {
        code: 'GP',
        name: 'Geraldine Poon',
        preferences: ['Bd', 'LF', 'Sdt'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Very Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [
            {
                entryNumber: 1,
                location: 'Pink building at the north end of the street by the water in Northtown',
                startTime: '7:00am',
                endTime: '9:00am',
            },
            { entryNumber: 2, location: 'Standing outside the pink building', startTime: '9:00am', endTime: '10:00am' },
            {
                entryNumber: 3,
                location: 'Sitting at the table behind the building to the rear of the basketball court.',
                startTime: '10:30am',
                endTime: '11:30am',
            },
            { entryNumber: 4, location: 'The shed on the west side of the northern bridge to Westville.', startTime: '12:30pm', endTime: '3:45pm' },
            { entryNumber: 5, location: 'West construction site with Jerry', startTime: '4:15pm', endTime: '5:30pm' },
            {
                entryNumber: 6,
                location: 'Sitting by the fire barrel in the encampment next to the western Gas Mart',
                startTime: '6:00pm',
                endTime: '7:50pm',
            },
            { entryNumber: 7, location: 'Teleports back to the pink building', startTime: '7:50pm' },
        ],
    },
    CB: {
        code: 'CB',
        name: 'Chloe Bowers',
        preferences: ['Epc', 'Sk', 'Mcs'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Westville Gas Mart', startTime: '7:00am', endTime: '6:00pm' },
            { entryNumber: 2, location: 'Bus stop in front of Gas Mart', startTime: '6:30pm', endTime: '7:30pm' },
            { entryNumber: 3, location: 'Building south of the Parking Garage', startTime: '8:50pm' },
        ],
    },
    PM: {
        code: 'PM',
        name: 'Peggy Mayers',
        preferences: ['BE', 'Rfs', 'Egz'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Building behind basketball court', startTime: '7:00am', endTime: '8:45am' },
            { entryNumber: 2, location: 'Cuke machine in front of Arcade', startTime: '9:10am' },
            { entryNumber: 3, location: 'Pill-Ville Pharmacy', startTime: '9:20am', endTime: '9:30am' },
            { entryNumber: 4, location: 'Slop Shop', startTime: '10:50am', endTime: '1:30pm' },
            { entryNumber: 5, location: 'Barbershop', startTime: '1:50pm', endTime: '3:30pm' },
            { entryNumber: 6, location: 'Standing outside Barbershop on her phone', startTime: '3:30pm', endTime: '5:00pm' },
            { entryNumber: 7, location: 'Slop Shop', startTime: '5:20pm', endTime: '8:50pm' },
            { entryNumber: 8, location: 'Teleports back to building behind the basketball court', startTime: '8:50pm' },
        ],
    },
    LM: {
        code: 'LM',
        name: 'Ludwig Meyer',
        preferences: ['Epc', 'Rfs', 'Egz'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [
            { entryNumber: 1, location: 'Building behind Slop Shop', startTime: '7:00am', endTime: '7:30am' },
            { entryNumber: 2, location: 'ATM next to parking garage', startTime: '7:45am' },
            { entryNumber: 3, location: 'Sauerkraut Supreme Pizza', startTime: '8:40am', endTime: '12:50pm' },
            { entryNumber: 4, location: 'Bench outside Sauerkraut Supreme Pizza', startTime: '12:50pm', endTime: '2:50pm' },
            { entryNumber: 5, location: 'Sauerkraut Supreme Pizza', startTime: '2:50pm', endTime: '9:00pm' },
            { entryNumber: 6, location: 'Building behind Slop Shop', startTime: '9:00pm' },
        ],
    },
    BP: {
        code: 'BP',
        name: 'Beth Penn',
        preferences: ['Szp', 'Lt', 'SI'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
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
    MM: {
        code: 'MM',
        name: 'Mrs. Ming',
        preferences: ['Grs', 'Sk', 'Elf'],
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Northtown',
        schedule: [{ entryNumber: 1, location: 'Chinese Restaurant', startTime: '7:00am' }],
    },

    // Westville Customers
    TS: {
        code: 'TS',
        name: 'Trent Sherman',
        preferences: ['Al', 'Bd', 'CD'], // Athletic, Balding, Calorie-Dense (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Westville',
        schedule: [
            { entryNumber: 1, location: 'At the blue house by the water in Westville', startTime: '7:00am', endTime: '8:00am' },
            { entryNumber: 2, location: 'At the Cuke machine near Top Tattoo', startTime: '8:40am' },
            { entryNumber: 3, location: 'Pawn Shop', startTime: '9:30am', endTime: '10:00am' },
            { entryNumber: 4, location: 'Standing at the ledge above Hyland Range', startTime: '11:10am', endTime: '12:30pm' },
            {
                entryNumber: 5,
                location: 'In the Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                startTime: '2:30pm',
                endTime: '4:30pm',
            },
            { entryNumber: 6, location: 'Standing on the bridge over the central canal near the water', startTime: '5:20pm', endTime: '6:30pm' },
            { entryNumber: 7, location: 'Liquor Store', startTime: '7:15pm', endTime: '8:30pm' },
            { entryNumber: 8, location: 'At the blue house by the water in Westville', startTime: '9:50pm' },
        ],
    },
    MC: {
        code: 'MC',
        name: 'Meg Cooley',
        preferences: ['Sn', 'Slp', 'TP'], // Sneaky, Slippery, Thought-Provoking (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Westville',
        schedule: [
            { entryNumber: 1, location: 'Central Gas Mart', startTime: '7:00am', endTime: '6:00pm' },
            { entryNumber: 2, location: 'Bus stop across the street from Car Wash business', startTime: '6:45pm', endTime: '7:15pm' },
            { entryNumber: 3, location: 'Cuke machine outside of Top Tattoo', startTime: '9:10pm' },
            { entryNumber: 4, location: 'Yellow house with the yellow sh*tbox in front in Westville', startTime: '9:50pm' },
        ],
    },
    JB: {
        code: 'JB',
        name: 'Joyce Ball',
        preferences: ['Epc', 'TP', 'CD'], // Euphoric, Thought-Provoking, Calorie-Dense (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Westville',
        schedule: [
            {
                entryNumber: 1,
                location: 'In the travel trailer in the encampment next to the western Gas Mart',
                startTime: '7:00am',
                endTime: '9:20am',
            },
            { entryNumber: 2, location: 'Standing outside the travel trailer', startTime: '9:25am', endTime: '10:30am' },
            { entryNumber: 3, location: 'Inside Top Tattoo', startTime: '11:05am', endTime: '11:30am' },
            { entryNumber: 4, location: 'On a bench in front of Thompson Construction & Demo', startTime: '12:55pm', endTime: '2:00pm' },
            { entryNumber: 5, location: 'Supermarket', startTime: '3:00pm', endTime: '4:30pm' },
            { entryNumber: 6, location: 'Standing behind Slop Shop', startTime: '5:00pm', endTime: '7:00pm' },
            { entryNumber: 7, location: 'In the travel trailer in the encampment next to the western Gas Mart', startTime: '8:10pm' },
        ],
    },
    KW: {
        code: 'KW',
        name: 'Keith Wagner',
        preferences: ['Slp', 'Sn', 'TT'], // Slippery, Sneaky, Tropic Thunder (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Very Low', // From screenshot
        livingLocation: 'Westville',
        schedule: [{ entryNumber: 1, location: 'Westville Apartment Building, Unit #4', startTime: '7:00am' }],
    },
    DL: {
        code: 'DL',
        name: 'Doris Lubbin',
        preferences: ['Sc', 'TT', 'Bd'], // Spicy, Tropic Thunder, Balding (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Westville',
        schedule: [
            { entryNumber: 1, location: 'House behind west Gas Mart', startTime: '7:00am', endTime: '7:10am' },
            { entryNumber: 2, location: 'Behind Thrifty Threads', startTime: '8:50am', endTime: '10:00am' },
            { entryNumber: 3, location: 'Inside Thrifty Threads', startTime: '10:15am', endTime: '1:50pm' },
            { entryNumber: 4, location: 'Pawn Shop', startTime: '2:40pm', endTime: '3:15pm' },
            { entryNumber: 5, location: 'Community Center', startTime: '4:40pm', endTime: '6:15pm' },
            { entryNumber: 6, location: 'House behind west Gas Mart', startTime: '6:50pm' },
        ],
    },
    JM: {
        code: 'JM',
        name: 'Jerry Montero',
        preferences: ['Grs', 'Sm', 'TP'], // Gingeritis, Smelly, Thought-Provoking (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Westville',
        schedule: [
            { entryNumber: 1, location: 'In the tent in the encampment next to the western Gas Mart', startTime: '7:00am', endTime: '9:50am' },
            { entryNumber: 2, location: 'Cuke machine near Top Tattoo', startTime: '10:15am' },
            {
                entryNumber: 3,
                location: 'Sitting at the fire barrel at the encampment next to the western Gas Mart',
                startTime: '10:40am',
                endTime: '12:20pm',
            },
            { entryNumber: 4, location: 'Community Center', startTime: '1:20pm', endTime: '3:45pm' },
            { entryNumber: 5, location: 'At the west construction site, talking to Geraldine', startTime: '4:10pm', endTime: '5:30pm' },
            { entryNumber: 6, location: 'Outside southwest corner of Warehouse', startTime: '6:45pm', endTime: '9:20pm' },
            {
                entryNumber: 7,
                location: 'Sitting at the fire barrel at the encampment next to the western Gas Mart',
                startTime: '9:55pm',
                endTime: '3:00am',
            },
            { entryNumber: 8, location: 'In the tent in the encampment next to the western Gas Mart', startTime: '3:05am' },
        ],
    },
    KD: {
        code: 'KD',
        name: 'Kim Delaney',
        preferences: ['Sk', 'Jrs', 'Fcd'], // Shrinking, Jennerising, Focused (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Westville',
        schedule: [{ entryNumber: 1, location: 'Building behind basketball court', startTime: '7:00am' }],
    },
    DW: {
        code: 'DW',
        name: 'Dean Webster',
        preferences: ['Gw', 'Lxt', 'Sc'], // Glowing, Laxative, Spicy (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Westville',
        schedule: [
            { entryNumber: 1, location: 'Top Tattoo', startTime: '7:00am', endTime: '6:00pm' },
            { entryNumber: 2, location: 'Standing outside Top Tattoo', startTime: '6:05pm', endTime: '8:00pm' },
            { entryNumber: 3, location: 'House next to Bungalow property', startTime: '9:20pm' },
        ],
    },
    CR: {
        code: 'CR',
        name: 'Charles Rowland',
        preferences: ['Sdt', 'Dor', 'Fg'], // Sedating, Disorienting, Foggy (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Westville',
        schedule: [
            { entryNumber: 1, location: 'Yellow house with blue pickup truck in Westville', startTime: '7:00am', endTime: '1:00pm' },
            { entryNumber: 2, location: 'Liquor Store', startTime: '2:25pm', endTime: '3:00pm' },
            { entryNumber: 3, location: 'Bus stop near Motel Office', startTime: '3:20pm', endTime: '5:10pm' },
            { entryNumber: 4, location: 'West Gas Mart', startTime: '6:00pm' },
        ],
    },
    GG: {
        code: 'GG',
        name: 'George Greene',
        preferences: ['Egz', 'Fcd', 'TP'], // Energizing, Focused, Thought-Provoking (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Westville',
        schedule: [
            { entryNumber: 1, location: 'Gray house two down from the Bungalow property', startTime: '7:00am', endTime: '8:00am' },
            { entryNumber: 2, location: 'In front of the west construction site by the pay phone', startTime: '8:30am', endTime: '9:15am' },
            { entryNumber: 3, location: 'ATM in front of west Gas Mart', startTime: '9:40am' },
            { entryNumber: 4, location: 'Supermarket', startTime: '11:15am', endTime: '11:30am' },
            {
                entryNumber: 5,
                location: 'Standing on the southeast corner of Thompson Construction & Demo',
                startTime: '12:25pm',
                endTime: '12:45pm',
            },
            { entryNumber: 6, location: 'On a bench in front of Shred Shack', startTime: '1:15pm', endTime: '3:00pm' },
            { entryNumber: 7, location: "Bud's Bar", startTime: '3:05pm', endTime: '2:00am' },
            { entryNumber: 8, location: 'Gray house two down from the Bungalow property', startTime: '3:30am' },
        ],
    },
    DS: {
        code: 'DS',
        name: 'Dan Samwell',
        preferences: ['Fcd', 'Egz', 'Sm'], // Focused, Energizing, Smelly (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Low', // From screenshot
        livingLocation: 'Westville',
        schedule: [
            { entryNumber: 1, location: "Dan's Hardware", startTime: '7:00am', endTime: '8:00pm' },
            { entryNumber: 2, location: 'Sauerkraut Supreme Pizza', startTime: '8:25pm', endTime: '9:30pm' },
            { entryNumber: 3, location: "Bud's Bar", startTime: '9:45pm', endTime: '1:00am' },
            { entryNumber: 4, location: "Room above Dan's Hardware", startTime: '1:15am' },
        ],
    },

    // Downtown Customers
    EH: {
        code: 'EH',
        name: 'Elizabeth Homley',
        preferences: ['Sdt', 'TT', 'Tx'], // Sedating, Tropic Thunder, Toxic (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // From screenshot
        livingLocation: 'Downtown',
        schedule: [
            { entryNumber: 1, location: '???', startTime: '7:00am', endTime: '12:00pm' },
            { entryNumber: 2, location: 'Exits the back door of Slop Shop', startTime: '12:05pm' },
            { entryNumber: 3, location: 'Standing between Hyland Police Station and Slop Shop', startTime: '12:20pm', endTime: '1:00pm' },
            { entryNumber: 4, location: 'Central Gas Mart', startTime: '1:50pm', endTime: '2:20pm' },
            {
                entryNumber: 5,
                location: 'Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                startTime: '3:20pm',
                endTime: '5:50pm',
            },
            { entryNumber: 6, location: "On the bench across from Randy's Bait & Tackle", startTime: '6:25pm', endTime: '7:15pm' },
            { entryNumber: 7, location: 'Grey Docks Building', startTime: '7:50pm', endTime: '10:00pm' },
            { entryNumber: 8, location: 'Teleports somewhere?', startTime: '10:00pm' },
        ],
    },
    JR: {
        code: 'JR',
        name: 'Jennifer Rivera',
        preferences: ['Sk', 'Slp', 'Tx'], // Shrinking, Slippery, Toxic (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // From screenshot
        livingLocation: 'Downtown',
        schedule: [
            { entryNumber: 1, location: 'In the building behind Slop Shop', startTime: '7:00am', endTime: '10:45am' },
            { entryNumber: 2, location: "Bleuball's Boutique", startTime: '12:00pm', endTime: '12:50pm' },
            { entryNumber: 3, location: 'Walks near central canal, then turns around.', startTime: '1:55pm' },
            { entryNumber: 4, location: 'Sitting at a table behind Hyland Tower', startTime: '2:50pm', endTime: '3:30pm' },
            { entryNumber: 5, location: 'Casino', startTime: '4:15pm' },
        ],
    },
    KO: {
        code: 'KO',
        name: 'Kevin Oakley',
        preferences: [], // No preferences (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // From screenshot
        livingLocation: 'Downtown',
        schedule: [{ entryNumber: 1, location: 'By the water next to the Casino', startTime: '7:00am' }],
    },
    LP: {
        code: 'LP',
        name: 'Lucy Pennington',
        preferences: ['CD', 'Epc', 'Gw'], // Calorie-Dense, Euphoric, Glowing (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // From screenshot
        livingLocation: 'Downtown',
        schedule: [
            { entryNumber: 1, location: 'Building behind Slop Shop', startTime: '7:00am', endTime: '7:05am' },
            { entryNumber: 2, location: 'Cuke machine across the street from Slop Shop', startTime: '7:30am' },
            { entryNumber: 3, location: 'Behind Thompson Construction & Demo', startTime: '8:30am', endTime: '9:15am' },
            { entryNumber: 4, location: 'Pill-Ville Pharmacy', startTime: '9:35am', endTime: '11:20am' },
            { entryNumber: 5, location: 'Bench in front of basketball court', startTime: '11:35am', endTime: '1:20pm' },
            { entryNumber: 6, location: 'Pill-Ville Pharmacy', startTime: '1:35pm', endTime: '6:30pm' },
            { entryNumber: 7, location: 'Building behind Slop Shop', startTime: '8:00pm' },
        ],
    },
    LF: {
        code: 'LF',
        name: 'Louis Fourier',
        preferences: ['Sk', 'SI', 'Pna'], // Shrinking, Seizure-Inducing, Paranoia (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // From screenshot
        livingLocation: 'Downtown',
        schedule: [{ entryNumber: 1, location: 'Building south of Parking Garage', startTime: '7:00am' }],
    },
    RC: {
        code: 'RC',
        name: 'Randy Caulfield',
        preferences: [], // No preferences (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // From screenshot
        livingLocation: 'Downtown',
        schedule: [{ entryNumber: 1, location: "Randy's Bait & Tackle", startTime: '7:00am' }],
    },
    EB: {
        code: 'EB',
        name: 'Eugene Buckley',
        preferences: ['Szp', 'Tx', 'Cm'], // Schizophrenic, Toxic, Calming (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // From screenshot
        livingLocation: 'Downtown',
        schedule: [
            { entryNumber: 1, location: 'In the building behind Slop Shop', startTime: '7:00am', endTime: '7:25am' },
            { entryNumber: 2, location: 'Hyland Tower 2', startTime: '8:25am', endTime: '12:20pm' },
            { entryNumber: 3, location: 'Supermarket', startTime: '12:50pm', endTime: '1:00pm' },
            { entryNumber: 4, location: 'Sitting at a table behind Hyland Tower', startTime: '1:50pm', endTime: '2:20pm' },
            { entryNumber: 5, location: 'HAM Legal Services', startTime: '2:40pm', endTime: '3:30pm' },
            { entryNumber: 6, location: 'Hyland Tower 2', startTime: '3:40pm', endTime: '6:45pm' },
            { entryNumber: 7, location: 'Standing by central canal, south of the Police Station', startTime: '7:45pm', endTime: '8:05pm' },
            { entryNumber: 8, location: 'In the building behind Slop Shop', startTime: '8:20pm' },
        ],
    },
    GF: {
        code: 'GF',
        name: 'Greg Figgle',
        preferences: ['Epc', 'TT', 'Tx'], // Euphoric, Tropic Thunder, Toxic (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Very Low', // From screenshot
        livingLocation: 'Downtown',
        schedule: [
            { entryNumber: 1, location: 'Building north of Parking Garage', startTime: '7:00am', endTime: '11:00am' },
            { entryNumber: 2, location: 'Liquor Store', startTime: '11:45am', endTime: '12:20pm' },
            { entryNumber: 3, location: 'By the dumpster near the Car Wash business', startTime: '1:30pm', endTime: '2:00pm' },
            { entryNumber: 4, location: 'Building next to Docks Warehouse property', startTime: '2:45pm', endTime: '4:45pm' },
            {
                entryNumber: 5,
                location: 'Teleports to the woods, in front of the big rock with the gnome on it, down the path from the Barn property',
                startTime: '4:50pm',
                endTime: '7:30pm',
            },
            { entryNumber: 6, location: 'Teleports to Slop Shop', startTime: '7:30pm', endTime: '10:00pm' },
            { entryNumber: 7, location: "Bud's Bar", startTime: '11:05pm', endTime: '3:00am' },
            { entryNumber: 8, location: 'Building north of Parking Garage', startTime: '3:35am' },
        ],
    },
    JG: {
        code: 'JG',
        name: 'Jeff Gilmore',
        preferences: ['Sdt', 'LF', 'Lxt'], // Sedating, Long Faced, Laxative (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // From screenshot
        livingLocation: 'Downtown',
        schedule: [
            { entryNumber: 1, location: 'Shred Shack', startTime: '7:00am', endTime: '6:00pm' },
            { entryNumber: 2, location: "ATM next to Bud's Bar", startTime: '6:15pm' },
            { entryNumber: 3, location: 'Sauerkraut Supreme Pizza', startTime: '6:30pm', endTime: '7:00pm' },
            { entryNumber: 4, location: 'Standing outside Sauerkraut Supreme Pizza', startTime: '7:00pm', endTime: '8:00pm' },
            { entryNumber: 5, location: 'Building south of Parking Garage', startTime: '9:00pm' },
        ],
    },
    PW: {
        code: 'PW',
        name: 'Philip Wentworth',
        preferences: ['Rfs', 'Sk', 'Fg'], // Refreshing, Shrinking, Foggy (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // From screenshot
        livingLocation: 'Downtown',
        schedule: [{ entryNumber: 1, location: "Mayor's House (house at the end of the road past the Casino)", startTime: '7:00am' }],
    },

    // Docks Customers
    LG: {
        code: 'LG',
        name: 'Lisa Gardener',
        preferences: ['Lxt', 'Szp', 'AG'], // Laxative, Schizophrenic, Anti-Gravity (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // Moderate (from screenshot)
        livingLocation: 'Docks',
        schedule: [
            {
                entryNumber: 1,
                location: 'In the Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                startTime: '7:00am',
            },
        ],
    },
    AC: {
        code: 'AC',
        name: 'Anna Chesterfield',
        preferences: ['Rfs', 'TT', 'Tx'], // Refreshing, Tropic Thunder, Toxic (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // Moderate (from screenshot)
        livingLocation: 'Docks',
        schedule: [
            { entryNumber: 1, location: 'Barbershop', startTime: '7:00am', endTime: '6:00pm' },
            { entryNumber: 2, location: 'Across the street from the Barbershop', startTime: '6:10pm', endTime: '8:05pm' },
            { entryNumber: 3, location: 'Building to the south of the Parking Garage', startTime: '8:30pm' },
        ],
    },
    GB: {
        code: 'GB',
        name: 'Genghis Barn',
        preferences: ['Elf', 'Grs', 'Al'], // Electrifying, Gingeritis, Athletic (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Very Low', // Very Low (from screenshot)
        livingLocation: 'Docks',
        schedule: [
            {
                entryNumber: 1,
                location:
                    "In the shipping container across the street from the Docks Warehouse property (knock on the side that isn't blocked by crates).",
                startTime: '7:00am',
                endTime: '11:20am',
            },
            { entryNumber: 2, location: 'Standing across the street from Docks Warehouse property', startTime: '11:25am', endTime: '12:10pm' },
            { entryNumber: 3, location: 'Pawn Shop', startTime: '2:10pm', endTime: '2:50pm' },
            { entryNumber: 4, location: 'Back door of Slop Shop', startTime: '3:35pm', endTime: '5:20pm' },
            { entryNumber: 5, location: 'Church', startTime: '6:55pm', endTime: '7:45pm' },
            { entryNumber: 6, location: 'Hyland Medical', startTime: '8:10pm', endTime: '9:30pm' },
            { entryNumber: 7, location: "Across the street from Handy Hank's Hardware by the trees.", startTime: '10:05pm', endTime: '11:50pm' },
            {
                entryNumber: 8,
                location: 'Teleports to the shipping container across the street from the Docks Warehouse property',
                startTime: '11:50pm',
            },
        ],
    },
    CF: {
        code: 'CF',
        name: 'Cranky Frank',
        preferences: ['Lxt', 'Tx', 'TT'], // Laxative, Toxic, Tropic Thunder (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // Moderate (from screenshot)
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
    JP: {
        code: 'JP',
        name: 'Javier Pérez',
        preferences: [], // No preferences (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // Moderate (from screenshot)
        livingLocation: 'Docks',
        schedule: [
            {
                entryNumber: 1,
                location: 'In the Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                startTime: '7:00am',
                endTime: '11:30am',
            },
            { entryNumber: 2, location: 'Teleports to Sauerkraut Supreme Pizza', startTime: '11:30am', endTime: '2:50pm' },
            {
                entryNumber: 3,
                location: 'Teleports outside Hyland Auto, staring at the Cheetah through the window',
                startTime: '2:50pm',
                endTime: '5:30pm',
            },
            { entryNumber: 4, location: 'Central Gas Mart', startTime: '6:05pm' },
        ],
    },
    MB: {
        code: 'MB',
        name: 'Marco Barone',
        preferences: ['Sn', 'LF', 'Rfs'], // Sneaky, Long faced, Refreshing (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // Moderate (from screenshot)
        livingLocation: 'Docks',
        schedule: [
            { entryNumber: 1, location: 'Body Shop', startTime: '7:00am', endTime: '6:05pm' },
            { entryNumber: 2, location: 'ATM in front of Central Gas Mart', startTime: '6:15pm' },
            { entryNumber: 3, location: 'Supermarket', startTime: '7:00pm', endTime: '7:45pm' },
            { entryNumber: 4, location: 'Standing outside Casino', startTime: '8:10pm', endTime: '9:00pm' },
            { entryNumber: 5, location: "In building next to Jane the dealer's travel trailer", startTime: '10:55pm' },
        ],
    },
    MW: {
        code: 'MW',
        name: 'Melissa Wood',
        preferences: ['AG', 'Rfs', 'Slp'], // Anti-Gravity, Refreshing, Slippery (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // Moderate (from screenshot)
        livingLocation: 'Docks',
        schedule: [
            { entryNumber: 1, location: "Mayor's House (house at the end of the road past the Casino)", startTime: '7:00am', endTime: '9:20am' },
            { entryNumber: 2, location: 'Teleports somewhere', startTime: '9:20am' },
            { entryNumber: 3, location: 'Teleports to the house next to the Bungalow property', startTime: '10:55am', endTime: '1:00pm' },
            { entryNumber: 4, location: 'Casino', startTime: '3:30pm' },
        ],
    },
    MC2: {
        code: 'MC2',
        name: 'Mac Cooper',
        preferences: ['Fcd', 'Sc', 'LF'], // Focused, Spicy, Long faced (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // Moderate (from screenshot)
        livingLocation: 'Docks',
        schedule: [
            { entryNumber: 1, location: 'Building next to Docks Warehouse property', startTime: '7:00am', endTime: '7:50am' },
            { entryNumber: 2, location: 'The Butter Box', startTime: '9:50am', endTime: '10:00am' },
            { entryNumber: 3, location: 'Teleports back to building next to Docks Warehouse property', startTime: '10:00am', endTime: '2:30pm' },
            { entryNumber: 4, location: 'Bus stop near Docks Warehouse property', startTime: '2:50pm', endTime: '4:20pm' },
            { entryNumber: 5, location: 'Yellow house in Suburbia', startTime: '6:45pm', endTime: '7:00pm' },
            { entryNumber: 6, location: 'Teleports back to building next to Docks Warehouse property', startTime: '7:00pm' },
        ],
    },
    BK: {
        code: 'BK',
        name: 'Billy Kramer',
        preferences: ['Sc', 'Szp', 'LF'], // Spicy, Schizophrenic, Long faced (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'Moderate', // Moderate (from screenshot)
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

    // Suburbia Customers
    CS: {
        code: 'CS',
        name: 'Chris Sullivan',
        preferences: ['Sn', 'Epc', 'Elf'], // Sneaky, Euphoric, Electrifying (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
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
            { entryNumber: 4, location: 'Teleports to Hyland Bank', startTime: '12:40pm', endTime: '6:40pm' },
            { entryNumber: 5, location: 'Standing behind Hyland Tower', startTime: '7:10pm', endTime: '8:00pm' },
            { entryNumber: 6, location: 'Hyland Bank', startTime: '8:30pm', endTime: '11:00pm' },
            { entryNumber: 7, location: 'Teleports somewhere', startTime: '11:00pm' },
        ],
    },
    HS: {
        code: 'HS',
        name: 'Hank Stevenson',
        preferences: ['Sn', 'Tx', 'Szp'], // Sneaky, Toxic, Schizophrenic (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Suburbia',
        schedule: [
            { entryNumber: 1, location: "Handy Hank's Hardware", startTime: '7:00am', endTime: '8:00pm' },
            { entryNumber: 2, location: "Drives the blue car in the parking lot of Handy Hank's", startTime: '8:00pm' },
            { entryNumber: 3, location: 'White house at the end of the road in Suburbia', startTime: '9:40pm' },
        ],
    },
    KK: {
        code: 'KK',
        name: 'Karen Kennedy',
        preferences: [], // No preferences (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Suburbia',
        schedule: [{ entryNumber: 1, location: 'On a bench in Suburbia Park', startTime: '7:00am' }],
    },
    AK: {
        code: 'AK',
        name: 'Alison Knight',
        preferences: [], // No preferences (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
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
    JW2: {
        code: 'JW2',
        name: 'Jeremy Wilkinson',
        preferences: ['Bd', 'Slp', 'CD'], // Balding, Slippery, Calorie Dense (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Suburbia',
        schedule: [
            { entryNumber: 1, location: 'Hyland Auto', startTime: '7:00am', endTime: '6:00pm' },
            { entryNumber: 2, location: 'Green car behind the Post Office business', startTime: '6:20pm' },
            { entryNumber: 3, location: 'Brown house in Suburbia', startTime: '7:20pm' },
        ],
    },
    CB2: {
        code: 'CB2',
        name: 'Carl Bundy',
        preferences: ['Gw', 'Al', 'Dor'], // Glowing, Athletic, Disorienting (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Suburbia',
        schedule: [
            { entryNumber: 1, location: 'White house with white door in Suburbia', startTime: '7:00am', endTime: '11:00am' },
            { entryNumber: 2, location: 'Behind the bus stop near the Docks Warehouse property', startTime: '12:30pm', endTime: '3:00pm' },
            { entryNumber: 3, location: 'ATM in front of Supermarket', startTime: '4:40pm' },
            { entryNumber: 4, location: 'The Crimson Canary', startTime: '4:55pm' },
        ],
    },
    JS: {
        code: 'JS',
        name: 'Jackie Stevenson',
        preferences: [], // No preferences (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Suburbia',
        schedule: [
            { entryNumber: 1, location: 'The Butter Box', startTime: '7:00am', endTime: '4:30pm' },
            { entryNumber: 2, location: 'Northeast of the Central Gas Mart, by the canal, talking to Pearl', startTime: '5:00pm', endTime: '6:00pm' },
            { entryNumber: 3, location: 'White car in the parking lot behind Les Ordures Puantes', startTime: '7:00pm' },
            { entryNumber: 4, location: 'White house at the end of the road in Suburbia', startTime: '8:30pm' },
        ],
    },
    HC: {
        code: 'HC',
        name: 'Harold Colt',
        preferences: ['Fg', 'Sc', 'Jrs'], // Foggy, Spicy, Jennerising (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Suburbia',
        schedule: [
            { entryNumber: 1, location: 'By the water across the street from Les Ordures Puantes', startTime: '7:00am', endTime: '8:45am' },
            { entryNumber: 2, location: 'Hyland Tower 2', startTime: '9:40am', endTime: '12:00pm' },
            { entryNumber: 3, location: 'Church', startTime: '12:40pm', endTime: '1:50pm' },
            { entryNumber: 4, location: 'Hyland Tower 2', startTime: '2:30pm', endTime: '5:05pm' },
            { entryNumber: 5, location: 'In front of Town Hall, talking to Tobas', startTime: '5:35pm', endTime: '6:30pm' },
            { entryNumber: 6, location: 'Hyland Tower 2', startTime: '7:00pm', endTime: '9:20pm' },
            { entryNumber: 7, location: 'White car in Parking Garage', startTime: '10:40pm' },
            { entryNumber: 8, location: 'Yellow house in Suburbia', startTime: '12:15am' },
        ],
    },
    JK: {
        code: 'JK',
        name: 'Jack Knight',
        preferences: ['Sk', 'TP', 'Lt'], // Shrinking, Thought-Provoking, Lethal (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Suburbia',
        schedule: [
            { entryNumber: 1, location: 'White house with couch on front porch in Suburbia', startTime: '7:00am', endTime: '10:00am' },
            { entryNumber: 2, location: 'At the gazebo in Suburbia Park', startTime: '10:35am', endTime: '12:15pm' },
            { entryNumber: 3, location: 'Teleports to Hyland Medical', startTime: '12:15pm', endTime: '3:30pm' },
            { entryNumber: 4, location: 'Standing next to Hyland Medical', startTime: '3:40pm', endTime: '4:20pm' },
            { entryNumber: 5, location: 'Teleports to Pill-Ville Pharmacy', startTime: '4:20pm', endTime: '6:45pm' },
            { entryNumber: 6, location: 'Teleports to white house with couch on front porch in Suburbia', startTime: '6:45pm' },
        ],
    },
    DK: {
        code: 'DK',
        name: 'Dennis Kennedy',
        preferences: ['Al', 'Fcd', 'BE'], // Athletic, Focused, Bright-eyed (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Suburbia',
        schedule: [
            { entryNumber: 1, location: 'Fire Station', startTime: '7:00am', endTime: '11:40am' },
            { entryNumber: 2, location: 'Town Hall', startTime: '12:15pm', endTime: '12:45pm' },
            { entryNumber: 3, location: "Bench across the street from Bleuball's Boutique", startTime: '1:15pm', endTime: '1:50pm' },
            { entryNumber: 4, location: 'Fire Station', startTime: '2:20pm', endTime: '6:00pm' },
            { entryNumber: 5, location: 'Slop Shop (back door)', startTime: '7:15pm', endTime: '7:25pm' },
            { entryNumber: 6, location: 'Dark grey house in Suburbia', startTime: '9:30pm' },
        ],
    },

    // Uptown Customers
    LT: {
        code: 'LT',
        name: 'Lily Turner',
        preferences: [], // No preferences (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Uptown',
        schedule: [
            { entryNumber: 1, location: 'By the fountain in front of Town Hall', startTime: '7:00am', endTime: '7:50am' },
            { entryNumber: 2, location: 'Outside The Butter Box', startTime: '8:10am', endTime: '8:40am' },
            { entryNumber: 3, location: 'The Butter Box', startTime: '8:50am', endTime: '4:00pm' },
            { entryNumber: 4, location: 'Hyland Bank', startTime: '4:35pm', endTime: '5:30pm' },
            { entryNumber: 5, location: 'By the fountain in front of Town Hall', startTime: '6:00pm', endTime: '8:30pm' },
            { entryNumber: 6, location: 'Blue building across from the Church', startTime: '9:45pm' },
        ],
    },
    FH: {
        code: 'FH',
        name: 'Fiona Hancock',
        preferences: ['Lt', 'TP', 'TT'], // Lethal, Thought-Provoking, Tropic Thunder (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Uptown',
        schedule: [
            { entryNumber: 1, location: 'Thrifty Threads', startTime: '7:00am', endTime: '6:00pm' },
            { entryNumber: 2, location: 'ATM in front of Thrifty Threads', startTime: '6:10pm' },
            { entryNumber: 3, location: 'Blue building across from the Church', startTime: '8:15pm' },
        ],
    },
    RH: {
        code: 'RH',
        name: 'Ray Hoffman',
        preferences: [], // No preferences (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Uptown',
        schedule: [{ entryNumber: 1, location: "Ray's Real Estate", startTime: '7:00am' }],
    },
    JH: {
        code: 'JH',
        name: 'Jen Heard',
        preferences: ['Dor', 'Egz', 'Sn'], // Disorienting, Energizing, Sneaky (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Uptown',
        schedule: [
            { entryNumber: 1, location: 'Blue building across from the Church', startTime: '7:00am', endTime: '7:30am' },
            { entryNumber: 2, location: "Cuke machine outside Handy Hank's Hardware", startTime: '8:30am' },
            { entryNumber: 3, location: "Across the street from Bleuball's Boutique", startTime: '9:00am' },
            { entryNumber: 4, location: 'Town Hall', startTime: '9:30am', endTime: '2:30pm' },
            { entryNumber: 5, location: 'Post Office', startTime: '2:50pm', endTime: '3:20pm' },
            { entryNumber: 6, location: 'Town Hall', startTime: '3:40pm', endTime: '6:00pm' },
            { entryNumber: 7, location: 'Blue building across from the Church', startTime: '7:10pm' },
        ],
    },
    WC: {
        code: 'WC',
        name: 'Walter Cussler',
        preferences: ['Szp', 'Cm', 'Bd'], // Schizophrenic, Calming, Balding (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Uptown',
        schedule: [
            { entryNumber: 1, location: 'Church', startTime: '7:00am', endTime: '10:30am' },
            {
                entryNumber: 2,
                location: 'Can be at The Butter Box, but sometimes he walks down to Hyland Tower 1, then turns around',
                startTime: '11:20am',
            },
            { entryNumber: 3, location: 'Stands by the parking lot across from the Church', startTime: '12:05pm', endTime: '1:00pm' },
            { entryNumber: 4, location: 'Gets in red sh*tbox in parking lot', startTime: '1:05pm' },
            { entryNumber: 5, location: 'Parking lot in Westville by the west park statue', startTime: '2:30pm' },
            { entryNumber: 6, location: 'Community Center', startTime: '3:20pm', endTime: '4:10pm' },
            { entryNumber: 7, location: 'Gets in red sh*tbox in parking lot by west park statue', startTime: '4:30pm' },
            { entryNumber: 8, location: 'Parking lot across from the Church', startTime: '6:25pm' },
            { entryNumber: 9, location: 'Church', startTime: '6:40pm' },
        ],
    },
    HB: {
        code: 'HB',
        name: 'Herbert Bleuball',
        preferences: ['Slp', 'Fg', 'Eps'], // Slippery, Foggy, Explosive (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Uptown',
        schedule: [
            { entryNumber: 1, location: "Bleuball's Boutique", startTime: '7:00am', endTime: '6:00pm' },
            { entryNumber: 2, location: 'Standing in front of Fire Station', startTime: '6:45pm', endTime: '7:20pm' },
            { entryNumber: 3, location: 'Hyland Bank', startTime: '7:30pm', endTime: '7:55pm' },
            { entryNumber: 4, location: 'Blue building across from the Church', startTime: '8:35pm' },
        ],
    },
    MB2: {
        code: 'MB2',
        name: 'Michael Boog',
        preferences: ['Jrs', 'Cm', 'Szp'], // Jennerising, Calming, Schizophrenic (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Uptown',
        schedule: [
            {
                entryNumber: 1,
                location: 'Expensive house on the hill at the end of the street from the Church',
                startTime: '7:00am',
                endTime: '8:20am',
            },
            { entryNumber: 2, location: 'Back of the house by the pool', startTime: '8:50am', endTime: '9:30am' },
            { entryNumber: 3, location: 'In the red-orange Cheetah in the driveway', startTime: '10:00am' },
            { entryNumber: 4, location: 'Parking lot behind Les Ordures Puantes', startTime: '10:50am' },
            { entryNumber: 5, location: 'Supermarket', startTime: '11:30am', endTime: '1:40pm' },
            { entryNumber: 6, location: 'HAM Legal Services', startTime: '2:20pm', endTime: '3:30pm' },
            { entryNumber: 7, location: 'In the Red-orange Cheetah behind Les Ordures Puantes', startTime: '4:05pm' },
            { entryNumber: 8, location: 'Parking lot behind post office', startTime: '4:30pm' },
            { entryNumber: 9, location: "Bleuball's Boutique", startTime: '4:50pm', endTime: '5:40pm' },
            { entryNumber: 10, location: 'Red-orange Cheetah behind post office', startTime: '6:05pm' },
            { entryNumber: 11, location: 'Expensive house on the hill at the end of the street from the Church', startTime: '7:30pm' },
        ],
    },
    TW: {
        code: 'TW',
        name: 'Tobas Wentworth',
        preferences: ['Lt', 'Dor', 'Sc'], // Lethal, Disorienting, Spicy (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Uptown',
        schedule: [{ entryNumber: 1, location: "Mayor's House (house at the end of the road past the Casino)", startTime: '7:00am' }],
    },
    PM2: {
        code: 'PM2',
        name: 'Pearl Moore',
        preferences: ['Szp', 'Grs', 'Eps'], // Schizophrenic, Gingeritis, Explosive (from screenshot)
        spendingLevel: 'Unknown',
        qualityStandard: 'High', // High (from screenshot)
        livingLocation: 'Uptown',
        schedule: [
            { entryNumber: 1, location: 'Church', startTime: '7:00am', endTime: '7:30am' },
            { entryNumber: 2, location: 'Bus stop next to Church', startTime: '7:40am', endTime: '9:05am' },
            { entryNumber: 3, location: 'Hyland Medical', startTime: '9:30am', endTime: '11:10am' },
            { entryNumber: 4, location: 'Courthouse', startTime: '11:50am', endTime: '1:20pm' },
            { entryNumber: 5, location: 'ATM in front of Central Gas Mart', startTime: '2:25pm' },
            { entryNumber: 6, location: 'Post Office', startTime: '2:55pm', endTime: '4:30pm' },
            {
                entryNumber: 7,
                location: 'Northeast of the Central Gas Mart, by the canal, talking to Jackie',
                startTime: '4:55pm',
                endTime: '6:00pm',
            },
            { entryNumber: 8, location: 'Church', startTime: '7:30pm' },
        ],
    },
} as const;

// Derive the CustomerCode type from the keys of the customers object
export type CustomerCode = keyof typeof customers;

// Helper function to get customers by preference
export function getCustomersByPreference(effectCode: EffectCode) {
    return Object.values(customers).filter((customer) => {
        return (customer.preferences as readonly EffectCode[]).includes(effectCode);
    });
}

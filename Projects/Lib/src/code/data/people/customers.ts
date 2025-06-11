import { District } from '@/code/types/consts/districts';
import type { Customer } from '@/code/types/people/Customer';
import { findEffectByNameOrThrow } from '@/code/utils/effects/effectUtils';

/**
 * Customers data - single source of truth
 * All customer types and properties are inferred from this data
 */
export const customers: readonly Customer[] = [
    // Northtown
    {
        name: 'Kyle Cooley',
        code: 'KC',
        district: District.Northtown,
        schedule: [
            {
                location: 'Across the street from the back staff entrance of Taco Ticklers',
                start: '7:00am',
                end: '7:10am',
            },
            { location: 'Taco Ticklers counter', start: '7:30am', end: '12:30pm' },
            { location: 'Bench by Skatepark', start: '12:40pm', end: '1:30pm' },
            { location: 'Taco Ticklers counter', start: '1:40pm', end: '10:00pm' },
            {
                location: 'Teleports to the yellow house with the yellow sh*tbox in front in Westville',
                start: '10:00pm',
                end: null,
            },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Calming'),

            findEffectByNameOrThrow('Munchies'),

            findEffectByNameOrThrow('Smelly'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Austin Steiner',
        code: 'AS',
        district: District.Northtown,
        schedule: [
            { location: 'Yellow house with the yellow sh*tbox in front in Westville', start: '7:00am', end: '7:30am' },
            { location: 'Community Center', start: '8:20am', end: '10:30am' },
            { location: 'Bench behind building', start: '10:50am', end: '11:30am' },
            { location: 'Inside Taco Ticklers', start: '12:30pm', end: '1:40pm' },
            { location: 'Arcade', start: '3:00pm', end: '6:00pm' },
            { location: 'Stands just outside Arcade', start: '6:00pm', end: '6:45pm' },
            { location: 'Arcade', start: '6:45pm', end: '11:00pm' },
            { location: 'Yellow house with the yellow sh*tbox in front in Westville', start: '11:50pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Calorie-Dense'),

            findEffectByNameOrThrow('Euphoric'),

            findEffectByNameOrThrow('Munchies'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Jessi Waters',
        code: 'JW',
        district: District.Northtown,
        schedule: [
            { location: 'Motel Room #5', start: '7:00am', end: '11:00am' },
            { location: 'In front of Taco Ticklers', start: '11:30am', end: '12:30pm' },
            { location: 'Gets a Cuke across the street from Slop Shop', start: '12:50pm', end: null },
            { location: 'In the alley behind Hyland Bank', start: '1:30pm', end: '4:00pm' },
            { location: 'Teleports to the bench where central canal meets the water', start: '4:00pm', end: '7:00pm' },
            { location: 'In front of the Docks Warehouse property', start: '7:30pm', end: '9:00pm' },
            { location: 'Motel Room #5', start: '11:00pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Energizing'),

            findEffectByNameOrThrow('Paranoia'),

            findEffectByNameOrThrow('Sneaky'),
        ],
        expectedQuality: 'Very Low',
        spend: null,
    },
    {
        name: 'Kathy Henderson',
        code: 'KH',
        district: District.Northtown,
        schedule: [
            { location: 'Westville Apartment Building, Unit #2', start: '7:00am', end: '7:30am' },
            { location: 'Community Center', start: '7:50am', end: '8:10am' },
            { location: 'By the water in southern Westville', start: '8:50am', end: '9:20am' },
            { location: 'Community Center', start: '10:00am', end: '1:20pm' },
            { location: 'Western Gas Mart', start: '1:50pm', end: '2:30pm' },
            { location: 'Cuke machine outside Top Tattoo', start: '2:50pm', end: null },
            { location: 'Sitting on bench next to statue in west park', start: '3:15pm', end: '4:00pm' },
            { location: 'Community Center', start: '4:40pm', end: '6:30pm' },
            { location: 'Westville Apartment Building, Unit #2', start: '6:50pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Athletic'),

            findEffectByNameOrThrow('Energizing'),

            findEffectByNameOrThrow('Focused'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Mick Lubbin',
        code: 'ML',
        district: District.Northtown,
        schedule: [
            { location: 'Pawn Shop', start: '7:00am', end: '6:00pm' },
            { location: 'Red Pickup Truck in the Taco Ticklers parking lot', start: '6:45pm', end: '7:15pm' },
            { location: 'Sauerkraut Supreme Pizza parking lot in truck', start: '7:15pm', end: '7:30pm' },
            { location: "Bud's Bar", start: '7:30pm', end: '10:30pm' },
            { location: 'Red pickup truck in Sauerkraut Supreme Pizza parking lot', start: '10:45pm', end: '11:40pm' },
            { location: 'House behind Westville Gas Mart', start: '11:40pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Euphoric'),

            findEffectByNameOrThrow('Bright-Eyed'),

            findEffectByNameOrThrow('Sneaky'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Sam Thompson',
        code: 'ST',
        district: District.Northtown,
        schedule: [
            { location: 'Light blue house in Suburbia', start: '7:00am', end: '9:00am' },
            { location: 'Drives an orange Cheetah', start: '9:00am', end: '10:30am' },
            { location: 'Outside Thompson Construction & Demo in car', start: '10:30am', end: '10:45am' },
            { location: 'Cuke machine in front of Motel Office', start: '10:45am', end: '11:10am' },
            {
                location: 'In front of Thompson Construction & Demo, next to Cash for Trash machine',
                start: '11:10am',
                end: '11:50am',
            },
            { location: 'Inside Thompson Construction & Demo', start: '11:50am', end: '4:30pm' },
            { location: 'In front of Skatepark with Donna', start: '4:30pm', end: '6:00pm' },
            { location: 'At ATM next to parking garage', start: '6:30pm', end: '7:10pm' },
            { location: 'Supermarket', start: '7:10pm', end: '8:40pm' },
            {
                location: 'Gets into orange Cheetah in front of Thompson Construction & Demo',
                start: '9:50pm',
                end: '11:15pm',
            },
            { location: 'Drives back to light blue house in Suburbia', start: '11:15pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Munchies'),

            findEffectByNameOrThrow('Athletic'),

            findEffectByNameOrThrow('Smelly'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Peter File',
        code: 'PF',
        district: District.Northtown,
        schedule: [
            { location: 'Motel Room #3', start: '7:00am', end: '9:15am' },
            { location: 'Westville Gas Mart', start: '10:10am', end: '10:30am' },
            { location: 'Statue in west park', start: '11:00am', end: '11:15am' },
            { location: 'Cuke machine in front of Top Tattoo', start: '11:40am', end: '12:50pm' },
            { location: 'Outside southwest corner of Warehouse', start: '12:50pm', end: '1:30pm' },
            { location: 'Inside Taco Ticklers', start: '2:20pm', end: '2:30pm' },
            { location: 'Thrifty Threads', start: '3:20pm', end: '4:00pm' },
            { location: 'ATM next to Parking Garage', start: '4:40pm', end: '5:40pm' },
            { location: 'Sauerkraut Supreme Pizza', start: '5:40pm', end: '7:15pm' },
            { location: 'Bench outside Hyland Range', start: '7:35pm', end: '8:45pm' },
            { location: 'Motel Room #3', start: '9:30pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Focused'),

            findEffectByNameOrThrow('Refreshing'),

            findEffectByNameOrThrow('Sneaky'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Donna Martin',
        code: 'DM',
        district: District.Northtown,
        schedule: [
            { location: 'Motel Office', start: '7:00am', end: '9:15am' },
            { location: 'Westville Gas Mart', start: '10:00am', end: '10:30am' },
            { location: 'Barbershop', start: '11:40am', end: '12:00pm' },
            { location: 'Motel Office', start: '12:45pm', end: '4:30pm' },
            { location: 'In front of Skatepark with Sam', start: '4:45pm', end: '6:00pm' },
            { location: 'On West Bridge', start: '6:40pm', end: '8:00pm' },
            { location: 'Motel Office', start: '8:30pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Refreshing'),

            findEffectByNameOrThrow('Lethal'),

            findEffectByNameOrThrow('Munchies'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Geraldine Poon',
        code: 'GP',
        district: District.Northtown,
        schedule: [
            {
                location: 'Pink building at the north end of the street by the water in Northtown',
                start: '7:00am',
                end: '9:00am',
            },
            { location: 'Standing outside the pink building', start: '9:00am', end: '10:00am' },
            {
                location: 'Sitting at the table behind the building to the rear of the basketball court.',
                start: '10:30am',
                end: '11:30am',
            },
            {
                location: 'The shed on the west side of the northern bridge to Westville.',
                start: '12:30pm',
                end: '3:45pm',
            },
            { location: 'West construction site with Jerry', start: '4:15pm', end: '5:30pm' },
            {
                location: 'Sitting by the fire barrel in the encampment next to the western Gas Mart',
                start: '6:00pm',
                end: '7:50pm',
            },
            { location: 'Teleports back to the pink building', start: '7:50pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Balding'),

            findEffectByNameOrThrow('Long Faced'),

            findEffectByNameOrThrow('Sedating'),
        ],
        expectedQuality: 'Very Low',
        spend: null,
    },
    {
        name: 'Chloe Bowers',
        code: 'CB',
        district: District.Northtown,
        schedule: [
            { location: 'Westville Gas Mart', start: '7:00am', end: '6:00pm' },
            { location: 'Bus stop in front of Gas Mart', start: '6:30pm', end: '7:30pm' },
            { location: 'Building south of the Parking Garage', start: '8:50pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Euphoric'),

            findEffectByNameOrThrow('Shrinking'),

            findEffectByNameOrThrow('Munchies'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Peggy Myers',
        code: 'PM',
        district: District.Northtown,
        schedule: [
            { location: 'Building behind basketball court', start: '7:00am', end: '8:45am' },
            { location: 'Cuke machine in front of Arcade', start: '9:10am', end: '9:20am' },
            { location: 'Pill-Ville Pharmacy', start: '9:20am', end: '9:30am' },
            { location: 'Slop Shop', start: '10:50am', end: '1:30pm' },
            { location: 'Barbershop', start: '1:50pm', end: '3:30pm' },
            { location: 'Standing outside Barbershop on her phone', start: '3:30pm', end: '5:00pm' },
            { location: 'Slop Shop', start: '5:20pm', end: '8:50pm' },
            { location: 'Teleports back to building behind the basketball court', start: '8:50pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Bright-Eyed'),

            findEffectByNameOrThrow('Refreshing'),

            findEffectByNameOrThrow('Energizing'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Ludwig Meyer',
        code: 'LM',
        district: District.Northtown,
        schedule: [
            { location: 'Building behind Slop Shop', start: '7:00am', end: '7:30am' },
            { location: 'ATM next to parking garage', start: '7:45am', end: '8:40am' },
            { location: 'Sauerkraut Supreme Pizza', start: '8:40am', end: '12:50pm' },
            { location: 'Bench outside Sauerkraut Supreme Pizza', start: '12:50pm', end: '2:50pm' },
            { location: 'Sauerkraut Supreme Pizza', start: '2:50pm', end: '9:00pm' },
            { location: 'Building behind Slop Shop', start: '9:00pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Euphoric'),

            findEffectByNameOrThrow('Refreshing'),

            findEffectByNameOrThrow('Energizing'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Beth Penn',
        code: 'BP',
        district: District.Northtown,
        schedule: [
            { location: 'Bus stop in front of Motel Office', start: '7:00am', end: '7:50am' },
            { location: 'Hyland Tower 2', start: '9:20am', end: '12:40pm' },
            { location: 'In front of Parking Garage', start: '1:50pm', end: '2:50pm' },
            { location: 'Hyland Tower 2', start: '4:00pm', end: '4:50pm' },
            { location: 'ATM in front of Thrifty Threads', start: '6:15pm', end: '6:45pm' },
            { location: 'Outside the southeast corner of the Warehouse', start: '6:45pm', end: '7:20pm' },
            { location: 'Motel Room #4', start: '8:25pm', end: null },
        ],
        preferredEffects: [],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Mrs. Ming',
        code: 'MM',
        district: District.Northtown,
        schedule: [{ location: 'Chinese Restaurant', start: '7:00am', end: null }],
        preferredEffects: [
            findEffectByNameOrThrow('Gingeritis'),

            findEffectByNameOrThrow('Shrinking'),

            findEffectByNameOrThrow('Electrifying'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },

    // Westville
    {
        name: 'Trent Sherman',
        code: 'TS',
        district: District.Westville,
        schedule: [
            { location: 'At the blue house by the water in Westville', start: '7:00am', end: '8:00am' },
            { location: 'At the Cuke machine near Top Tattoo', start: '8:40am', end: null },
            { location: 'Pawn Shop', start: '9:30am', end: '10:00am' },
            { location: 'Standing at the ledge above Hyland Range', start: '11:10am', end: '12:30pm' },
            {
                location:
                    'In the Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                start: '2:30pm',
                end: '4:30pm',
            },
            {
                location: 'Standing on the bridge over the central canal near the water',
                start: '5:20pm',
                end: '6:30pm',
            },
            { location: 'Liquor Store', start: '7:15pm', end: '8:30pm' },
            { location: 'At the blue house by the water in Westville', start: '9:50pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Athletic'),

            findEffectByNameOrThrow('Balding'),

            findEffectByNameOrThrow('Calorie-Dense'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Meg Cooley',
        code: 'MC',
        district: District.Westville,
        schedule: [
            { location: 'Central Gas Mart', start: '7:00am', end: '6:00pm' },
            { location: 'Bus stop across the street from Car Wash business', start: '6:45pm', end: '7:15pm' },
            { location: 'Cuke machine outside of Top Tattoo', start: '9:10pm', end: null },
            { location: 'Yellow house with the yellow sh*tbox in front in Westville', start: '9:50pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Sneaky'),

            findEffectByNameOrThrow('Slippery'),

            findEffectByNameOrThrow('Thought-Provoking'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Joyce Ball',
        code: 'JB',
        district: District.Westville,
        schedule: [
            {
                location: 'In the travel trailer in the encampment next to the western Gas Mart',
                start: '7:00am',
                end: '9:20am',
            },
            { location: 'Standing outside the travel trailer', start: '9:25am', end: '10:30am' },
            { location: 'Inside Top Tattoo', start: '11:05am', end: '11:30am' },
            { location: 'On a bench in front of Thompson Construction & Demo', start: '12:55pm', end: '2:00pm' },
            { location: 'Supermarket', start: '3:00pm', end: '4:30pm' },
            { location: 'Standing behind Slop Shop', start: '5:00pm', end: '7:00pm' },
            {
                location: 'In the travel trailer in the encampment next to the western Gas Mart',
                start: '8:10pm',
                end: null,
            },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Euphoric'),

            findEffectByNameOrThrow('Thought-Provoking'),

            findEffectByNameOrThrow('Calorie-Dense'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Keith Wagner',
        code: 'KW',
        district: District.Westville,
        schedule: [
            { location: 'Westville Apartment Building, Unit #4', start: '7:00am', end: '8:40am' },
            { location: 'Standing by the water in southern Westville', start: '9:30am', end: '10:30am' },
            { location: 'Standing next to west Gas Mart', start: '11:15am', end: '12:00pm' },
            { location: 'Inside Taco Ticklers', start: '1:15pm', end: '3:00pm' },
            { location: 'Liquor Store', start: '3:20pm', end: '4:00pm' },
            { location: 'Standing behind Community Center', start: '5:10pm', end: '8:00pm' },
            { location: 'Westville Apartment Building, Unit #4', start: '8:40pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Slippery'),

            findEffectByNameOrThrow('Sneaky'),

            findEffectByNameOrThrow('Tropic Thunder'),
        ],
        expectedQuality: 'Very Low',
        spend: null,
    },
    {
        name: 'Doris Lubbin',
        code: 'DL',
        district: District.Westville,
        schedule: [
            { location: 'House behind west Gas Mart', start: '7:00am', end: '7:10am' },
            { location: 'Behind Thrifty Threads', start: '8:50am', end: '10:00am' },
            { location: 'Inside Thrifty Threads', start: '10:15am', end: '1:50pm' },
            { location: 'Pawn Shop', start: '2:40pm', end: '3:15pm' },
            { location: 'Community Center', start: '4:40pm', end: '6:15pm' },
            { location: 'House behind west Gas Mart', start: '6:50pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Spicy'),

            findEffectByNameOrThrow('Tropic Thunder'),

            findEffectByNameOrThrow('Balding'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Jerry Montero',
        code: 'JM',
        district: District.Westville,
        schedule: [
            { location: 'In the tent in the encampment next to the western Gas Mart', start: '7:00am', end: '9:50am' },
            { location: 'Cuke machine near Top Tattoo', start: '10:15am', end: null },
            {
                location: 'Sitting at the fire barrel at the encampment next to the western Gas Mart',
                start: '10:40am',
                end: '12:20pm',
            },
            { location: 'Community Center', start: '1:20pm', end: '3:45pm' },
            { location: 'At the west construction site, talking to Geraldine', start: '4:10pm', end: '5:30pm' },
            { location: 'Outside southwest corner of Warehouse', start: '6:45pm', end: '9:20pm' },
            {
                location: 'Sitting at the fire barrel at the encampment next to the western Gas Mart',
                start: '9:55pm',
                end: '3:00am',
            },
            { location: 'In the tent in the encampment next to the western Gas Mart', start: '3:05am', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Gingeritis'),

            findEffectByNameOrThrow('Smelly'),

            findEffectByNameOrThrow('Thought-Provoking'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Kim Delaney',
        code: 'KD',
        district: District.Westville,
        schedule: [
            { location: 'Building behind basketball court', start: '7:00am', end: '8:45am' },
            { location: 'Standing at the end of the road by the water in Northtown', start: '9:30am', end: '10:30am' },
            { location: 'Liquor Store', start: '12:00pm', end: '11:00pm' },
            { location: 'Slop Shop', start: '11:30pm', end: '12:00am' },
            { location: 'Teleports to building behind basketball court', start: '12:00am', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Shrinking'),

            findEffectByNameOrThrow('Jennerising'),

            findEffectByNameOrThrow('Focused'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Dean Webster',
        code: 'DW',
        district: District.Westville,
        schedule: [
            { location: 'Top Tattoo', start: '7:00am', end: '6:00pm' },
            { location: 'Standing outside Top Tattoo', start: '6:05pm', end: '8:00pm' },
            { location: 'House next to Bungalow property', start: '9:20pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Glowing'),

            findEffectByNameOrThrow('Laxative'),

            findEffectByNameOrThrow('Spicy'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'Charles Rowland',
        code: 'CR',
        district: District.Westville,
        schedule: [
            { location: 'Yellow house with blue pickup truck in Westville', start: '7:00am', end: '1:00pm' },
            { location: 'Liquor Store', start: '2:25pm', end: '3:00pm' },
            { location: 'Bus stop near Motel Office', start: '3:20pm', end: '5:10pm' },
            { location: 'West Gas Mart', start: '6:00pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Sedating'),

            findEffectByNameOrThrow('Disorienting'),

            findEffectByNameOrThrow('Foggy'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },
    {
        name: 'George Greene',
        code: 'GG',
        district: District.Westville,
        schedule: [
            { location: 'Gray house two down from the Bungalow property', start: '7:00am', end: '8:00am' },
            { location: 'In front of the west construction site by the pay phone', start: '8:30am', end: '9:15am' },
            { location: 'ATM in front of west Gas Mart', start: '9:40am', end: null },
            { location: 'Supermarket', start: '11:15am', end: '11:30am' },
            {
                location: 'Standing on the southeast corner of Thompson Construction & Demo',
                start: '12:25pm',
                end: '12:45pm',
            },
            { location: 'On a bench in front of Shred Shack', start: '1:15pm', end: '3:00pm' },
            { location: "Bud's Bar", start: '3:05pm', end: '2:00am' },
            { location: 'Gray house two down from the Bungalow property', start: '3:30am', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Energizing'),

            findEffectByNameOrThrow('Focused'),

            findEffectByNameOrThrow('Thought-Provoking'),
        ],
        expectedQuality: 'Low',
        spend: null,
    },

    // Downtown
    {
        name: 'Elizabeth Homley',
        code: 'EH',
        district: District.Downtown,
        schedule: [
            { location: 'Building behind Slop Shop', start: '7:00am', end: '10:50am' },
            { location: 'Slop Shop', start: '11:00am', end: '12:05pm' },
            { location: 'Standing between Hyland Police Station and Slop Shop', start: '12:20pm', end: '1:00pm' },
            { location: 'Central Gas Mart', start: '1:50pm', end: '2:20pm' },
            {
                location: 'Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                start: '3:20pm',
                end: '5:50pm',
            },
            { location: "On the bench across from Randy's Bait & Tackle", start: '6:25pm', end: '7:15pm' },
            { location: 'Grey Docks Building', start: '7:50pm', end: '10:00pm' },
            { location: 'Teleports to building behind Slop Shop', start: '10:00pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Sedating'),

            findEffectByNameOrThrow('Tropic Thunder'),

            findEffectByNameOrThrow('Toxic'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Jennifer Rivera',
        code: 'JR',
        district: District.Downtown,
        schedule: [
            { location: 'In the building behind Slop Shop', start: '7:00am', end: '10:45am' },
            { location: "Bleuball's Boutique", start: '12:00pm', end: '12:50pm' },
            { location: 'Walks near central canal, then turns around.', start: '1:55pm', end: null },
            { location: 'Sitting at a table behind Hyland Tower', start: '2:50pm', end: '3:30pm' },
            { location: 'Casino', start: '4:15pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Shrinking'),

            findEffectByNameOrThrow('Slippery'),

            findEffectByNameOrThrow('Toxic'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Kevin Oakley',
        code: 'KO',
        district: District.Downtown,
        schedule: [
            { location: 'By the water next to the Casino', start: '7:00am', end: '7:45am' },
            { location: 'Supermarket', start: '8:10am', end: '12:30pm' },
            { location: 'Sitting on a bench in front of the fountain by Town Hall', start: '12:45pm', end: '2:00pm' },
            { location: 'Supermarket', start: '2:15pm', end: '6:00pm' },
            { location: 'Standing next to the Supermarket', start: '6:10pm', end: '7:00pm' },
            { location: 'Liquor Store', start: '7:40pm', end: '8:00pm' },
            { location: 'Building to the south of the Parking Garage', start: '8:30pm', end: null },
        ],
        preferredEffects: [],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Lucy Pennington',
        code: 'LP',
        district: District.Downtown,
        schedule: [
            { location: 'Building behind Slop Shop', start: '7:00am', end: '7:05am' },
            { location: 'Cuke machine across the street from Slop Shop', start: '7:30am', end: null },
            { location: 'Behind Thompson Construction & Demo', start: '8:30am', end: '9:15am' },
            { location: 'Pill-Ville Pharmacy', start: '9:35am', end: '11:20am' },
            { location: 'Bench in front of basketball court', start: '11:35am', end: '1:20pm' },
            { location: 'Pill-Ville Pharmacy', start: '1:35pm', end: '6:30pm' },
            { location: 'Building behind Slop Shop', start: '8:00pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Calorie-Dense'),

            findEffectByNameOrThrow('Euphoric'),

            findEffectByNameOrThrow('Glowing'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Louis Fourier',
        code: 'LF',
        district: District.Downtown,
        schedule: [
            { location: 'Building south of Parking Garage', start: '7:00am', end: '11:45am' },
            { location: 'Liquor Store', start: '12:10pm', end: '1:10pm' },
            { location: 'Supermarket', start: '1:55pm', end: '3:50pm' },
            { location: 'Standing behind Les Ordures Puantes', start: '4:10pm', end: '5:40pm' },
            { location: 'Les Ordures Puantes', start: '5:55pm', end: '1:30am' },
            { location: 'Building south of Parking Garage', start: '2:25am', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Shrinking'),

            findEffectByNameOrThrow('Seizure-Inducing'),

            findEffectByNameOrThrow('Paranoia'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Randy Caulfield',
        code: 'RC',
        district: District.Downtown,
        schedule: [
            { location: "Randy's Bait & Tackle", start: '7:00am', end: '11:00am' },
            { location: 'Cuke machine outside central Gas Mart', start: '12:40pm', end: null },
            { location: 'Supermarket', start: '1:15pm', end: '4:00pm' },
            { location: "Teleports to stand just outside Randy's Bait & Tackle", start: '4:00pm', end: '7:00pm' },
            { location: "Randy's Bait & Tackle", start: '7:00pm', end: null },
        ],
        preferredEffects: [],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Eugene Buckley',
        code: 'EB',
        district: District.Downtown,
        schedule: [
            { location: 'In the building behind Slop Shop', start: '7:00am', end: '7:25am' },
            { location: 'Hyland Tower 2', start: '8:25am', end: '12:20pm' },
            { location: 'Supermarket', start: '12:50pm', end: '1:00pm' },
            { location: 'Sitting at a table behind Hyland Tower', start: '1:50pm', end: '2:20pm' },
            { location: 'HAM Legal Services', start: '2:40pm', end: '3:30pm' },
            { location: 'Hyland Tower 2', start: '3:40pm', end: '6:45pm' },
            { location: 'Standing by central canal, south of the Police Station', start: '7:45pm', end: '8:05pm' },
            { location: 'In the building behind Slop Shop', start: '8:20pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Schizophrenic'),

            findEffectByNameOrThrow('Toxic'),

            findEffectByNameOrThrow('Calming'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Greg Figgle',
        code: 'GF',
        district: District.Downtown,
        schedule: [
            { location: 'Building north of Parking Garage', start: '7:00am', end: '11:00am' },
            { location: 'Liquor Store', start: '11:45am', end: '12:20pm' },
            { location: 'By the dumpster near the Car Wash business', start: '1:30pm', end: '2:00pm' },
            { location: 'Building next to Docks Warehouse property', start: '2:45pm', end: '4:45pm' },
            {
                location:
                    'Teleports to the woods, in front of the big rock with the gnome on it, down the path from the Barn property',
                start: '4:50pm',
                end: '7:30pm',
            },
            { location: 'Teleports to Slop Shop', start: '7:30pm', end: '10:00pm' },
            { location: "Bud's Bar", start: '11:05pm', end: '3:00am' },
            { location: 'Building north of Parking Garage', start: '3:35am', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Euphoric'),

            findEffectByNameOrThrow('Tropic Thunder'),

            findEffectByNameOrThrow('Toxic'),
        ],
        expectedQuality: 'Very Low',
        spend: null,
    },
    {
        name: 'Jeff Gilmore',
        code: 'JG',
        district: District.Downtown,
        schedule: [
            { location: 'Shred Shack', start: '7:00am', end: '6:00pm' },
            { location: "ATM next to Bud's Bar", start: '6:15pm', end: null },
            { location: 'Sauerkraut Supreme Pizza', start: '6:30pm', end: '7:00pm' },
            { location: 'Standing outside Sauerkraut Supreme Pizza', start: '7:00pm', end: '8:00pm' },
            { location: 'Building south of Parking Garage', start: '9:00pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Sedating'),

            findEffectByNameOrThrow('Long Faced'),

            findEffectByNameOrThrow('Laxative'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Philip Wentworth',
        code: 'PW',
        district: District.Downtown,
        schedule: [
            {
                location: "Mayor's House (house at the end of the road past the Casino)",
                start: '7:00am',
                end: '11:30am',
            },
            { location: 'Inside the Laundromat business', start: '1:15pm', end: '1:20pm' },
            { location: 'Slop Shop', start: '1:35pm', end: '3:10pm' },
            { location: 'Casino', start: '4:00pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Refreshing'),

            findEffectByNameOrThrow('Shrinking'),

            findEffectByNameOrThrow('Foggy'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },

    // Docks
    {
        name: 'Lisa Gardener',
        code: 'LG',
        district: District.Docks,
        schedule: [
            {
                location:
                    'In the Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                start: '7:00am',
                end: '8:15am',
            },
            { location: 'Bus stop near Docks Warehouse property', start: '8:25am', end: '9:15am' },
            { location: 'Teleports to Hyland Medical', start: '9:15am', end: '2:00pm' },
            { location: 'Standing by the fountain in front of Town Hall', start: '2:55pm', end: '3:25pm' },
            { location: 'Hyland Medical', start: '4:15pm', end: '7:10pm' },
            { location: "Cuke machine next to Handy Hank's Hardware", start: '7:45pm', end: null },
            { location: 'Teleports to Grey Docks Building', start: '7:50pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Laxative'),

            findEffectByNameOrThrow('Schizophrenic'),

            findEffectByNameOrThrow('Anti-Gravity'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Anna Chesterfield',
        code: 'AC',
        district: District.Docks,
        schedule: [
            { location: 'Barbershop', start: '7:00am', end: '6:00pm' },
            { location: 'Across the street from the Barbershop', start: '6:10pm', end: '8:05pm' },
            { location: 'Building to the south of the Parking Garage', start: '8:30pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Refreshing'),

            findEffectByNameOrThrow('Tropic Thunder'),

            findEffectByNameOrThrow('Toxic'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Genghis Barn',
        code: 'GB',
        district: District.Docks,
        schedule: [
            {
                location:
                    "In the shipping container across the street from the Docks Warehouse property (knock on the side that isn't blocked by crates).",
                start: '7:00am',
                end: '11:20am',
            },
            { location: 'Standing across the street from Docks Warehouse property', start: '11:25am', end: '12:10pm' },
            { location: 'Pawn Shop', start: '2:10pm', end: '2:50pm' },
            { location: 'Back door of Slop Shop', start: '3:35pm', end: '5:20pm' },
            { location: 'Church', start: '6:55pm', end: '7:45pm' },
            { location: 'Hyland Medical', start: '8:10pm', end: '9:30pm' },
            {
                location: "Across the street from Handy Hank's Hardware by the trees.",
                start: '10:05pm',
                end: '11:50pm',
            },
            {
                location: 'Teleports to the shipping container across the street from the Docks Warehouse property',
                start: '11:50pm',
                end: null,
            },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Electrifying'),

            findEffectByNameOrThrow('Gingeritis'),

            findEffectByNameOrThrow('Athletic'),
        ],
        expectedQuality: 'Very Low',
        spend: null,
    },
    {
        name: 'Cranky Frank',
        code: 'CF',
        district: District.Docks,
        schedule: [
            { location: 'On a bench in the encampment next to the western Gas Mart', start: '7:00am', end: '8:00am' },
            { location: 'Standing at the fire barrel in the encampment', start: '8:05am', end: '9:15am' },
            { location: 'Top Tattoo', start: '9:45am', end: '11:05am' },
            { location: 'Bus stop behind western construction site', start: '12:05pm', end: '2:10pm' },
            {
                location: 'Standing by the fire barrel near the water behind the building to the rear of the Arcade',
                start: '3:20pm',
                end: '6:25pm',
            },
            { location: 'Sauerkraut Supreme Pizza', start: '6:50pm', end: '8:20pm' },
            { location: 'Liquor Store', start: '9:30pm', end: '10:05pm' },
            { location: 'By the dumpster behind the Motel Office', start: '10:45pm', end: '12:30am' },
            { location: 'Taco Ticklers', start: '1:00am', end: '2:00am' },
            { location: 'On a bench in the encampment next to the western Gas Mart', start: '3:00am', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Laxative'),

            findEffectByNameOrThrow('Toxic'),

            findEffectByNameOrThrow('Tropic Thunder'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Javier Pérez',
        code: 'JP',
        district: District.Docks,
        schedule: [
            {
                location:
                    'In the Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                start: '7:00am',
                end: '11:30am',
            },
            { location: 'Teleports to Sauerkraut Supreme Pizza', start: '11:30am', end: '2:50pm' },
            {
                location: 'Teleports outside Hyland Auto, staring at the Cheetah through the window',
                start: '2:50pm',
                end: '5:30pm',
            },
            { location: 'Central Gas Mart', start: '6:05pm', end: null },
        ],
        preferredEffects: [],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Marco Barone',
        code: 'MB',
        district: District.Docks,
        schedule: [
            { location: 'Body Shop', start: '7:00am', end: '6:05pm' },
            { location: 'ATM in front of Central Gas Mart', start: '6:15pm', end: null },
            { location: 'Supermarket', start: '7:00pm', end: '7:45pm' },
            { location: 'Standing outside Casino', start: '8:10pm', end: '9:00pm' },
            { location: "In building next to Jane the dealer's travel trailer", start: '10:55pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Sneaky'),

            findEffectByNameOrThrow('Long Faced'),

            findEffectByNameOrThrow('Refreshing'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Melissa Wood',
        code: 'MW',
        district: District.Docks,
        schedule: [
            {
                location: "Mayor's House (house at the end of the road past the Casino)",
                start: '7:00am',
                end: '9:20am',
            },
            { location: 'Teleports somewhere', start: '9:20am', end: null },
            { location: 'Teleports to the house next to the Bungalow property', start: '10:55am', end: '1:00pm' },
            { location: 'Casino', start: '3:30pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Anti-Gravity'),

            findEffectByNameOrThrow('Refreshing'),

            findEffectByNameOrThrow('Slippery'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Mac Cooper',
        code: 'MC',
        district: District.Docks,
        schedule: [
            { location: 'Building next to Docks Warehouse property', start: '7:00am', end: '7:50am' },
            { location: 'The Butter Box', start: '9:50am', end: '10:00am' },
            {
                location: 'Teleports back to building next to Docks Warehouse property',
                start: '10:00am',
                end: '2:30pm',
            },
            { location: 'Bus stop near Docks Warehouse property', start: '2:50pm', end: '4:20pm' },
            { location: 'Yellow house in Suburbia', start: '6:45pm', end: '7:00pm' },
            { location: 'Teleports back to building next to Docks Warehouse property', start: '7:00pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Focused'),

            findEffectByNameOrThrow('Spicy'),

            findEffectByNameOrThrow('Long Faced'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },
    {
        name: 'Billy Kramer',
        code: 'BK',
        district: District.Docks,
        schedule: [
            {
                location:
                    'In the Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                start: '7:00am',
                end: '7:45am',
            },
            { location: 'Red car next to Grey Docks Building', start: '7:50am', end: null },
            { location: 'Inside Koyama Chemical Company', start: '8:45am', end: '11:50am' },
            { location: 'Cuke machine by Top Tattoo', start: '12:18pm', end: null },
            { location: 'Western Gas Mart', start: '12:35pm', end: '1:15pm' },
            { location: 'Standing outside Koyama Chemical Company', start: '1:40pm', end: '3:00pm' },
            { location: 'Inside Koyama Chemical Company', start: '3:10pm', end: '5:30pm' },
            { location: 'On a bench by the water in southern Westville', start: '6:45pm', end: '8:00pm' },
            { location: 'Red car at Koyama Chemical Company', start: '9:05pm', end: null },
            {
                location: 'Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                start: '9:55pm',
                end: null,
            },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Spicy'),

            findEffectByNameOrThrow('Schizophrenic'),

            findEffectByNameOrThrow('Long Faced'),
        ],
        expectedQuality: 'Moderate',
        spend: null,
    },

    // Suburbia
    {
        name: 'Chris Sullivan',
        code: 'CS',
        district: District.Suburbia,
        schedule: [
            { location: '???', start: '7:00am', end: '9:35am' },
            {
                location:
                    'Teleports to the ATM in front of the Grey Docks Building (building with the weed graffiti near the Docks Warehouse property)',
                start: '9:35am',
                end: null,
            },
            { location: "Randy's Bait & Tackle", start: '10:15am', end: '12:40pm' },
            { location: 'Teleports to Hyland Bank', start: '12:40pm', end: '6:40pm' },
            { location: 'Standing behind Hyland Tower', start: '7:10pm', end: '8:00pm' },
            { location: 'Hyland Bank', start: '8:30pm', end: '11:00pm' },
            { location: 'Teleports somewhere', start: '11:00pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Sneaky'),

            findEffectByNameOrThrow('Euphoric'),

            findEffectByNameOrThrow('Electrifying'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Hank Stevenson',
        code: 'HS',
        district: District.Suburbia,
        schedule: [
            { location: "Handy Hank's Hardware", start: '7:00am', end: '8:00pm' },
            { location: "Drives the blue car in the parking lot of Handy Hank's", start: '8:00pm', end: null },
            { location: 'White house at the end of the road in Suburbia', start: '9:40pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Sneaky'),

            findEffectByNameOrThrow('Toxic'),

            findEffectByNameOrThrow('Schizophrenic'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Karen Kennedy',
        code: 'KK',
        district: District.Suburbia,
        schedule: [
            { location: 'On a bench in Suburbia Park', start: '7:00am', end: '9:00am' },
            { location: 'Purple car in front of dark grey house in Suburbia', start: '9:25am', end: null },
            { location: 'Parks at the Parking Garage', start: '10:30am', end: null },
            { location: 'Standing to the rear of the Parking Garage', start: '10:35am', end: '2:00pm' },
            { location: 'Sitting upstairs at the Casino', start: '2:20pm', end: '6:00pm' },
            { location: 'Sitting at a table behind Hyland Tower', start: '6:45pm', end: '7:30pm' },
            { location: 'Standing upstairs at the Casino', start: '8:15pm', end: '10:00pm' },
            { location: 'Teleports into purple car in Parking Garage', start: '10:05pm', end: null },
            { location: 'Dark grey house in Suburbia', start: '11:15pm', end: null },
        ],
        preferredEffects: [],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Alison Knight',
        code: 'AK',
        district: District.Suburbia,
        schedule: [
            { location: "Bleuball's Boutique", start: '7:00am', end: '9:00am' },
            {
                location: 'Gets in the black car at the house with the couch on the porch in Suburbia',
                start: '10:00am',
                end: null,
            },
            { location: 'Parking lot behind Les Ordures Puantes', start: '10:55am', end: null },
            { location: 'Hyland Tower 2', start: '11:10am', end: '2:00pm' },
            { location: 'Standing behind Hyland Tower by the pay phone.', start: '2:25pm', end: '3:30pm' },
            { location: 'Hyland Tower 2', start: '3:50pm', end: '6:30pm' },
            { location: 'Black car in parking lot behind Les Ordures Puantes', start: '6:45pm', end: null },
            { location: 'House with the couch on the porch in Suburbia', start: '8:15pm', end: null },
        ],
        preferredEffects: [],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Jeremy Wilkinson',
        code: 'JW',
        district: District.Suburbia,
        schedule: [
            { location: 'Hyland Auto', start: '7:00am', end: '6:00pm' },
            { location: 'Green car behind the Post Office business', start: '6:20pm', end: null },
            { location: 'Brown house in Suburbia', start: '7:20pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Balding'),

            findEffectByNameOrThrow('Slippery'),

            findEffectByNameOrThrow('Calorie-Dense'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Carl Bundy',
        code: 'CB',
        district: District.Suburbia,
        schedule: [
            { location: 'White house with white door in Suburbia', start: '7:00am', end: '11:00am' },
            { location: 'Behind the bus stop near the Docks Warehouse property', start: '12:30pm', end: '3:00pm' },
            { location: 'ATM in front of Supermarket', start: '4:40pm', end: null },
            { location: 'The Crimson Canary', start: '4:55pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Glowing'),

            findEffectByNameOrThrow('Athletic'),

            findEffectByNameOrThrow('Disorienting'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Jackie Stevenson',
        code: 'JS',
        district: District.Suburbia,
        schedule: [
            { location: 'The Butter Box', start: '7:00am', end: '4:30pm' },
            {
                location: 'Northeast of the Central Gas Mart, by the canal, talking to Pearl',
                start: '5:00pm',
                end: '6:00pm',
            },
            { location: 'White car in the parking lot behind Les Ordures Puantes', start: '7:00pm', end: null },
            { location: 'White house at the end of the road in Suburbia', start: '8:30pm', end: null },
        ],
        preferredEffects: [],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Harold Colt',
        code: 'HC',
        district: District.Suburbia,
        schedule: [
            { location: 'By the water across the street from Les Ordures Puantes', start: '7:00am', end: '8:45am' },
            { location: 'Hyland Tower 2', start: '9:40am', end: '12:00pm' },
            { location: 'Church', start: '12:40pm', end: '1:50pm' },
            { location: 'Hyland Tower 2', start: '2:30pm', end: '5:05pm' },
            { location: 'In front of Town Hall, talking to Tobas', start: '5:35pm', end: '6:30pm' },
            { location: 'Hyland Tower 2', start: '7:00pm', end: '9:20pm' },
            { location: 'White car in Parking Garage', start: '10:40pm', end: null },
            { location: 'Yellow house in Suburbia', start: '12:15am', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Foggy'),

            findEffectByNameOrThrow('Spicy'),

            findEffectByNameOrThrow('Jennerising'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Jack Knight',
        code: 'JK',
        district: District.Suburbia,
        schedule: [
            { location: 'White house with couch on front porch in Suburbia', start: '7:00am', end: '10:00am' },
            { location: 'At the gazebo in Suburbia Park', start: '10:35am', end: '12:15pm' },
            { location: 'Teleports to Hyland Medical', start: '12:15pm', end: '3:30pm' },
            { location: 'Standing next to Hyland Medical', start: '3:40pm', end: '4:20pm' },
            { location: 'Teleports to Pill-Ville Pharmacy', start: '4:20pm', end: '6:45pm' },
            { location: 'Teleports to white house with couch on front porch in Suburbia', start: '6:45pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Shrinking'),

            findEffectByNameOrThrow('Thought-Provoking'),

            findEffectByNameOrThrow('Lethal'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Dennis Kennedy',
        code: 'DK',
        district: District.Suburbia,
        schedule: [
            { location: 'Fire Station', start: '7:00am', end: '11:40am' },
            { location: 'Town Hall', start: '12:15pm', end: '12:45pm' },
            { location: "Bench across the street from Bleuball's Boutique", start: '1:15pm', end: '1:50pm' },
            { location: 'Fire Station', start: '2:20pm', end: '6:00pm' },
            { location: 'Slop Shop (back door)', start: '7:15pm', end: '7:25pm' },
            { location: 'Dark grey house in Suburbia', start: '9:30pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Athletic'),

            findEffectByNameOrThrow('Focused'),

            findEffectByNameOrThrow('Bright-Eyed'),
        ],
        expectedQuality: 'High',
        spend: null,
    },

    // Uptown
    {
        name: 'Lily Turner',
        code: 'LT',
        district: District.Uptown,
        schedule: [
            { location: 'By the fountain in front of Town Hall', start: '7:00am', end: '7:50am' },
            { location: 'Outside The Butter Box', start: '8:10am', end: '8:40am' },
            { location: 'The Butter Box', start: '8:50am', end: '4:00pm' },
            { location: 'Hyland Bank', start: '4:35pm', end: '5:30pm' },
            { location: 'By the fountain in front of Town Hall', start: '6:00pm', end: '8:30pm' },
            { location: 'Blue building across from the Church', start: '9:45pm', end: null },
        ],
        preferredEffects: [],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Fiona Hancock',
        code: 'FH',
        district: District.Uptown,
        schedule: [
            { location: 'Thrifty Threads', start: '7:00am', end: '6:00pm' },
            { location: 'ATM in front of Thrifty Threads', start: '6:10pm', end: null },
            { location: 'Blue building across from the Church', start: '8:15pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Lethal'),

            findEffectByNameOrThrow('Thought-Provoking'),

            findEffectByNameOrThrow('Tropic Thunder'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Ray Hoffman',
        code: 'RH',
        district: District.Uptown,
        schedule: [
            { location: "Ray's Real Estate", start: '7:00am', end: '6:00pm' },
            { location: 'Standing outside the Courthouse', start: '6:25pm', end: '7:00pm' },
            { location: 'Hyland Bank', start: '7:25pm', end: '8:00pm' },
            { location: 'Blue building across from the Church', start: '8:35pm', end: null },
        ],
        preferredEffects: [],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Jen Heard',
        code: 'JH',
        district: District.Uptown,
        schedule: [
            { location: 'Blue building across from the Church', start: '7:00am', end: '7:30am' },
            { location: "Cuke machine outside Handy Hank's Hardware", start: '8:30am', end: null },
            { location: "Across the street from Bleuball's Boutique", start: '9:00am', end: null },
            { location: 'Town Hall', start: '9:30am', end: '2:30pm' },
            { location: 'Post Office', start: '2:50pm', end: '3:20pm' },
            { location: 'Town Hall', start: '3:40pm', end: '6:00pm' },
            { location: 'Blue building across from the Church', start: '7:10pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Disorienting'),

            findEffectByNameOrThrow('Energizing'),

            findEffectByNameOrThrow('Sneaky'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Walter Cussler',
        code: 'WC',
        district: District.Uptown,
        schedule: [
            { location: 'Church', start: '7:00am', end: '10:30am' },
            {
                location: 'Can be at The Butter Box, but sometimes he walks down to Hyland Tower 1, then turns around',
                start: '11:20am',
                end: null,
            },
            { location: 'Stands by the parking lot across from the Church', start: '12:05pm', end: '1:00pm' },
            { location: 'Gets in red sh*tbox in parking lot', start: '1:05pm', end: null },
            { location: 'Parking lot in Westville by the west park statue', start: '2:30pm', end: null },
            { location: 'Community Center', start: '3:20pm', end: '4:10pm' },
            { location: 'Gets in red sh*tbox in parking lot by west park statue', start: '4:30pm', end: null },
            { location: 'Parking lot across from the Church', start: '6:25pm', end: null },
            { location: 'Church', start: '6:40pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Schizophrenic'),

            findEffectByNameOrThrow('Calming'),

            findEffectByNameOrThrow('Balding'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Herbert Bleuball',
        code: 'HB',
        district: District.Uptown,
        schedule: [
            { location: "Bleuball's Boutique", start: '7:00am', end: '6:00pm' },
            { location: 'Standing in front of Fire Station', start: '6:45pm', end: '7:20pm' },
            { location: 'Hyland Bank', start: '7:30pm', end: '7:55pm' },
            { location: 'Blue building across from the Church', start: '8:35pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Slippery'),

            findEffectByNameOrThrow('Foggy'),

            findEffectByNameOrThrow('Explosive'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Michael Boog',
        code: 'MB',
        district: District.Uptown,
        schedule: [
            {
                location: 'Expensive house on the hill at the end of the street from the Church',
                start: '7:00am',
                end: '8:20am',
            },
            { location: 'Back of the house by the pool', start: '8:50am', end: '9:30am' },
            { location: 'In the red-orange Cheetah in the driveway', start: '10:00am', end: null },
            { location: 'Parking lot behind Les Ordures Puantes', start: '10:50am', end: null },
            { location: 'Supermarket', start: '11:30am', end: '1:40pm' },
            { location: 'HAM Legal Services', start: '2:20pm', end: '3:30pm' },
            { location: 'In the Red-orange Cheetah behind Les Ordures Puantes', start: '4:05pm', end: null },
            { location: 'Parking lot behind post office', start: '4:30pm', end: null },
            { location: "Bleuball's Boutique", start: '4:50pm', end: '5:40pm' },
            { location: 'Red-orange Cheetah behind post office', start: '6:05pm', end: null },
            {
                location: 'Expensive house on the hill at the end of the street from the Church',
                start: '7:30pm',
                end: null,
            },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Jennerising'),

            findEffectByNameOrThrow('Calming'),

            findEffectByNameOrThrow('Schizophrenic'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Tobas Wentworth',
        code: 'TW',
        district: District.Uptown,
        schedule: [
            {
                location: "Mayor's House (house at the end of the road past the Casino)",
                start: '7:00am',
                end: '9:00am',
            },
            {
                location: 'Can be at The Butter Box, but sometimes turns around near The Crimson Canary.',
                start: '9:50am',
                end: null,
            },
            { location: 'Sitting at a table behind Hyland Tower', start: '10:15am', end: '11:20am' },
            { location: 'Town Hall', start: '11:50am', end: '2:15pm' },
            { location: 'Slop Shop', start: '3:00pm', end: '3:40pm' },
            { location: 'Town Hall', start: '4:30pm', end: '5:20pm' },
            { location: 'In front of Town Hall, talking to Harold', start: '5:25pm', end: '6:30pm' },
            { location: 'Police Station', start: '7:10pm', end: '8:30pm' },
            { location: "Mayor's House", start: '9:40pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Lethal'),

            findEffectByNameOrThrow('Disorienting'),

            findEffectByNameOrThrow('Spicy'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
    {
        name: 'Pearl Moore',
        code: 'PM',
        district: District.Uptown,
        schedule: [
            { location: 'Church', start: '7:00am', end: '7:30am' },
            { location: 'Bus stop next to Church', start: '7:40am', end: '9:05am' },
            { location: 'Hyland Medical', start: '9:30am', end: '11:10am' },
            { location: 'Courthouse', start: '11:50am', end: '1:20pm' },
            { location: 'ATM in front of Central Gas Mart', start: '2:25pm', end: null },
            { location: 'Post Office', start: '2:55pm', end: '4:30pm' },
            {
                location: 'Northeast of the Central Gas Mart, by the canal, talking to Jackie',
                start: '4:55pm',
                end: '6:00pm',
            },
            { location: 'Church', start: '7:30pm', end: null },
        ],
        preferredEffects: [
            findEffectByNameOrThrow('Schizophrenic'),

            findEffectByNameOrThrow('Gingeritis'),

            findEffectByNameOrThrow('Explosive'),
        ],
        expectedQuality: 'High',
        spend: null,
    },
] as const;

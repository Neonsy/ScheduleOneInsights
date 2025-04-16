import type { Ingredient, IngredientCode } from '../types';

export const ingredients: Record<IngredientCode, Ingredient> = {
    Ad: {
        name: 'Addy',
        price: 9,
        unlockLevel: 12, // Hustler II
        defaultEffect: 'TP',
    },
    Ba: {
        name: 'Banana',
        price: 2,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'Gi',
    },
    Bt: {
        name: 'Battery',
        price: 8,
        unlockLevel: 5, // Peddler V
        defaultEffect: 'BE',
    },
    Ch: {
        name: 'Chili',
        price: 7,
        unlockLevel: 4, // Peddler IV
        defaultEffect: 'Sp',
    },
    Cu: {
        name: 'Cuke',
        price: 2,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'En',
    },
    Do: {
        name: 'Donut',
        price: 3,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'CD',
    },
    ED: {
        name: 'Energy Drink',
        price: 6,
        unlockLevel: 1, // Peddler I
        defaultEffect: 'At',
    },
    FM: {
        name: 'Flu Medicine',
        price: 5,
        unlockLevel: 4, // Hoodlum IV
        defaultEffect: 'Se',
    },
    Ga: {
        name: 'Gasoline',
        price: 5,
        unlockLevel: 5, // Hoodlum V
        defaultEffect: 'To',
    },
    HS: {
        name: 'Horse Semen',
        price: 9,
        unlockLevel: 13, // Hustler III
        defaultEffect: 'LF',
    },
    Io: {
        name: 'Iodine',
        price: 8,
        unlockLevel: 11, // Hustler I
        defaultEffect: 'Je',
    },
    MB: {
        name: 'Mega Bean',
        price: 7,
        unlockLevel: 3, // Peddler III
        defaultEffect: 'Fg',
    },
    MO: {
        name: 'Motor Oil',
        price: 6,
        unlockLevel: 2, // Peddler II
        defaultEffect: 'Sl',
    },
    MW: {
        name: 'Mouth Wash',
        price: 4,
        unlockLevel: 3, // Hoodlum III
        defaultEffect: 'Ba',
    },
    Pa: {
        name: 'Paracetamol',
        price: 3,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'Sn',
    },
    Vi: {
        name: 'Viagra',
        price: 4,
        unlockLevel: 2, // Hoodlum II
        defaultEffect: 'TT',
    },
};

// Map from ingredient names to codes for easier lookup
export const ingredientNameToCode: Record<string, IngredientCode> = {
    Addy: 'Ad',
    Banana: 'Ba',
    Battery: 'Bt',
    Chili: 'Ch',
    Cuke: 'Cu',
    Donut: 'Do',
    'Energy Drink': 'ED',
    'Flu Medicine': 'FM',
    Gasoline: 'Ga',
    'Horse Semen': 'HS',
    Iodine: 'Io',
    'Mega Bean': 'MB',
    'Motor Oil': 'MO',
    'Mouth Wash': 'MW',
    Paracetamol: 'Pa',
    Viagra: 'Vi',
};

// Map from ingredient codes to names for easier display
export const ingredientCodeToName: Record<IngredientCode, string> = Object.entries(ingredients).reduce(
    (acc, [code, ingredient]) => {
        acc[code as IngredientCode] = ingredient.name;
        return acc;
    },
    {} as Record<IngredientCode, string>
);

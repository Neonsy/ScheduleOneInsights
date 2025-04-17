export const ingredients = {
    Ad: {
        name: 'Addy',
        price: 9,
        unlockLevel: 12, // Hustler II
        defaultEffect: 'TP',
    },
    Bnn: {
        name: 'Banana',
        price: 2,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'Grs',
    },
    Btr: {
        name: 'Battery',
        price: 8,
        unlockLevel: 5, // Peddler V
        defaultEffect: 'BE',
    },
    Cl: {
        name: 'Chili',
        price: 7,
        unlockLevel: 4, // Peddler IV
        defaultEffect: 'Sc',
    },
    Ck: {
        name: 'Cuke',
        price: 2,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'Egz',
    },
    Dn: {
        name: 'Donut',
        price: 3,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'CD',
    },
    ED: {
        name: 'Energy Drink',
        price: 6,
        unlockLevel: 1, // Peddler I
        defaultEffect: 'Al',
    },
    FM: {
        name: 'Flu Medicine',
        price: 5,
        unlockLevel: 4, // Hoodlum IV
        defaultEffect: 'Sdt',
    },
    Gsl: {
        name: 'Gasoline',
        price: 5,
        unlockLevel: 5, // Hoodlum V
        defaultEffect: 'Tx',
    },
    HS: {
        name: 'Horse Semen',
        price: 9,
        unlockLevel: 13, // Hustler III
        defaultEffect: 'LF',
    },
    Idn: {
        name: 'Iodine',
        price: 8,
        unlockLevel: 11, // Hustler I
        defaultEffect: 'Jrs',
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
        defaultEffect: 'Slp',
    },
    MW: {
        name: 'Mouth Wash',
        price: 4,
        unlockLevel: 3, // Hoodlum III
        defaultEffect: 'Bd',
    },
    Prct: {
        name: 'Paracetamol',
        price: 3,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'Sn',
    },
    Vgr: {
        name: 'Viagra',
        price: 4,
        unlockLevel: 2, // Hoodlum II
        defaultEffect: 'TT',
    },
} as const;

// Derive the IngredientCode type from the keys of the ingredients object
export type IngredientCode = keyof typeof ingredients;

// Map from ingredient names to codes for easier lookup
export const ingredientNameToCode: Record<string, IngredientCode> = {
    Addy: 'Ad',
    Banana: 'Bnn',
    Battery: 'Btr',
    Chili: 'Cl',
    Cuke: 'Ck',
    Donut: 'Dn',
    'Energy Drink': 'ED',
    'Flu Medicine': 'FM',
    Gasoline: 'Gsl',
    'Horse Semen': 'HS',
    Iodine: 'Idn',
    'Mega Bean': 'MB',
    'Motor Oil': 'MO',
    'Mouth Wash': 'MW',
    Paracetamol: 'Prct',
    Viagra: 'Vgr',
};

// Map from ingredient codes to names for easier display
export const ingredientCodeToName: Record<IngredientCode, string> = Object.entries(ingredients).reduce(
    (acc, [code, ingredient]) => {
        acc[code as IngredientCode] = ingredient.name;
        return acc;
    },
    {} as Record<IngredientCode, string>
);

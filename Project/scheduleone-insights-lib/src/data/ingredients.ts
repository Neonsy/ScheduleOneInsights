export const ingredients = {
    Addy: {
        code: 'Adrl',
        price: 9,
        unlockLevel: 12, // Hustler II
        defaultEffect: 'TP',
    },
    Banana: {
        code: 'Bnn',
        price: 2,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'Gngr',
    },
    Battery: {
        code: 'Btry',
        price: 8,
        unlockLevel: 5, // Peddler V
        defaultEffect: 'BE',
    },
    Chili: {
        code: 'Chl',
        price: 7,
        unlockLevel: 4, // Peddler IV
        defaultEffect: 'Sc',
    },
    Cuke: {
        code: 'Ck',
        price: 2,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'Enrg',
    },
    Donut: {
        code: 'Dnt',
        price: 3,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'CD',
    },
    'Energy Drink': {
        code: 'EnrgyDrnk',
        price: 6,
        unlockLevel: 1, // Peddler I
        defaultEffect: 'Athl',
    },
    'Flu Medicine': {
        code: 'FM',
        price: 5,
        unlockLevel: 4, // Hoodlum IV
        defaultEffect: 'Sdt',
    },
    Gasoline: {
        code: 'Gsln',
        price: 5,
        unlockLevel: 5, // Hoodlum V
        defaultEffect: 'Txc',
    },
    'Horse Semen': {
        code: 'HrsSmn',
        price: 9,
        unlockLevel: 13, // Hustler III
        defaultEffect: 'LF',
    },
    Iodine: {
        code: 'Idn',
        price: 8,
        unlockLevel: 11, // Hustler I
        defaultEffect: 'Jnrs',
    },
    'Mega Bean': {
        code: 'MgBn',
        price: 7,
        unlockLevel: 3, // Peddler III
        defaultEffect: 'Fg',
    },
    'Motor Oil': {
        code: 'MtrOl',
        price: 6,
        unlockLevel: 2, // Peddler II
        defaultEffect: 'Slpr',
    },
    'Mouth Wash': {
        code: 'MthWsh',
        price: 4,
        unlockLevel: 3, // Hoodlum III
        defaultEffect: 'Bldg',
    },
    Paracetamol: {
        code: 'Prctm',
        price: 3,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'Snk',
    },
    Viagra: {
        code: 'Vgr',
        price: 4,
        unlockLevel: 2, // Hoodlum II
        defaultEffect: 'TT',
    },
} as const;

// Define the IngredientCode type using type inference from the ingredients object
export type IngredientCode = (typeof ingredients)[keyof typeof ingredients]['code'];

// Helper functions moved to utils/ingredients.ts

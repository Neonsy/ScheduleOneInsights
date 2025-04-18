export const products = {
    'OG Kush': {
        code: 'OK',
        price: 35,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'Cm', // Calming
    },
    'Sour Diesel': {
        code: 'SD',
        price: 35,
        unlockLevel: 4, // Street Rat IV
        defaultEffect: 'Rfrs', // Refreshing
    },
    'Green Crack': {
        code: 'GC',
        price: 35,
        unlockLevel: 2, // Hoodlum II
        defaultEffect: 'Eegz', // Energizing
    },
    'Granddaddy Purple': {
        code: 'GP',
        price: 35,
        unlockLevel: 4, // Hoodlum IV
        defaultEffect: 'Sdtng', // Sedating
    },
    Methamphetamine: {
        code: 'Mthmphtmn',
        price: 70,
        unlockLevel: 10, // Higher level
        defaultEffect: 'Fcd', // Focused (placeholder, adjust as needed)
    },
    Cocaine: {
        code: 'Ccn',
        price: 150,
        unlockLevel: 15, // Higher level
        defaultEffect: 'Epc', // Euphoric (placeholder, adjust as needed)
    },
} as const;

// Define the ProductCode type using type inference from the products object
export type ProductCode = (typeof products)[keyof typeof products]['code'];

// Helper functions moved to utils/products.ts

import type { Product, ProductCode } from '../types';

export const products: Record<ProductCode, Product> = {
    OK: {
        name: 'OG Kush',
        price: 35,
        unlockLevel: 0, // Available at game start
        defaultEffect: 'Cm', // Calming
    },
    SD: {
        name: 'Sour Diesel',
        price: 35,
        unlockLevel: 4, // Street Rat IV
        defaultEffect: 'Rfs', // Refreshing
    },
    GC: {
        name: 'Green Crack',
        price: 35,
        unlockLevel: 2, // Hoodlum II
        defaultEffect: 'Egz', // Energizing
    },
    GP: {
        name: 'Granddaddy Purple',
        price: 35,
        unlockLevel: 4, // Hoodlum IV
        defaultEffect: 'Sdt', // Sedating
    },
    Mtp: {
        name: 'Methamphetamine',
        price: 70,
        unlockLevel: 10, // Higher level
        defaultEffect: 'Fcd', // Focused (placeholder, adjust as needed)
    },
    Cc: {
        name: 'Cocaine',
        price: 150,
        unlockLevel: 15, // Higher level
        defaultEffect: 'Epc', // Euphoric (placeholder, adjust as needed)
    },
};

// Map from product names to codes for easier lookup
export const productNameToCode: Record<string, ProductCode> = {
    'OG Kush': 'OK',
    'Sour Diesel': 'SD',
    'Green Crack': 'GC',
    'Granddaddy Purple': 'GP',
    Methamphetamine: 'Mtp',
    Cocaine: 'Cc',
};

// Map from product codes to names for easier display
export const productCodeToName: Record<ProductCode, string> = Object.entries(products).reduce(
    (acc, [code, product]) => {
        acc[code as ProductCode] = product.name;
        return acc;
    },
    {} as Record<ProductCode, string>
);

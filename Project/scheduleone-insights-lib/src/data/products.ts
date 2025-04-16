import type { Product, ProductCode } from '../types';

export const products: Record<ProductCode, Product> = {
    OK: {
        name: 'OG Kush',
        price: 35,
        unlockLevel: 0, // Available at game start
    },
    SD: {
        name: 'Sour Diesel',
        price: 35,
        unlockLevel: 4, // Street Rat IV
    },
    GC: {
        name: 'Green Crack',
        price: 35,
        unlockLevel: 2, // Hoodlum II
    },
    GP: {
        name: 'Granddaddy Purple',
        price: 35,
        unlockLevel: 4, // Hoodlum IV
    },
    Me: {
        name: 'Methamphetamine',
        price: 70,
        unlockLevel: 10, // Higher level
    },
    Co: {
        name: 'Cocaine',
        price: 150,
        unlockLevel: 15, // Higher level
    },
};

// Map from product names to codes for easier lookup
export const productNameToCode: Record<string, ProductCode> = {
    'OG Kush': 'OK',
    'Sour Diesel': 'SD',
    'Green Crack': 'GC',
    'Granddaddy Purple': 'GP',
    Methamphetamine: 'Me',
    Cocaine: 'Co',
};

// Map from product codes to names for easier display
export const productCodeToName: Record<ProductCode, string> = Object.entries(products).reduce(
    (acc, [code, product]) => {
        acc[code as ProductCode] = product.name;
        return acc;
    },
    {} as Record<ProductCode, string>
);

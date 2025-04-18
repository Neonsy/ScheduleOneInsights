// Import types from data files
import type { EffectCode } from '../data/effects';
import type { IngredientCode } from '../data/ingredients';
import type { ProductCode } from '../data/products';
import type { DealerCode } from '../data/dealers';
import type { CustomerCode } from '../data/customers';
import type { QualityStandard, SpendingLevel } from '../data/constants';

// Re-export imported types
export type { EffectCode, IngredientCode, ProductCode, DealerCode, CustomerCode, QualityStandard, SpendingLevel };

// Product type
export type Product = {
    code: ProductCode;
    price: number;
    unlockLevel: number;
    defaultEffect: EffectCode;
};

// Ingredient type
export type Ingredient = {
    code: IngredientCode;
    price: number;
    unlockLevel: number;
    defaultEffect: EffectCode;
};

// Effect type
export type Effect = {
    code: EffectCode;
    description: string;
    valueMultiplier: number;
    tier: number;
    addictiveness: number;
};

// Customer types

export type Customer = {
    code: CustomerCode;
    name: string;
    preferences: EffectCode[];
    spendingLevel: SpendingLevel;
    qualityStandard: QualityStandard; // The customer's expected quality standard
    livingLocation: string; // The location where the customer lives/can be unlocked
    schedule: CustomerScheduleEntry[];
};

// Dealer type
export type Dealer = {
    code: DealerCode;
    location: string;
    unlockCost: number;
    cut: number; // Percentage as decimal (e.g., 0.20 for 20%)
};

// Replacement rule types
export type ReplacementRule = {
    ifPresent: EffectCode[];
    ifNotPresent: EffectCode[];
    replace: Partial<Record<EffectCode, EffectCode>>;
};

/**
 * Result of mixing ingredients with a product
 */
export type MixResult = {
    /** List of effects produced by the mix */
    effects: EffectCode[];
    /** Cost of ingredients used in the mix */
    ingredientCost: number;
    /** Cost of the base product */
    productCost: number;
    /** Selling price of the mix */
    sellingPrice: number;
    /** Profit from selling the mix */
    profit: number;
    /** Profit margin as a decimal (0-1) */
    profitMargin: number;
    /** Addictiveness value of the mix */
    addictiveness: number;
    /** Seed string that can be used to recreate the mix */
    seed: string;
};

export type MixState = {
    product: ProductCode;
    ingredients: IngredientCode[];
};

// Customer schedule types
export type CustomerScheduleEntry = {
    location: string;
    startTime: string;
    endTime?: string;
    entryNumber: number;
};

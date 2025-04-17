// Product types
export type ProductCode =
    | 'OK' // OG Kush (multi-word: O-K)
    | 'SD' // Sour Diesel (multi-word: S-D)
    | 'GC' // Green Crack (multi-word: G-C)
    | 'GP' // Granddaddy Purple (multi-word: G-P)
    | 'Mtp' // Methamphetamine (single-word: Me-tham-phe-ta-mine)
    | 'Cc'; // Cocaine (single-word: Co-caine)

export type Product = {
    name: string;
    price: number;
    unlockLevel: number;
    defaultEffect: EffectCode;
};

// Ingredient types
export type IngredientCode =
    | 'Ad' // Addy (single-word: A-ddy)
    | 'Bnn' // Banana (single-word: Ba-na-na)
    | 'Btr' // Battery (single-word: Ba-tte-ry)
    | 'Cl' // Chili (single-word: Chi-li)
    | 'Ck' // Cuke (single-word: Cuke)
    | 'Dn' // Donut (single-word: Do-nut)
    | 'ED' // Energy Drink (multi-word: E-D)
    | 'FM' // Flu Medicine (multi-word: F-M)
    | 'Gsl' // Gasoline (single-word: Ga-so-line)
    | 'HS' // Horse Semen (multi-word: H-S)
    | 'Idn' // Iodine (single-word: I-o-dine)
    | 'MB' // Mega Bean (multi-word: M-B)
    | 'MO' // Motor Oil (multi-word: M-O)
    | 'MW' // Mouth Wash (multi-word: M-W)
    | 'Prct' // Paracetamol (single-word: Pa-ra-ce-ta-mol)
    | 'Vgr'; // Viagra (single-word: Vi-a-gra)

export type Ingredient = {
    name: string;
    price: number;
    unlockLevel: number;
    defaultEffect: EffectCode;
};

// Effect types
export type EffectCode =
    | 'AG' // Anti-Gravity (multi-word: A-G)
    | 'Al' // Athletic (single-word: A-th-le-tic)
    | 'Bd' // Balding (single-word: Ba-l-ding)
    | 'BE' // Bright-Eyed (multi-word: B-E)
    | 'Cm' // Calming (single-word: Ca-l-ming)
    | 'CD' // Calorie-Dense (multi-word: C-D)
    | 'Ccp' // Cyclopean (single-word: Cy-clo-pe-an)
    | 'Dor' // Disorienting (single-word: Di-so-ri-en-ting)
    | 'Elf' // Electrifying (single-word: E-lec-tri-fy-ing)
    | 'Egz' // Energizing (single-word: E-ner-gi-zing)
    | 'Epc' // Euphoric (single-word: Eu-pho-ric)
    | 'Eps' // Explosive (single-word: Ex-plo-sive)
    | 'Fcd' // Focused (single-word: Fo-cu-sed)
    | 'Fg' // Foggy (single-word: Fo-ggy)
    | 'Grs' // Gingeritis (single-word: Gin-ge-ri-tis)
    | 'Gw' // Glowing (single-word: Glo-wing)
    | 'Jrs' // Jennerising (single-word: Je-nne-ri-sing)
    | 'Lt' // Lethal (single-word: Le-thal)
    | 'Lxt' // Laxative (single-word: La-xa-tive)
    | 'LF' // Long Faced (multi-word: L-F)
    | 'Mcs' // Munchies (single-word: Mun-chies)
    | 'Pna' // Paranoia (single-word: Pa-ra-noi-a)
    | 'Rfs' // Refreshing (single-word: Re-fre-shing)
    | 'Szp' // Schizophrenia (single-word: Schi-zo-phre-nia)
    | 'Sdt' // Sedating (single-word: Se-da-ting)
    | 'SI' // Seizure-Inducing (multi-word: S-I)
    | 'Sk' // Shrinking (single-word: Shrin-king)
    | 'Slp' // Slippery (single-word: Sli-ppe-ry)
    | 'Sm' // Smelly (single-word: Sme-lly)
    | 'Sn' // Sneaky (single-word: Snea-ky)
    | 'Sc' // Spicy (single-word: Spi-cy)
    | 'TP' // Thought-Provoking (multi-word: T-P)
    | 'Tx' // Toxic (single-word: To-xic)
    | 'TT' // Tropic Thunder (multi-word: T-T)
    | 'Zbf'; // Zombifying (single-word: Zom-bi-fy-ing)

export type Effect = {
    name: string;
    description: string;
    valueMultiplier: number;
    tier: number;
    addictiveness: number;
};

// Customer types
// This represents the customer's expected Standards quality of product, not their actual spending level
export type SpendingLevel = 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Unknown';

export type CustomerCode =
    // Northtown
    | 'JW' // Jessi Waters
    | 'DM' // Donna Martin
    | 'KH' // Kathy Henderson
    | 'KC' // Kyle Cooley
    | 'AS' // Austin Steiner
    | 'BP' // Beth Penn
    | 'LM' // Ludwig Meyer
    | 'CB' // Chloe Bowers
    | 'PF' // Peter File
    | 'GP' // Geraldine Poon
    | 'PM' // Peggy Mayers
    | 'ST' // Sam Thompson
    | 'ML' // Mick Lubbin
    | 'MM' // Mrs. Ming

    // Westville
    | 'TS' // Trent Sherman
    | 'MC' // Meg Cooley
    | 'JB' // Joyce Ball
    | 'KW' // Keith Wagner
    | 'DL' // Doris Lubbin
    | 'KD' // Kim Delaney
    | 'CR' // Charles Rowland
    | 'JM' // Jerry Montero
    | 'DW' // Dean Webster
    | 'GG' // George Greene
    | 'DS' // Dan Samwell

    // Downtown
    | 'EB' // Eugene Buckley
    | 'RC' // Randy Caulfield
    | 'LF' // Louis Fourier
    | 'EH' // Elizabeth Homley
    | 'LP' // Lucy Pennington
    | 'KO' // Kevin Oakley
    | 'JR' // Jennifer Rivera
    | 'JG' // Jeff Gilmore
    | 'PW' // Philip Wentworth

    // Docks
    | 'CF' // Cranky Frank
    | 'MB' // Marco Barone
    | 'AC' // Anna Chesterfield
    | 'GB' // Genghis Barn
    | 'JP' // Javier Pérez
    | 'GF' // Greg Figgle
    | 'LG' // Lisa Gardener
    | 'MW' // Melissa Wood
    | 'MC2' // Mac Cooper (using MC2 to avoid conflict with Meg Cooley)
    | 'BK' // Billy Kramer

    // Suburbia
    | 'CB2' // Carl Bundy
    | 'JS' // Jackie Stevenson
    | 'JW2' // Jeremy Wilkinson (using JW2 to avoid conflict with Jessi Waters)
    | 'HC' // Harold Colt
    | 'AK' // Alison Knight
    | 'KK' // Karen Kennedy
    | 'JK' // Jack Knight
    | 'CS' // Chris Sullivan
    | 'DK' // Dennis Kennedy
    | 'HS' // Hank Stevenson

    // Uptown
    | 'RH' // Ray Hoffman
    | 'MB2' // Michael Boog (using MB2 to avoid conflict with Marco Barone)
    | 'FH' // Fiona Hancock
    | 'HB' // Herbert Bleuball
    | 'JH' // Jen Heard
    | 'LT' // Lily Turner
    | 'PM2' // Pearl Moore (using PM2 to avoid conflict with Peggy Mayers)
    | 'WC' // Walter Cussler
    | 'TW'; // Tobas Wentworth

export type QualityStandard = 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Unknown';

export type Customer = {
    code: CustomerCode;
    name: string;
    preferences: EffectCode[];
    spendingLevel: SpendingLevel;
    qualityStandard: QualityStandard; // The customer's expected quality standard
    livingLocation: string; // The location where the customer lives/can be unlocked
    schedule: CustomerScheduleEntry[];
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

// Dealer types
export type DealerCode =
    | 'BC' // Benji Coleman (multi-word)
    | 'MP' // Molly Presley (multi-word)
    | 'BR' // Brad Crosby (multi-word)
    | 'JL' // Jane Lucero (multi-word)
    | 'WL' // Wei Long (multi-word)
    | 'LR'; // Leo Rivers (multi-word)

export type Dealer = {
    name: string;
    location: string;
    unlockCost: number;
    cut: number; // Percentage as decimal (e.g., 0.20 for 20%)
};

// Customer schedule types
export type CustomerScheduleEntry = {
    location: string;
    startTime: string;
    endTime?: string;
    entryNumber: number;
};

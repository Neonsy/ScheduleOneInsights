// Product types
export type ProductCode =
    | 'OK' // OG Kush (multi-word)
    | 'SD' // Sour Diesel (multi-word)
    | 'GC' // Green Crack (multi-word)
    | 'GP' // Granddaddy Purple (multi-word)
    | 'Me' // Methamphetamine (single-word: Me-tham-phe-ta-mine)
    | 'Co'; // Cocaine (single-word: Co-caine)

export type Product = {
    name: string;
    price: number;
    unlockLevel: number;
};

// Ingredient types
export type IngredientCode =
    | 'Ad' // Addy (single-word: Ad-dy)
    | 'Ba' // Banana (single-word: Ba-na-na)
    | 'Bt' // Battery (single-word: Bat-te-ry)
    | 'Ch' // Chili (single-word: Chi-li)
    | 'Cu' // Cuke (single-word: Cuke)
    | 'Do' // Donut (single-word: Do-nut)
    | 'ED' // Energy Drink (multi-word)
    | 'FM' // Flu Medicine (multi-word)
    | 'Ga' // Gasoline (single-word: Ga-so-line)
    | 'HS' // Horse Semen (multi-word)
    | 'Io' // Iodine (single-word: I-o-dine)
    | 'MB' // Mega Bean (multi-word)
    | 'MO' // Motor Oil (multi-word)
    | 'MW' // Mouth Wash (multi-word)
    | 'Pa' // Paracetamol (single-word: Pa-ra-ce-ta-mol)
    | 'Vi'; // Viagra (single-word: Vi-a-gra)

export type Ingredient = {
    name: string;
    price: number;
    unlockLevel: number;
    defaultEffect: EffectCode;
};

// Effect types
export type EffectCode =
    | 'AG' // Anti-Gravity (multi-word)
    | 'At' // Athletic (single-word: Ath-le-tic)
    | 'Ba' // Balding (single-word: Bal-ding)
    | 'BE' // Bright-Eyed (multi-word)
    | 'Ca' // Calming (single-word: Cal-ming)
    | 'CD' // Calorie-Dense (multi-word)
    | 'Cy' // Cyclopean (single-word: Cy-clo-pe-an)
    | 'Di' // Disorienting (single-word: Dis-o-ri-en-ting)
    | 'El' // Electrifying (single-word: E-lec-tri-fy-ing)
    | 'En' // Energizing (single-word: En-er-gi-zing)
    | 'Eu' // Euphoric (single-word: Eu-pho-ric)
    | 'Ex' // Explosive (single-word: Ex-plo-sive)
    | 'Fo' // Focused (single-word: Fo-cused)
    | 'Fg' // Foggy (single-word: Fog-gy)
    | 'Gi' // Gingeritis (single-word: Gin-ge-ri-tis)
    | 'Gl' // Glowing (single-word: Glo-wing)
    | 'Je' // Jennerising (single-word: Jen-ne-ri-sing)
    | 'La' // Laxative (single-word: La-xa-tive)
    | 'LF' // Long Faced (multi-word)
    | 'Mu' // Munchies (single-word: Mun-chies)
    | 'Pa' // Paranoia (single-word: Pa-ra-noi-a)
    | 'Re' // Refreshing (single-word: Re-fre-shing)
    | 'Sc' // Schizophrenia (single-word: Schi-zo-phre-nia)
    | 'Se' // Sedating (single-word: Se-da-ting)
    | 'SI' // Seizure-Inducing (multi-word)
    | 'Sh' // Shrinking (single-word: Shrin-king)
    | 'Sl' // Slippery (single-word: Slip-pe-ry)
    | 'Sm' // Smelly (single-word: Smel-ly)
    | 'Sn' // Sneaky (single-word: Snea-ky)
    | 'Sp' // Spicy (single-word: Spi-cy)
    | 'TP' // Thought-Provoking (multi-word)
    | 'To' // Toxic (single-word: To-xic)
    | 'TT' // Tropic Thunder (multi-word)
    | 'Zo'; // Zombifying (single-word: Zom-bi-fy-ing)

export type Effect = {
    name: string;
    description: string;
    valueMultiplier: number;
    tier: number;
    addictiveness: number;
};

// Customer types
export type SpendingLevel = 'Low' | 'Medium' | 'High';

export type CustomerCode =
    // Northtown
    | 'JW' // Jessi Waters
    | 'DM' // Donna Martin
    | 'KH' // Kathy Henderson
    | 'KC' // Kyle Cooley
    | 'AS' // Austin Steiner
    | 'BP' // Beth Penn
    | 'LM' // Ludwig Meyer
    | 'CL' // Chloe Bowers
    | 'PF' // Peter File
    | 'GP' // Geraldine Poon
    | 'PM' // Peggy Meyers
    | 'ST' // Sam Thompson
    | 'ML' // Mick Lubbin

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
    | 'MA' // Mac Cooper

    // Downtown
    | 'EB' // Eugene Buckley
    | 'RC' // Randy Caulfield
    | 'LF' // Louis Fourier
    | 'EH' // Elizabeth Homley
    | 'LP' // Lucy Pennington
    | 'KO' // Kevin Oakley
    | 'JR' // Jennifer Rivera
    | 'JG' // Jeff Gilmore
    | 'ST2' // Sam Thompson (duplicate, using ST2)

    // Docks
    | 'CF' // Cranky Frank
    | 'MB' // Marco Barone
    | 'AC' // Anna Chesterfield
    | 'GB' // Genghis Barn
    | 'JP' // Javier Perez
    | 'GF' // Greg Figgle
    | 'LG' // Lisa Gardner
    | 'PW' // Phillip Wentworth
    | 'MW' // Melissa Wood
    | 'BK' // Billy Kramer

    // Suburbia
    | 'CB' // Carl Bundy
    | 'JS' // Jackie Stevenson
    | 'JW2' // Jeremy Wilkinson (using JW2 to avoid duplicate)
    | 'HC' // Harold Colt
    | 'AK' // Alison Knight
    | 'KK' // Karen Kennedy
    | 'JK' // Jack Knight
    | 'CS' // Chris Sullivan
    | 'DK' // Dennis Kennedy
    | 'HS' // Hank Stevenson

    // Uptown
    | 'RH' // Ray Hoffman
    | 'MB2' // Michael Boog (using MB2 to avoid duplicate)
    | 'FH' // Fiona Hancock
    | 'HB' // Herbert Blueball
    | 'JH' // Jen Heard
    | 'LT' // Lily Turner
    | 'PM2' // Pearl Moore (using PM2 to avoid duplicate)
    | 'WC'; // Walter Cussler

export type Customer = {
    code: CustomerCode;
    name: string;
    preferences: EffectCode[];
    spendingLevel: SpendingLevel;
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

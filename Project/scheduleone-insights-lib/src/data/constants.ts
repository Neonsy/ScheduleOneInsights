// Define constants for quality standards and spending levels
export const QUALITY_STANDARDS = ['Very Low', 'Low', 'Moderate', 'High', 'Unknown'] as const;
export const SPENDING_LEVELS = ['Very Low', 'Low', 'Moderate', 'High', 'Unknown'] as const;

// Derive types from the constants
export type QualityStandard = typeof QUALITY_STANDARDS[number];
export type SpendingLevel = typeof SPENDING_LEVELS[number];

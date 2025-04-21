/**
 * District definitions
 * Defines the available districts in the system
 */

export const districts = {
    Northtown: 'Northtown',
    Westville: 'Westville',
    Downtown: 'Downtown',
    Docks: 'Docks',
    Suburbia: 'Suburbia',
    Uptown: 'Uptown',
} as const;

export type District = keyof typeof districts;

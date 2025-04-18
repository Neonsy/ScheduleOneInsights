import { EffectCode } from '../types';

/**
 * Normalize effect codes to ensure consistency
 * This function ensures that all effect codes used in the application are consistent
 * with the codes defined in the effects.ts file.
 *
 * @param code - The effect code to normalize
 * @returns The normalized effect code
 */
export function normalizeEffectCode(code: string): EffectCode {
    // Map of legacy codes to their normalized versions
    const legacyCodeMap: Record<string, EffectCode> = {
        Enrg: 'Eegz', // Energizing
        Dsrt: 'Dsrtng', // Disorienting
        Elct: 'Elctfng', // Electrifying
        Shrk: 'Shrkg', // Shrinking
        Sdt: 'Sdtng', // Sedating
        Rfs: 'Rfrs', // Refreshing
        SI: 'SI', // Seizure Inducing
        BE: 'BE', // Bright Eyed
        LF: 'LF', // Long Faced
        CD: 'CD', // Calorie-Dense
        TT: 'TT', // Tropic Thunder
        Cm: 'Cm', // Calming
        Spcy: 'Sc', // Spicy
    };

    // If the code is in the legacy map, return the normalized version
    if (code in legacyCodeMap) {
        return legacyCodeMap[code] as EffectCode;
    }

    // Otherwise, return the original code
    return code as EffectCode;
}

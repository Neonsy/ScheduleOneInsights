import { findEffectByName } from '@/code/utils/effects/effectUtils';
import { Rank } from '@/code/types/consts/ranks';

/**
 * Source of truth for all product definitions.
 */
export const products = [
    {
        name: 'OG Kush',
        code: 'OK',
        basePrice: 35,
        defaultEffect: findEffectByName('Calming').match(
            (code) => code,
            (err) => {
                throw new Error(`Static data init failed for product 'OG Kush', effect 'Calming': ${err.message}`);
            }
        ),
        rank: Rank.StreetRatI,
        type: 'Marijuana',
    },
    {
        name: 'Sour Diesel',
        code: 'SD',
        basePrice: 35,
        defaultEffect: findEffectByName('Refreshing').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for product 'Sour Diesel', effect 'Refreshing': ${err.message}`
                );
            }
        ),
        rank: Rank.StreetRatIV,
        type: 'Marijuana',
    },
    {
        name: 'Green Crack',
        code: 'GC',
        basePrice: 35,
        defaultEffect: findEffectByName('Energizing').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for product 'Green Crack', effect 'Energizing': ${err.message}`
                );
            }
        ),
        rank: Rank.HoodlumII,
        type: 'Marijuana',
    },
    {
        name: 'Granddaddy Purple',
        code: 'GP',
        basePrice: 35,
        defaultEffect: findEffectByName('Sedating').match(
            (code) => code,
            (err) => {
                throw new Error(
                    `Static data init failed for product 'Granddaddy Purple', effect 'Sedating': ${err.message}`
                );
            }
        ),
        rank: Rank.HoodlumIV,
        type: 'Marijuana',
    },
    {
        name: 'Meth',
        code: 'M',
        basePrice: 70,
        rank: Rank.HoodlumI,
        type: 'Meth',
    },
    {
        name: 'Cocaine',
        code: 'CC',
        basePrice: 150,
        rank: Rank.EnforcerI,
        type: 'Cocaine',
    },
] as const;

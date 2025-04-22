import { findEffectByName } from '@/utils/effects/effectUtils';
import type { Product } from '@/types/products/Product';
import { Rank } from '@/types/consts/ranks';

export const products: Product[] = [
    {
        name: 'OG Kush',
        code: 'OK',
        basePrice: 35,
        defaultEffect: findEffectByName('Calming'),
        rank: Rank.StreetRatI,
        type: 'Marijuana',
    },
    {
        name: 'Sour Diesel',
        code: 'SD',
        basePrice: 35,
        defaultEffect: findEffectByName('Refreshing'),
        rank: Rank.StreetRatIV,
        type: 'Marijuana',
    },
    {
        name: 'Green Crack',
        code: 'GC',
        basePrice: 35,
        defaultEffect: findEffectByName('Energizing'),
        rank: Rank.HoodlumII,
        type: 'Marijuana',
    },
    {
        name: 'Granddaddy Purple',
        code: 'GP',
        basePrice: 35,
        defaultEffect: findEffectByName('Sedating'),
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
];

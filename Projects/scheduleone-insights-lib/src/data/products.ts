/**
 * Products data - single source of truth
 * All product types and properties are inferred from this data
 */
import { ranks } from '@/data/ranks';
import { findEffectByName } from '@/utils/effectUtils';
import type { Product } from '@/types/Product';

export const products: Product[] = [
    {
        name: 'OG Kush',
        code: 'OK',
        basePrice: 35,
        defaultEffect: findEffectByName('Calming'),
        rank: ranks['Street Rat I'],
        type: 'Marijuana',
    },
    {
        name: 'Sour Diesel',
        code: 'SD',
        basePrice: 35,
        defaultEffect: findEffectByName('Refreshing'),
        rank: ranks['Street Rat IV'],
        type: 'Marijuana',
    },
    {
        name: 'Green Crack',
        code: 'GC',
        basePrice: 35,
        defaultEffect: findEffectByName('Energizing'),
        rank: ranks['Hoodlum II'],
        type: 'Marijuana',
    },
    {
        name: 'Granddaddy Purple',
        code: 'GP',
        basePrice: 35,
        defaultEffect: findEffectByName('Sedating'),
        rank: ranks['Hoodlum IV'],
        type: 'Marijuana',
    },
    {
        name: 'Meth',
        code: 'M',
        basePrice: 70,
        rank: ranks['Hoodlum I'],
        type: 'Meth',
    },
    {
        name: 'Cocaine',
        code: 'CC',
        basePrice: 150,
        rank: ranks['Enforcer I'],
        type: 'Cocaine',
    },
];

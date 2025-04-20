/**
 * Products data - single source of truth
 * All product types and properties are inferred from this data
 */
import { ranks } from '@/data/ranks';
import { ProductType } from '@/types/consts/productTypes';
import { findEffectByName } from '@/utils/effectUtils';

export const products = [
    {
        name: 'OG Kush',
        code: 'OK',
        basePrice: 35,
        defaultEffect: findEffectByName('Calming'),
        rank: ranks['Street Rat I'],
        type: 'Marijuana' as ProductType,
    },
    {
        name: 'Sour Diesel',
        code: 'SD',
        basePrice: 35,
        defaultEffect: findEffectByName('Refreshing'),
        rank: ranks['Street Rat IV'],
        type: 'Marijuana' as ProductType,
    },
    {
        name: 'Green Crack',
        code: 'GC',
        basePrice: 35,
        defaultEffect: findEffectByName('Energizing'),
        rank: ranks['Hoodlum II'],
        type: 'Marijuana' as ProductType,
    },
    {
        name: 'Granddaddy Purple',
        code: 'GP',
        basePrice: 35,
        defaultEffect: findEffectByName('Sedating'),
        rank: ranks['Hoodlum IV'],
        type: 'Marijuana' as ProductType,
    },
    {
        name: 'Meth',
        code: 'M',
        basePrice: 70,
        rank: ranks['Hoodlum I'],
        type: 'Meth' as ProductType,
    },
    {
        name: 'Cocaine',
        code: 'CC',
        basePrice: 150,
        rank: ranks['Enforcer I'],
        type: 'Cocaine' as ProductType,
    },
] as const;

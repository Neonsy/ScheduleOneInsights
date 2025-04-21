/**
 * Dealers data - single source of truth
 * All dealer types and properties are inferred from this data
 */
import { ranks } from '@/data/ranks';
import { districts } from '@/types/consts/districts';
import type { Dealer } from '@/types/Dealer';

export const dealers: Dealer[] = [
    {
        name: 'Benji Coleman',
        code: 'BC',
        cut: 0.2, // 20%
        district: districts.Northtown,
        cost: 500,
        rank: ranks['Street Rat I'],
    },
    {
        name: 'Molly Presley',
        code: 'MP',
        cut: 0.2, // 20%
        district: districts.Westville,
        cost: 1000,
        rank: ranks['Hoodlum I'],
    },
    {
        name: 'Brad Crosby',
        code: 'BC',
        cut: 0.2, // 20%
        district: districts.Downtown,
        cost: 2000,
        rank: ranks['Hustler I'],
    },
    {
        name: 'Jane Lucero',
        code: 'JL',
        cut: 0.2, // 20%
        district: districts.Docks,
        cost: 3000,
        rank: ranks['Enforcer I'],
    },
    {
        name: 'Wei Long',
        code: 'WL',
        cut: 0.2, // 20%
        district: districts.Suburbia,
        cost: 4000,
        rank: ranks['Block Boss I'],
    },
    {
        name: 'Leo Rivers',
        code: 'LR',
        cut: 0.2, // 20%
        district: districts.Uptown,
        cost: 5000,
        rank: ranks['Baron I'],
    },
] as const;

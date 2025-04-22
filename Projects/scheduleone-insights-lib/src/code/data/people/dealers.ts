import type { Dealer } from '@/code/types/people/Dealer';
import { Rank } from '@/code/types/consts/ranks';
import { District } from '@/code/types/consts/districts';

export const dealers: Dealer[] = [
    {
        name: 'Benji Coleman',
        code: 'BC',
        cut: 0.2, // 20%
        district: District.Northtown,
        cost: 500,
        rank: Rank.StreetRatI,
    },
    {
        name: 'Molly Presley',
        code: 'MP',
        cut: 0.2, // 20%
        district: District.Westville,
        cost: 1000,
        rank: Rank.HoodlumI,
    },
    {
        name: 'Brad Crosby',
        code: 'BC',
        cut: 0.2, // 20%
        district: District.Downtown,
        cost: 2000,
        rank: Rank.HustlerI,
    },
    {
        name: 'Jane Lucero',
        code: 'JL',
        cut: 0.2, // 20%
        district: District.Docks,
        cost: 3000,
        rank: Rank.EnforcerI,
    },
    {
        name: 'Wei Long',
        code: 'WL',
        cut: 0.2, // 20%
        district: District.Suburbia,
        cost: 4000,
        rank: Rank.BlockBossI,
    },
    {
        name: 'Leo Rivers',
        code: 'LR',
        cut: 0.2, // 20%
        district: District.Uptown,
        cost: 5000,
        rank: Rank.BaronI,
    },
] as const;

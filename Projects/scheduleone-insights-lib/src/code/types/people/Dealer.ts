import type { District } from '@/code/types/consts/districts';

/**
 * Dealer interface - explicit typing for dealer records
 */
export interface Dealer {
    name: string;
    code: string;
    cut: number;
    district: District;
    cost: number;
    rank: number;
}

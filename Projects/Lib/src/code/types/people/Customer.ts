import { District } from '@/code/types/consts/districts';
import { Effect } from '@/code/types/effects/Effect';

/**
 * Customer interface - strict typing for customer records
 */
export interface Customer {
    /** Full NPC name */
    name: string;

    /** Shorthand code (first letters of each word) */
    code: string;

    /** Home district */
    district: District;

    /** Top 3 desired effect codes */
    preferredEffects: Effect['code'][];

    /** Expected quality tier they pay for */
    expectedQuality: 'Very Low' | 'Low' | 'Moderate' | 'High';

    /** How much they spend per visit (null until filled) */
    spend: number | null;

    /** Daily routine schedule */
    schedule: Array<{
        location: string;
        start: string;
        end: string | null;
    }>;
}

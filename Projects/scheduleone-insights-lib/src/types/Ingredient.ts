/**
 * Ingredient interface - strict typing
 */
import type { Effect } from '@/types/Effect';

export interface Ingredient {
    name: string;
    code: string;
    rank: number;
    price: number;
    defaultEffect: Effect['code'];
    description: string;
}

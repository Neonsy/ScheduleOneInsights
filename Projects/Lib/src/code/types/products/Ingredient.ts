/**
 * Ingredient interface - strict typing
 */
import { ingredients } from '@/code/data/products/ingredients';
import type { EffectCode } from '@/code/types/effects/Effect';

/** Literal union type of all ingredient codes */
export type IngredientCode = (typeof ingredients)[number]['code'];

export interface Ingredient {
    /** Human-readable name of the ingredient */
    readonly name: string;
    /** Specific ingredient code */
    readonly code: IngredientCode;
    /** Required rank level for the ingredient */
    readonly rank: number;
    /** Price of the ingredient */
    readonly price: number;
    /** Default effect code for this ingredient */
    readonly defaultEffect: EffectCode;
    /** Description of the ingredient */
    readonly description: string;
}

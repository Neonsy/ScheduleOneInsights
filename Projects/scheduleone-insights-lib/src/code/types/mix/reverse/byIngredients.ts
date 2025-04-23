/**
 * Payload for reverse mixing by provided ingredients.
 * Defines input parameters for getMixtureByIngredients.
 */
import { Product } from '@/code/types/products/Product';
import { Ingredient } from '@/code/types/products/Ingredient';
import type { MixResult } from '@/code/types/mix/MixResult';

/**
 * Inputs to generate a mixture from provided ingredient list.
 */
export interface ReverseMixByIngredientsPayload {
    /** Code of the base product */
    readonly productCode: Product['code'];
    /** List of ingredient codes to consider (min 1) */
    readonly ingredientCodes: Ingredient['code'][];
    /** Whether all provided ingredients must be used */
    readonly useAllIngredients?: boolean;
    /** Whether provided ingredients can be used multiple times */
    readonly allowRepeats?: boolean;
    /** Mode for selecting best combination */
    readonly resultMode?: 'cheapest' | 'highestProfit';
}

/**
 * Output of the reverse mixing by ingredients.
 */
export interface ReverseMixByIngredientsResult {
    /** Ingredient codes selected */
    readonly ingredientCodes: Ingredient['code'][];
    /** Detailed mix result including cost, profit, etc. */
    readonly result: MixResult;
}

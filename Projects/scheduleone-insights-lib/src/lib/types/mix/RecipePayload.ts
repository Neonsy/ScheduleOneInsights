import { Product } from '@/lib/types/products/Product';
import { Ingredient } from '@/lib/types/products/Ingredient';

/**
 * Payload for seed encoding/decoding of a recipe.
 */
export interface RecipePayload {
    /** Code of the base product */
    productCode: Product['code'];
    /** Ordered list of ingredient codes */
    ingredientCodes: Ingredient['code'][];
}

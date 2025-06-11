import type { Effect, EffectCode } from '@/code/types/effects/Effect';
import type { AppError } from '@/code/types/errors/AppError';
import type { IngredientCode } from '@/code/types/products/Ingredient';

export const INGREDIENT_NOT_FOUND_UTIL_ERROR = 'UTIL_INGREDIENT_NOT_FOUND';
export const EFFECT_NAME_NOT_FOUND_UTIL_ERROR = 'UTIL_EFFECT_NAME_NOT_FOUND';
export const EFFECT_CODE_NOT_FOUND_UTIL_ERROR = 'UTIL_EFFECT_CODE_NOT_FOUND';

export interface IngredientNotFoundUtilError extends AppError {
    readonly type: typeof INGREDIENT_NOT_FOUND_UTIL_ERROR;
    readonly context: {
        readonly ingredientCode: IngredientCode;
    };
}

export interface EffectNameNotFoundUtilError extends AppError {
    readonly type: typeof EFFECT_NAME_NOT_FOUND_UTIL_ERROR;
    readonly context: {
        readonly effectName: Effect['name'];
    };
}

export interface EffectCodeNotFoundUtilError extends AppError {
    readonly type: typeof EFFECT_CODE_NOT_FOUND_UTIL_ERROR;
    readonly context: {
        readonly effectCode: EffectCode;
    };
}

export type UtilError = IngredientNotFoundUtilError | EffectNameNotFoundUtilError | EffectCodeNotFoundUtilError;

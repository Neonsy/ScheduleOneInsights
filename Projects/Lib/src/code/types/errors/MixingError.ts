import type { EffectCode } from '@/code/types/effects/Effect';
import type { AppError } from '@/code/types/errors/AppError';
import type { ProductCode } from '@/code/types/products/Product';

// export const PRODUCT_NOT_FOUND_ERROR = 'MIXING_PRODUCT_NOT_FOUND' as const; // Removed
export const NO_SOLUTION_FOUND_ERROR = 'MIXING_NO_SOLUTION_FOUND';

// export interface ProductNotFoundError extends AppError { // Removed
//     readonly type: typeof PRODUCT_NOT_FOUND_ERROR;
//     readonly context: {
//         readonly productCode: ProductCode;
//     };
// }

export interface NoSolutionFoundError extends AppError {
    readonly type: typeof NO_SOLUTION_FOUND_ERROR;
    readonly context?: {
        readonly productCode?: ProductCode;
        readonly desiredEffectCodes?: readonly EffectCode[];
    };
}

export type MixingError = NoSolutionFoundError; // Updated

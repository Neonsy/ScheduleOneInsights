import type { AppError } from '@/code/types/errors/AppError';
import type { ProductCode } from '@/code/types/products/Product';

export const PRODUCT_NOT_FOUND_PROD_ERROR = 'PRODUCT_NOT_FOUND';

export interface ProductNotFoundProdError extends AppError {
    readonly type: typeof PRODUCT_NOT_FOUND_PROD_ERROR;
    readonly context: {
        readonly productCode: ProductCode;
    };
}

export type ProductError = ProductNotFoundProdError;

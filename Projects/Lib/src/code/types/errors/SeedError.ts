/**
 * Errors for seed encode/decode operations.
 */
export const SEED_DECODE_ERROR = 'SeedDecodeError';

export interface SeedDecodeError {
    readonly type: typeof SEED_DECODE_ERROR;
    readonly message: string;
    readonly context?: unknown;
}

export type SeedError = SeedDecodeError;

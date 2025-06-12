/**
 * Error returned when reverse mixing fails using safeReverseMix.
 */
export const REVERSE_MIX_ERROR = 'ReverseMixError';

export interface ReverseMixError {
    readonly type: typeof REVERSE_MIX_ERROR;
    readonly message: string;
    readonly context?: unknown;
}

/**
 * Typed error returned by safeMixProduct when mixing fails.
 */
export const MIX_ERROR = 'MixError';

export interface MixError {
    readonly type: typeof MIX_ERROR;
    readonly message: string;
    readonly context?: unknown;
}

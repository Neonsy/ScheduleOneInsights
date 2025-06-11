/**
 * Represents a generic application error structure.
 */
export interface AppError {
    readonly type: string; // A unique machine-readable error type, e.g., 'RESOURCE_NOT_FOUND'
    readonly message: string; // A human-readable message
    readonly context?: Record<string, unknown>; // Optional additional context
    readonly cause?: Error; // Optional original error that caused this AppError
}

/**
 * Determines whether a given value conforms to the {@link AppError} interface.
 *
 * @param dto - The value to test.
 * @returns True if {@link dto} is an object with string `type` and `message` properties; otherwise, false.
 */
export function isAppError(dto: unknown): dto is AppError {
    if (dto === null || typeof dto !== 'object') {
        return false;
    }
    const potentialError = dto as AppError;
    return typeof potentialError.type === 'string' && typeof potentialError.message === 'string';
}

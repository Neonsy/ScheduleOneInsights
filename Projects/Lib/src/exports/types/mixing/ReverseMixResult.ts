/**
 * @file Exports mixing result types from the core codebase.
 */

/**
 * Represents a successful result from the reverseMixByEffect function.
 * Contains the cheapest mix result and search statistics.
 */
export { type ReverseMixSuccess } from '@/code/types/mixing/ReverseMixResult';

/**
 * Represents the single cheapest solution found by reverseByEffect.
 */
export { type CheapestReverseMixResult } from '@/code/types/mixing/ReverseMixResult';

/**
 * Represents the statistics of the reverse search operation.
 */
export { type ReverseSearchStats } from '@/code/types/mixing/ReverseMixResult';

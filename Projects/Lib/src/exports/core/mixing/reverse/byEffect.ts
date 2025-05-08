/**
 * @file Exports the reverse mixing by effect algorithm and related types.
 */

/**
 * Calculates the cheapest sequence of ingredients to achieve a target set of effects
 * on a given base product using Dijkstra's algorithm.
 *
 * @param productCode - The code of the base product.
 * @param targetEffectCodes - An array of effect codes to achieve.
 * @returns A Result object containing either the ReverseMixSuccess object (with the cheapest mix and stats)
 *          or an error (ProductNotFoundProdError, NoSolutionFoundError, UtilError).
 */
export { reverseMixByEffect } from '@/code/core/mixing/reverse/byEffect';

/**
 * Represents a successful result from the reverseMixByEffect function.
 * Contains the cheapest mix result and search statistics.
 * This type is defined in the types layer and re-exported here.
 */
export { type ReverseMixSuccess } from '@/code/types/mixing/ReverseMixResult';

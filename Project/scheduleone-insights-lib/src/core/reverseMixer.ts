import { EffectCode, IngredientCode, MixResult, ProductCode } from '../types';
import { products } from '../data/products';
import { ingredients } from '../data/ingredients';
import { effects } from '../data/effects';
import { mixIngredients } from './mixer';
import { memoizeWithLimit } from '../utils/memoize';

// Global cache for mix results to improve performance across function calls
const globalMixCache = new Map<string, MixResult>();

// Memoize the mixIngredients function to improve performance
const memoizedMixIngredients = memoizeWithLimit(
    (productName: string, ingredientNames: string[]) => {
        // Create a cache key
        const sortedIngredients = [...ingredientNames].sort();
        const cacheKey = `${productName}|${sortedIngredients.join('|')}`;

        // Check global cache first
        if (globalMixCache.has(cacheKey)) {
            return globalMixCache.get(cacheKey)!;
        }

        // Calculate the result
        const result = mixIngredients(productName, ingredientNames);

        // Store in global cache
        globalMixCache.set(cacheKey, result);

        return result;
    },
    2000, // Cache up to 2000 results
    (productName, ingredientNames) => `${productName}|${[...ingredientNames].sort().join('|')}`
);

/**
 * Options for finding mixes
 */
export interface FindMixOptions {
    /** Whether to optimize for profit or cost */
    optimizeFor: 'profit' | 'cost';
    /** Whether all selected ingredients must be used */
    mustUseAllIngredients: boolean;
    /** Whether ingredients can be used multiple times */
    allowRepeatedIngredients: boolean;
    /** Maximum search time in milliseconds */
    timeoutMs?: number;
}

/**
 * Result of a mix search
 */
export interface MixSearchResult {
    /** The mix result */
    result: MixResult;
    /** The ingredients used in order */
    ingredientsUsed: string[];
    /** Whether the search was complete or timed out */
    complete: boolean;
}

/**
 * Calculate a score for a mix based on desired effects and optimization criteria
 */
function calculateMixScore(result: MixResult, desiredEffects: EffectCode[], optimizeFor: 'profit' | 'cost'): number {
    // If no desired effects, just optimize for the criteria
    if (desiredEffects.length === 0) {
        return optimizeFor === 'profit' ? result.profit : -result.ingredientCost;
    }

    // Calculate how many of the desired effects are matched
    const effectsMatched = desiredEffects.filter((effect) => result.effects.includes(effect)).length;

    // If no effects matched, return a very low score
    if (effectsMatched === 0) {
        return -Infinity;
    }

    // If not all desired effects are matched, return a low score
    // This ensures we only consider mixes that have ALL the desired effects
    if (effectsMatched < desiredEffects.length) {
        return -1000000 + effectsMatched; // Still give some credit for partial matches
    }

    // All desired effects are matched, so optimize based on criteria
    if (optimizeFor === 'profit') {
        // Higher profit = higher score
        return result.profit;
    } else {
        // Lower cost = higher score (so negate cost)
        return -result.ingredientCost;
    }
}

/**
 * Find the best mix that produces the desired effects
 *
 * @param productCode - The product to use as a base
 * @param desiredEffects - The effects we want to produce
 * @param options - Options for the search
 * @returns The best mix result or null if no combination can produce the desired effects
 */
export function findMixForEffects(productCode: ProductCode, desiredEffects: EffectCode[], options: FindMixOptions): MixSearchResult | null {
    const productName = products[productCode].name;

    // Start time for timeout checking
    const startTime = Date.now();
    const timeoutMs = options.timeoutMs || 5000; // Default 5 seconds

    // Get ingredient names and sort by relevance to desired effects
    const ingredientCodes = Object.keys(ingredients) as IngredientCode[];

    // Sort ingredients by relevance to desired effects
    const sortedIngredientCodes = [...ingredientCodes].sort((a, b) => {
        const aEffects = desiredEffects.filter((effect) => ingredients[a].defaultEffect === effect).length;
        const bEffects = desiredEffects.filter((effect) => ingredients[b].defaultEffect === effect).length;
        return bEffects - aEffects; // Most relevant first
    });

    const ingredientNames = sortedIngredientCodes.map((code) => ingredients[code].name);

    // Initialize best result
    let bestResult: MixResult | null = null;
    let bestIngredients: string[] = [];
    let bestScore = -Infinity;

    // Use a priority queue (simulated with a sorted array) for beam search
    // Each entry has a score, ingredients list, and visited set
    type QueueEntry = {
        score: number;
        ingredients: string[];
        visited: Set<string>;
    };

    let queue: QueueEntry[] = [
        {
            score: 0,
            ingredients: [],
            visited: new Set<string>(),
        },
    ];

    // Track if we completed the search or timed out
    let complete = true;

    // For beam search, we'll keep only the top N candidates at each step
    const beamWidth = 10;

    // Try the base product with no ingredients first
    const baseResult = memoizedMixIngredients(productName, []);
    const baseScore = calculateMixScore(baseResult, desiredEffects, options.optimizeFor);

    if (baseScore > bestScore) {
        bestScore = baseScore;
        bestResult = baseResult;
        bestIngredients = [];
    }

    // Main search loop
    while (queue.length > 0) {
        // Check for timeout
        if (Date.now() - startTime > timeoutMs) {
            complete = false;
            break;
        }

        // Get the current best candidates
        const newQueue: QueueEntry[] = [];

        // Process each candidate in the current queue
        for (const { ingredients: currentIngredients, visited } of queue) {
            // If we've reached the maximum number of ingredients, skip
            if (currentIngredients.length >= 8) {
                continue;
            }

            // Try adding each ingredient
            for (const ingredientName of ingredientNames) {
                // Skip if we've already used this ingredient and repeats aren't allowed
                if (!options.allowRepeatedIngredients && currentIngredients.includes(ingredientName)) {
                    continue;
                }

                // Create a unique key for this combination to avoid duplicates
                const newIngredients = [...currentIngredients, ingredientName];
                const key = newIngredients.slice().sort().join('|');

                // Skip if we've already tried this combination
                if (visited.has(key)) {
                    continue;
                }

                // Try the new combination
                const result = memoizedMixIngredients(productName, newIngredients);
                const score = calculateMixScore(result, desiredEffects, options.optimizeFor);

                // Skip if no effects matched
                if (score === -Infinity) {
                    continue;
                }

                // Update best result if this is better
                if (score > bestScore) {
                    bestScore = score;
                    bestResult = result;
                    bestIngredients = [...newIngredients];
                }

                // Add to new queue for next iteration
                const newVisited = new Set(visited);
                newVisited.add(key);

                newQueue.push({
                    score,
                    ingredients: newIngredients,
                    visited: newVisited,
                });
            }
        }

        // Sort by score and keep only the top candidates (beam search)
        queue = newQueue.sort((a, b) => b.score - a.score).slice(0, beamWidth);
    }

    return bestResult
        ? {
              result: bestResult,
              ingredientsUsed: bestIngredients,
              complete,
          }
        : null;
}

/**
 * Find the best mix using only the available ingredients
 *
 * @param productCode - The product to use as a base
 * @param availableIngredients - The ingredients available to use
 * @param options - Options for the search
 * @returns The best mix result or null if no good combination exists
 */
export function findMixFromIngredients(
    productCode: ProductCode,
    availableIngredients: IngredientCode[],
    options: FindMixOptions
): MixSearchResult | null {
    const productName = products[productCode].name;
    const ingredientNames = availableIngredients.map((code) => ingredients[code].name);

    // Start time for timeout checking
    const startTime = Date.now();
    const timeoutMs = options.timeoutMs || 5000; // Default 5 seconds

    // Initialize best result
    let bestResult: MixResult | null = null;
    let bestIngredients: string[] = [];
    let bestScore = -Infinity;

    // Track if we completed the search or timed out
    let complete = true;

    // If we must use all ingredients and there are too many, return null
    if (options.mustUseAllIngredients && availableIngredients.length > 8) {
        return null;
    }

    // If we must use all ingredients and repeats aren't allowed, just try that one combination
    if (options.mustUseAllIngredients && !options.allowRepeatedIngredients) {
        const result = memoizedMixIngredients(productName, ingredientNames);
        const score = options.optimizeFor === 'profit' ? result.profit : -result.ingredientCost;

        return {
            result,
            ingredientsUsed: ingredientNames,
            complete: true,
        };
    }

    // Generate all possible combinations (with power set algorithm)
    // This is much faster than BFS for small numbers of ingredients
    const generateCombinations = (ingredients: string[]): string[][] => {
        const result: string[][] = [[]];

        for (const ingredient of ingredients) {
            const len = result.length;
            for (let i = 0; i < len; i++) {
                // Check for timeout periodically
                if (i % 100 === 0 && Date.now() - startTime > timeoutMs) {
                    complete = false;
                    return result;
                }

                // Create a new combination with this ingredient
                result.push([...result[i], ingredient]);
            }
        }

        return result;
    };

    // Generate combinations based on whether repeated ingredients are allowed
    let combinations: string[][];

    if (options.allowRepeatedIngredients) {
        // For repeated ingredients, we need to generate combinations with repetition
        // This is more complex, so we'll limit the depth
        combinations = [[]];
        const maxDepth = Math.min(8, ingredientNames.length * 2);

        // Helper function to generate combinations with repetition
        const generateWithRepetition = (current: string[], depth: number) => {
            if (depth >= maxDepth) return;
            if (Date.now() - startTime > timeoutMs) {
                complete = false;
                return;
            }

            for (const ingredient of ingredientNames) {
                const newCombination = [...current, ingredient];
                combinations.push(newCombination);
                generateWithRepetition(newCombination, depth + 1);
            }
        };

        generateWithRepetition([], 0);
    } else {
        // For non-repeated ingredients, use the power set algorithm
        combinations = generateCombinations(ingredientNames);
    }

    // Evaluate each combination
    for (const combo of combinations) {
        // Skip if we've timed out
        if (Date.now() - startTime > timeoutMs) {
            complete = false;
            break;
        }

        // Skip if we must use all ingredients but this combo doesn't
        if (options.mustUseAllIngredients && combo.length !== ingredientNames.length) {
            continue;
        }

        // Skip if the combo is too large
        if (combo.length > 8) {
            continue;
        }

        // Try this combination
        const result = memoizedMixIngredients(productName, combo);
        const score = options.optimizeFor === 'profit' ? result.profit : -result.ingredientCost;

        // Update best result if this is better
        if (score > bestScore) {
            bestScore = score;
            bestResult = result;
            bestIngredients = [...combo];
        }
    }

    return bestResult
        ? {
              result: bestResult,
              ingredientsUsed: bestIngredients,
              complete,
          }
        : null;
}

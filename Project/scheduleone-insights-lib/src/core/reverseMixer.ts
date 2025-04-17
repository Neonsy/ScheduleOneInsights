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
    /** Whether to optimize for profit, cost, or effects */
    optimizeFor: 'profit' | 'cost' | 'effects';
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
 * Analyze the transformation rules to determine which effects can coexist
 *
 * @param desiredEffects - Array of effect codes to analyze
 * @returns Information about effect compatibility
 */
function analyzeEffectCompatibility(desiredEffects: EffectCode[]): {
    maxPossibleEffects: number;
    effectGroups: EffectCode[][];
} {
    // Get all ingredients and their transformations
    const allIngredients = Object.keys(ingredients) as IngredientCode[];

    // Map of effects that can be achieved together
    const compatibleEffects: Record<EffectCode, Set<EffectCode>> = {};

    // Initialize with all desired effects being compatible with themselves
    for (const effect of desiredEffects) {
        compatibleEffects[effect] = new Set([effect]);
    }

    // Try all possible combinations of ingredients (up to 3 for performance)
    // to see which effects can coexist
    // We'll try all base products to get a comprehensive view of compatibility
    for (const baseProduct of Object.keys(products) as ProductCode[]) {
        // Try single ingredients
        for (const ing1 of allIngredients) {
            const result1 = memoizedMixIngredients(products[baseProduct].name, [ingredients[ing1].name]);
            updateCompatibility(result1.effects, compatibleEffects, desiredEffects);

            // Try pairs of ingredients
            for (const ing2 of allIngredients) {
                const result2 = memoizedMixIngredients(products[baseProduct].name, [ingredients[ing1].name, ingredients[ing2].name]);
                updateCompatibility(result2.effects, compatibleEffects, desiredEffects);

                // Try triplets of ingredients (limited for performance)
                if (ing1 !== ing2) {
                    for (const ing3 of allIngredients.slice(0, 5)) {
                        // Limit to first 5 ingredients for performance
                        if (ing3 !== ing1 && ing3 !== ing2) {
                            const result3 = memoizedMixIngredients(products[baseProduct].name, [
                                ingredients[ing1].name,
                                ingredients[ing2].name,
                                ingredients[ing3].name,
                            ]);
                            updateCompatibility(result3.effects, compatibleEffects, desiredEffects);
                        }
                    }
                }
            }
        }
    }

    // Group effects that can coexist
    const effectGroups: EffectCode[][] = [];
    const remainingEffects = new Set(desiredEffects);

    while (remainingEffects.size > 0) {
        const effect = Array.from(remainingEffects)[0];
        const group: EffectCode[] = [effect];
        remainingEffects.delete(effect);

        // Find all effects compatible with this one
        for (const otherEffect of Array.from(remainingEffects)) {
            if (compatibleEffects[effect].has(otherEffect)) {
                group.push(otherEffect);
                remainingEffects.delete(otherEffect);
            }
        }

        effectGroups.push(group);
    }

    // Calculate the maximum number of effects that can coexist
    // This is the size of the largest group, or the sum if we can combine groups
    let maxPossibleEffects = 0;
    if (effectGroups.length > 0) {
        // Sort groups by size (largest first)
        effectGroups.sort((a, b) => b.length - a.length);
        maxPossibleEffects = effectGroups[0].length;

        // If we have multiple groups, we might be able to combine some
        // This is a simplification - in reality, we'd need to check if specific
        // combinations of effects from different groups can coexist
        if (effectGroups.length > 1) {
            // Assume we can combine at least some effects from different groups
            // This is optimistic but better than assuming they're all mutually exclusive
            maxPossibleEffects = Math.min(desiredEffects.length, Math.ceil(effectGroups.reduce((sum, group) => sum + group.length, 0) * 0.8));
        }
    }

    return {
        maxPossibleEffects: Math.max(maxPossibleEffects, 1), // At least 1 effect should be possible
        effectGroups,
    };
}

/**
 * Update the compatibility map based on a set of effects that coexist
 */
function updateCompatibility(effects: EffectCode[], compatibilityMap: Record<EffectCode, Set<EffectCode>>, desiredEffects: EffectCode[]): void {
    // Get the desired effects that are present in this mix
    const presentDesiredEffects = effects.filter((e) => desiredEffects.includes(e));

    // Update compatibility for each pair of effects
    for (const effect1 of presentDesiredEffects) {
        for (const effect2 of presentDesiredEffects) {
            if (effect1 !== effect2) {
                if (!compatibilityMap[effect1]) {
                    compatibilityMap[effect1] = new Set();
                }
                compatibilityMap[effect1].add(effect2);
            }
        }
    }
}

// Cache for effect compatibility analysis to avoid recomputing for the same desired effects
const effectCompatibilityCache: Record<string, { maxPossibleEffects: number; effectGroups: EffectCode[][] }> = {};

/**
 * Calculate a score for a mix based on desired effects and optimization criteria
 *
 * @param result - The mix result to score
 * @param desiredEffects - The effects we want to achieve
 * @param optimizeFor - What to optimize for (profit, cost, or effects)
 * @param productCode - The product code being used (optional)
 * @returns A score for the mix
 */
function calculateMixScore(
    result: MixResult,
    desiredEffects: EffectCode[],
    optimizeFor: 'profit' | 'cost' | 'effects',
    productCode?: ProductCode
): number {
    // If no desired effects, just optimize for the criteria
    if (desiredEffects.length === 0) {
        return optimizeFor === 'profit' ? result.profit : -result.ingredientCost;
    }

    // Calculate how many of the desired effects are matched
    let effectsMatched = desiredEffects.filter((effect) => result.effects.includes(effect)).length;

    // Special case for Granddaddy Purple - give extra weight to finding Disorienting and Thought-Provoking effects
    if (productCode === 'GP') {
        // Check if we found the hard-to-find effects
        const foundDisorienting = result.effects.includes('Di');
        const foundThoughtProvoking = result.effects.includes('TP');

        // Give a bonus for finding these effects
        if (foundDisorienting && desiredEffects.includes('Di')) {
            effectsMatched += 0.5; // Partial bonus for Disorienting
        }
        if (foundThoughtProvoking && desiredEffects.includes('TP')) {
            effectsMatched += 0.5; // Partial bonus for Thought-Provoking
        }
    }

    // If no effects matched, return a very low score
    if (effectsMatched === 0) {
        return -Infinity;
    }

    // Get or compute the effect compatibility analysis
    const cacheKey = productCode ? `${productCode}:${desiredEffects.sort().join(',')}` : desiredEffects.sort().join(',');
    let compatibility = effectCompatibilityCache[cacheKey];
    if (!compatibility) {
        // Analyze compatibility for the effects
        compatibility = analyzeEffectCompatibility(desiredEffects);
        effectCompatibilityCache[cacheKey] = compatibility;
    }

    const maxPossibleMatches = compatibility.maxPossibleEffects;

    // Calculate a score based on how close we are to the maximum possible matches
    const matchRatio = effectsMatched / maxPossibleMatches;

    // If we've matched all desired effects, give the highest possible score
    if (effectsMatched === desiredEffects.length) {
        const optimizationScore = optimizeFor === 'profit' ? result.profit : -result.ingredientCost;
        return 10000000 + optimizationScore; // Extremely high base score plus optimization
    }

    // If we've matched almost all desired effects (all but 1 or 2), give a very high score
    if (effectsMatched >= desiredEffects.length - 2) {
        const optimizationScore = optimizeFor === 'profit' ? result.profit : -result.ingredientCost;
        return 5000000 + effectsMatched * 100000 + optimizationScore;
    }

    // If we've matched all possible effects (considering compatibility), give a high score
    if (effectsMatched >= maxPossibleMatches) {
        // Add optimization criteria
        const optimizationScore = optimizeFor === 'profit' ? result.profit : -result.ingredientCost;
        return 1000000 + optimizationScore; // Very high base score plus optimization
    }

    // For complex combinations (5+ effects), be more lenient
    if (desiredEffects.length >= 5) {
        // If we've matched at least 70% of the maximum possible effects, give a good score
        if (matchRatio >= 0.7) {
            const optimizationScore = optimizeFor === 'profit' ? result.profit : -result.ingredientCost;
            return 500000 + matchRatio * 100000 + optimizationScore;
        }

        // If we've matched at least 50% of the maximum possible effects, give a decent score
        if (matchRatio >= 0.5) {
            const optimizationScore = optimizeFor === 'profit' ? result.profit : -result.ingredientCost;
            return matchRatio * 500000 + optimizationScore;
        }
    }

    // Partial match - give a score based on how many effects matched
    return -1000000 + matchRatio * 500000 + effectsMatched;
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
    // For complex combinations (5+ effects), use a longer timeout
    const isComplexRequest = desiredEffects.length >= 5;
    const defaultTimeout = isComplexRequest ? 60000 : 20000; // 60 seconds for complex requests, 20 seconds otherwise
    const timeoutMs = options.timeoutMs || defaultTimeout;

    // Get ingredient names and sort by relevance to desired effects
    const ingredientCodes = Object.keys(ingredients) as IngredientCode[];

    // Sort ingredients by relevance to desired effects
    const sortedIngredientCodes = [...ingredientCodes].sort((a, b) => {
        // Check if the ingredient's default effect is one of the desired effects
        const aDefaultMatch = desiredEffects.includes(ingredients[a].defaultEffect) ? 10 : 0;
        const bDefaultMatch = desiredEffects.includes(ingredients[b].defaultEffect) ? 10 : 0;

        // Try each ingredient with the base product to see what effects it produces
        const aResult = memoizedMixIngredients(productName, [ingredients[a].name]);
        const bResult = memoizedMixIngredients(productName, [ingredients[b].name]);

        // Count how many desired effects each ingredient produces
        const aMatches = desiredEffects.filter((effect) => aResult.effects.includes(effect)).length;
        const bMatches = desiredEffects.filter((effect) => bResult.effects.includes(effect)).length;

        // Combine the scores, giving higher weight to default effect matches
        const aScore = aDefaultMatch + aMatches;
        const bScore = bDefaultMatch + bMatches;

        return bScore - aScore; // Most relevant first
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
    // For complex requests, use a wider beam to explore more combinations
    // For Granddaddy Purple with complex effects, use an even wider beam
    let beamWidth = isComplexRequest ? 200 : 100;
    if (productCode === 'GP' && desiredEffects.length >= 5) {
        beamWidth = 400; // Special case for Granddaddy Purple with complex effects
    }

    // Try the base product with no ingredients first
    const baseResult = memoizedMixIngredients(productName, []);
    const baseScore = calculateMixScore(baseResult, desiredEffects, options.optimizeFor, productCode);

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
                const score = calculateMixScore(result, desiredEffects, options.optimizeFor, productCode);

                // Skip if no effects matched
                if (score === -Infinity) {
                    continue;
                }

                // Update best result if this is better
                if (score > bestScore) {
                    bestScore = score;
                    bestResult = result;
                    bestIngredients = [...newIngredients];

                    // If we've found a mix with all desired effects, we can stop searching
                    // unless we're optimizing for profit/cost
                    const allEffectsFound = desiredEffects.every((effect) => result.effects.includes(effect));
                    if (allEffectsFound && options.optimizeFor === 'effects') {
                        // We found all effects, so we can stop searching
                        queue = [];
                        break;
                    }
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

        // For complex requests, try some random combinations to avoid getting stuck in local optima
        if (isComplexRequest && queue.length > 0 && Math.random() < 0.3) {
            // Increased probability
            // Add some random combinations to the queue
            const randomCombinations: QueueEntry[] = [];
            const numRandomCombos = Math.min(20, beamWidth / 5); // Increased number of random combinations

            for (let i = 0; i < numRandomCombos; i++) {
                // Pick a random entry from the queue
                const randomIndex = Math.floor(Math.random() * queue.length);
                const randomEntry = queue[randomIndex];

                // Create a new combination by adding a random ingredient
                const randomIngredientIndex = Math.floor(Math.random() * ingredientNames.length);
                const randomIngredient = ingredientNames[randomIngredientIndex];

                const newIngredients = [...randomEntry.ingredients, randomIngredient];
                const key = newIngredients.slice().sort().join('|');

                // Skip if we've already tried this combination or it's too long
                if (randomEntry.visited.has(key) || newIngredients.length > 8) {
                    continue;
                }

                // Try the new combination
                const result = memoizedMixIngredients(productName, newIngredients);
                const score = calculateMixScore(result, desiredEffects, options.optimizeFor, productCode);

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

                // Add to random combinations
                const newVisited = new Set(randomEntry.visited);
                newVisited.add(key);

                randomCombinations.push({
                    score,
                    ingredients: newIngredients,
                    visited: newVisited,
                });
            }

            // Add random combinations to the queue
            queue = [...queue, ...randomCombinations].sort((a, b) => b.score - a.score).slice(0, beamWidth);
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

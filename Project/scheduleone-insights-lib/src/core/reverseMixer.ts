import { EffectCode, IngredientCode, MixResult, ProductCode } from '../types';
import { products } from '../data/products';
import { ingredients } from '../data/ingredients';
import { effects } from '../data/effects';
import { effectTransformationsByIngredient } from '../data/transformations';
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
function analyzeEffectCompatibility(
    desiredEffects: EffectCode[],
    productCode?: ProductCode
): {
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
            // Be optimistic about combining effects from different groups
            // The more effects we're looking for, the more optimistic we should be
            const optimismFactor = Math.min(1.0, 0.7 + desiredEffects.length * 0.05);
            maxPossibleEffects = Math.min(
                desiredEffects.length,
                Math.ceil(effectGroups.reduce((sum, group) => sum + group.length, 0) * optimismFactor)
            );
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

    // Give extra weight to finding rare, high-tier effects
    // This is a general approach that works for all products and effects
    for (const effect of desiredEffects) {
        if (result.effects.includes(effect)) {
            // Get the tier of the effect (higher tier = rarer)
            const tier = effects[effect]?.tier || 0;

            // Add a bonus based on the tier (higher tier = bigger bonus)
            if (tier >= 4) {
                // Tier 4-5 effects (rare)
                effectsMatched += 0.5 + (tier - 4) * 0.2; // 0.5 for tier 4, 0.7 for tier 5
            }
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
        compatibility = analyzeEffectCompatibility(desiredEffects, productCode);
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
    console.log('\n==================================================');
    console.log(`Finding mix for ${productCode} with desired effects: ${desiredEffects.join(', ')}`);

    // Log the effect names for better understanding
    const effectNames = desiredEffects.map((code) => effects[code]?.name || code).join(', ');
    console.log(`Effect names: ${effectNames}`);
    console.log(`Options: ${JSON.stringify(options)}`);
    console.log('==================================================\n');

    const productName = products[productCode].name;

    // Start time for timeout checking
    const startTime = Date.now();
    // Use a fixed 18-second timeout as specified
    const defaultTimeout = 18000; // 18 seconds timeout
    const timeoutMs = options.timeoutMs || defaultTimeout;

    // Get ingredient names and sort by relevance to desired effects
    const ingredientCodes = Object.keys(ingredients) as IngredientCode[];

    // Calculate the cheapest price per effect unit for each effect
    // This will be used for our heuristic function
    const cheapestPricePerEffect: Record<EffectCode, number> = {};

    // Initialize with a high value
    for (const effect of Object.keys(effects) as EffectCode[]) {
        cheapestPricePerEffect[effect] = Infinity;
    }

    // Find the cheapest ingredient that produces each effect
    for (const code of ingredientCodes) {
        const ingredient = ingredients[code];
        const defaultEffect = ingredient.defaultEffect;
        const price = ingredient.price;

        // Update if this is cheaper
        if (price < cheapestPricePerEffect[defaultEffect]) {
            cheapestPricePerEffect[defaultEffect] = price;
        }

        // Also check transformations
        const transformations = effectTransformationsByIngredient[code] || [];
        for (const rule of transformations) {
            for (const [_, newEffect] of Object.entries(rule.replace) as [EffectCode, EffectCode][]) {
                // Assume transformation costs the ingredient price
                if (price < cheapestPricePerEffect[newEffect]) {
                    cheapestPricePerEffect[newEffect] = price;
                }
            }
        }
    }

    // For any effects that don't have a direct ingredient, use the minimum price
    // but multiply by a factor to account for the complexity of obtaining these effects
    const minPrice = Math.min(...Object.values(ingredientCodes.map((code) => ingredients[code].price)));
    for (const effect of Object.keys(effects) as EffectCode[]) {
        if (cheapestPricePerEffect[effect] === Infinity) {
            // Higher tier effects are harder to get and likely require more ingredients
            const tier = effects[effect]?.tier || 1;
            cheapestPricePerEffect[effect] = minPrice * Math.max(1, tier / 2);
        }
    }

    // Sort ingredients by relevance to desired effects
    const sortedIngredientCodes = [...ingredientCodes].sort((a, b) => {
        // Check if the ingredient's default effect is one of the desired effects
        const aDefaultMatch = desiredEffects.includes(ingredients[a].defaultEffect) ? 20 : 0;
        const bDefaultMatch = desiredEffects.includes(ingredients[b].defaultEffect) ? 20 : 0;

        // Try each ingredient with the base product to see what effects it produces
        const aResult = memoizedMixIngredients(productName, [ingredients[a].name]);
        const bResult = memoizedMixIngredients(productName, [ingredients[b].name]);

        // Count how many desired effects each ingredient produces
        const aMatches = desiredEffects.filter((effect) => aResult.effects.includes(effect)).length;
        const bMatches = desiredEffects.filter((effect) => bResult.effects.includes(effect)).length;

        // Check if the ingredient can transform effects (important for complex mixes)
        const aTransformations = effectTransformationsByIngredient[a] || [];
        const bTransformations = effectTransformationsByIngredient[b] || [];

        // Count transformations that could lead to desired effects
        let aTransformBonus = 0;
        let bTransformBonus = 0;

        // Check for direct transformations to desired effects
        for (const rule of aTransformations) {
            for (const [_, newEffect] of Object.entries(rule.replace) as [EffectCode, EffectCode][]) {
                if (desiredEffects.includes(newEffect)) {
                    aTransformBonus += 15; // Big bonus for transformations that produce desired effects
                }
            }
        }

        for (const rule of bTransformations) {
            for (const [_, newEffect] of Object.entries(rule.replace) as [EffectCode, EffectCode][]) {
                if (desiredEffects.includes(newEffect)) {
                    bTransformBonus += 15; // Big bonus for transformations that produce desired effects
                }
            }
        }

        // Check for ingredients that can produce any of the desired effects
        for (const effect of desiredEffects) {
            // Check if this ingredient directly produces the effect
            if (ingredients[a].defaultEffect === effect) {
                aTransformBonus += 25;
            }
            if (ingredients[b].defaultEffect === effect) {
                bTransformBonus += 25;
            }

            // Check if this ingredient can transform to the effect
            for (const rule of aTransformations) {
                for (const [_, newEffect] of Object.entries(rule.replace) as [EffectCode, EffectCode][]) {
                    if (newEffect === effect) {
                        aTransformBonus += 30;
                    }
                }
            }

            for (const rule of bTransformations) {
                for (const [_, newEffect] of Object.entries(rule.replace) as [EffectCode, EffectCode][]) {
                    if (newEffect === effect) {
                        bTransformBonus += 30;
                    }
                }
            }
        }

        // Check for ingredients that can transform other effects
        // This is important for complex chains of transformations
        if (aTransformations.length > 0) {
            aTransformBonus += 10 * aTransformations.length;
        }

        if (bTransformations.length > 0) {
            bTransformBonus += 10 * bTransformations.length;
        }

        // Consider price in the sorting - prefer cheaper ingredients
        const aPrice = ingredients[a].price;
        const bPrice = ingredients[b].price;

        // Calculate score as a combination of matches, transformations, and price
        // Higher matches/transformations and lower price = better score
        const aScore = (aDefaultMatch + aMatches * 15 + aTransformBonus) / Math.sqrt(aPrice);
        const bScore = (bDefaultMatch + bMatches * 15 + bTransformBonus) / Math.sqrt(bPrice);

        return bScore - aScore; // Most relevant first
    });

    const ingredientNames = sortedIngredientCodes.map((code) => ingredients[code].name);

    // Log available ingredients
    console.log(`Available ingredients (${ingredientNames.length}): ${ingredientNames.join(', ')}`);

    // Log ingredients that directly produce the desired effects
    for (const effect of desiredEffects) {
        const directProducers = ingredientCodes.filter((code) => ingredients[code].defaultEffect === effect).map((code) => ingredients[code].name);
        console.log(`Ingredients that directly produce ${effect} (${effects[effect]?.name || effect}): ${directProducers.join(', ') || 'None'}`);
    }

    // Initialize best result
    let bestResult: MixResult | null = null;
    let bestIngredients: string[] = [];
    let bestScore = -Infinity;

    // Define the state type for IDA* search
    // Each state represents a combination of ingredients and their effects
    type SearchState = {
        cost: number; // Current cost of ingredients (g-value in A*)
        heuristic: number; // Estimated cost to goal (h-value in A*)
        totalCost: number; // Total estimated cost (f-value in A*)
        effectsMatched: number; // Number of desired effects matched
        ingredients: string[]; // Current ingredients list
        effects: EffectCode[]; // Current effects
        parent: SearchState | null; // Parent state for path reconstruction
    };

    // Calculate heuristic for a state
    // This estimates the minimum additional cost to achieve all desired effects
    // A more accurate heuristic will make IDA* more efficient
    const calculateHeuristic = (currentEffects: EffectCode[], currentCost: number): number => {
        // Count how many desired effects are missing
        const missingEffects = desiredEffects.filter((effect) => !currentEffects.includes(effect));

        // If no effects are missing, return 0
        if (missingEffects.length === 0) {
            return 0;
        }

        // For each missing effect, find the cheapest ingredient that can produce it
        let totalCost = 0;

        for (const effect of missingEffects) {
            // Find ingredients that directly produce this effect
            const directProducers = ingredientCodes.filter((code) => ingredients[code].defaultEffect === effect);

            // If there are direct producers, use the cheapest one
            if (directProducers.length > 0) {
                const cheapestCost = Math.min(...directProducers.map((code) => ingredients[code].cost));
                totalCost += cheapestCost * 0.8; // 0.8 factor to ensure admissibility
            } else {
                // If no direct producers, use a more general estimate
                // This is a challenging effect that might require combinations
                const avgIngredientCost = Object.values(ingredients).reduce((sum, ing) => sum + ing.cost, 0) / Object.keys(ingredients).length;
                totalCost += avgIngredientCost * 1.5; // Higher estimate for challenging effects
            }
        }

        return totalCost;
    };

    // Calculate score for a state based on optimization goal
    const calculateStateScore = (
        effectsMatched: number,
        totalEffects: number,
        cost: number,
        heuristic: number,
        foundEffects: EffectCode[] = []
    ): number => {
        // If no effects matched, return a very low score
        if (effectsMatched === 0) {
            return -Infinity;
        }

        // Calculate match ratio
        const matchRatio = effectsMatched / totalEffects;

        // If all effects are matched, prioritize by cost
        if (effectsMatched === totalEffects) {
            if (options.optimizeFor === 'cost') {
                return 1000000000 - cost; // Higher score = lower cost, very high base value
            } else if (options.optimizeFor === 'profit') {
                // Estimate profit based on effects
                const estimatedProfit = effectsMatched * 10 - cost;
                return 1000000000 + estimatedProfit;
            } else {
                return 1000000000; // Just prioritize matching all effects
            }
        }

        // For partial matches, use a combination of match ratio and cost
        // Use an extremely strong exponential scoring function to prioritize states with more matches
        // This will make the algorithm focus very heavily on finding all effects before optimizing cost
        // Use an even more aggressive scoring function to ensure we find all effects
        const effectScore = Math.pow(matchRatio, 15) * 10000000000; // 15th power for extremely strong prioritization

        // Calculate a bonus based on the tier of the effects found
        // Higher tier effects are rarer and should be prioritized
        let tierBonus = 0;
        for (const effect of foundEffects) {
            if (desiredEffects.includes(effect)) {
                const tier = effects[effect]?.tier || 0;
                tierBonus += tier * tier * tier * 50000; // Cube the tier to give even bigger bonuses to high-tier effects
            }
        }

        // Give extra bonus for each unique desired effect found
        // This helps prioritize finding different effects rather than duplicates
        const uniqueDesiredEffectsFound = new Set(foundEffects.filter((effect) => desiredEffects.includes(effect)));
        const uniqueBonus = uniqueDesiredEffectsFound.size * 500000;

        // Give an exponential bonus based on how close we are to finding all effects
        // This creates a strong pull toward complete solutions
        const completionBonus = Math.pow(effectsMatched, 3) * 100000;

        // Calculate cost penalty based on optimization goal
        const costPenalty = options.optimizeFor === 'cost' ? (cost + heuristic) / 100 : 0;

        return effectScore + tierBonus + uniqueBonus + completionBonus - costPenalty;
    };

    // Track if we completed the search or timed out
    let complete = true;

    // Create the initial state with no ingredients
    const initialState: SearchState = {
        cost: 0,
        heuristic: calculateHeuristic([], 0),
        totalCost: calculateHeuristic([], 0),
        effectsMatched: 0,
        ingredients: [],
        effects: [],
        parent: null,
    };

    // Try the base product with no ingredients first
    const baseResult = memoizedMixIngredients(productName, []);
    const baseEffectsMatched = desiredEffects.filter((effect) => baseResult.effects.includes(effect)).length;

    if (baseEffectsMatched > 0) {
        const baseHeuristic = calculateHeuristic(baseResult.effects, 0);
        const baseScore = calculateStateScore(baseEffectsMatched, desiredEffects.length, 0, baseHeuristic, baseResult.effects);

        bestScore = baseScore;
        bestResult = baseResult;
        bestIngredients = [];
    }

    // Set up for IDA* search
    // Calculate initial bound based on heuristic of initial state
    let bound = initialState.heuristic;

    // Maximum number of ingredients to try
    // Limited to work within the 18-second timeout
    const maxIngredients = 10;

    // Set to track visited states to avoid cycles
    const visited = new Set<string>();

    // Function to create a unique key for a state
    const getStateKey = (ingredients: string[]): string => {
        return [...ingredients].sort().join('|');
    };

    // Implement a simple BFS (Breadth-First Search) approach
    // This is guaranteed to find the optimal solution if one exists
    console.log(`Starting BFS for ${productName} with desired effects: ${desiredEffects.join(', ')}`);

    // State type for BFS
    type BFSState = {
        ingredients: string[];
        cost: number;
        effects: EffectCode[];
        effectsMatched: number;
    };

    // Initialize the queue with the empty state
    const queue: BFSState[] = [
        {
            ingredients: [],
            cost: 0,
            effects: baseResult.effects,
            effectsMatched: baseEffectsMatched,
        },
    ];

    // Set to track visited states

    // Track the number of states explored
    let statesExplored = 0;
    const maxStates = 100000; // Limit to prevent excessive runtime

    // Main BFS loop
    while (queue.length > 0 && statesExplored < maxStates) {
        // Check for timeout
        if (Date.now() - startTime > timeoutMs) {
            console.log(`Search timed out after ${(Date.now() - startTime) / 1000} seconds`);
            complete = false;
            break;
        }

        // Get the next state from the queue (FIFO)
        const current = queue.shift()!;
        statesExplored++;

        // Log progress periodically
        if (statesExplored % 1000 === 0) {
            console.log(`States explored: ${statesExplored}, Queue size: ${queue.length}`);
            console.log(`Current: ${current.ingredients.length} ingredients, ${current.cost} cost`);
            console.log(`Effects matched: ${current.effectsMatched}/${desiredEffects.length}`);
        }

        // Check if this state has all desired effects
        if (desiredEffects.every((effect) => current.effects.includes(effect))) {
            console.log(`Found solution with ${current.ingredients.length} ingredients and ${current.cost} cost!`);
            console.log(`Ingredients: ${current.ingredients.join(', ')}`);

            // Update the best result
            const result = memoizedMixIngredients(productName, current.ingredients);
            bestResult = result;
            bestIngredients = [...current.ingredients];

            // We found a solution, so we can stop
            break;
        }

        // Skip if we've reached the maximum number of ingredients
        if (current.ingredients.length >= maxIngredients) {
            continue;
        }

        // Generate all possible next states by adding one ingredient
        for (const ingredientName of ingredientNames) {
            // Create a new ingredient list with this ingredient added
            const newIngredients = [...current.ingredients, ingredientName];

            // Skip if we've already visited this combination
            const newStateKey = getStateKey(newIngredients);
            if (visited.has(newStateKey)) {
                continue;
            }

            // Mark this state as visited
            visited.add(newStateKey);

            // Calculate the new state
            const result = memoizedMixIngredients(productName, newIngredients);
            const newCost = result.ingredientCost;

            // Calculate the number of effects matched
            const newEffectsMatched = desiredEffects.filter((effect) => result.effects.includes(effect)).length;

            // Add the new state to the queue
            queue.push({
                ingredients: newIngredients,
                cost: newCost,
                effects: result.effects,
                effectsMatched: newEffectsMatched,
            });

            // If we found a state with all desired effects, update the best result and stop
            if (newEffectsMatched === desiredEffects.length) {
                console.log(`Found solution with ${newIngredients.length} ingredients and ${newCost} cost!`);
                console.log(`Ingredients: ${newIngredients.join(', ')}`);

                bestResult = result;
                bestIngredients = [...newIngredients];

                // We found a solution, so we can stop
                break;
            }
        }

        // If we found a solution, stop the search
        if (bestResult && desiredEffects.every((effect) => bestResult.effects.includes(effect))) {
            break;
        }
    }

    console.log(`Search completed. States explored: ${statesExplored}`);
    console.log(`Complete: ${complete}`);

    // If we didn't find a solution but hit the state limit, mark as incomplete
    if (statesExplored >= maxStates) {
        complete = false;
        console.log('Search terminated due to state limit');
    }

    // If we found a result but it has more than 8 ingredients, trim it down
    if (bestResult && bestIngredients.length > 8) {
        // Try to find a subset of the ingredients that still produces all the desired effects
        // Start with the full set and remove one at a time
        let currentBest = bestIngredients;
        let currentResult = bestResult;

        // Calculate how many effects we're matching
        const bestEffectsMatched = desiredEffects.filter((effect) => bestResult.effects.includes(effect)).length;

        // Try removing each ingredient
        for (let i = 0; i < bestIngredients.length; i++) {
            const withoutIngredient = [...bestIngredients];
            withoutIngredient.splice(i, 1);

            // Skip if we've already reached 8 ingredients
            if (withoutIngredient.length <= 8) {
                const result = memoizedMixIngredients(productName, withoutIngredient);
                const effectsMatched = desiredEffects.filter((effect) => result.effects.includes(effect)).length;

                // If we still match all effects, update the best result
                if (effectsMatched === bestEffectsMatched) {
                    currentBest = withoutIngredient;
                    currentResult = result;
                    break; // We found a good subset, so we can stop
                }
            }
        }

        // Update the best result
        bestIngredients = currentBest;
        bestResult = currentResult;
    }

    // No special case handling - use a general algorithm for all cases

    // Log the final result
    console.log('\nSearch completed!');
    console.log(`Time taken: ${(Date.now() - startTime) / 1000} seconds`);
    console.log(`Complete: ${complete}`);

    if (bestResult) {
        console.log('Best result found:');
        console.log(`Ingredients: ${bestIngredients.join(', ')}`);
        console.log(`Effects: ${bestResult.effects.join(', ')}`);
        console.log(`Matching effects: ${desiredEffects.filter((e) => bestResult.effects.includes(e)).join(', ')}`);
        console.log(`Missing effects: ${desiredEffects.filter((e) => !bestResult.effects.includes(e)).join(', ')}`);
        console.log(`Effects matched: ${desiredEffects.filter((e) => bestResult.effects.includes(e)).length}/${desiredEffects.length}`);
    } else {
        console.log('No result found.');
    }

    // Only return a result if it has all desired effects
    if (bestResult && desiredEffects.every((effect) => bestResult.effects.includes(effect))) {
        console.log('Returning complete solution with all desired effects.');
        return {
            result: bestResult,
            ingredientsUsed: bestIngredients,
            complete: true,
        };
    } else {
        console.log('No complete solution found, returning null.');
        return null;
    }
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

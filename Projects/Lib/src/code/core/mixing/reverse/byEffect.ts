// All reverse mixing logic removed.
// This file intentionally left blank pending future implementation.

import type { Ingredient } from '@/code/types/products/Ingredient';
import { ingredients as allIngredientsData } from '@/code/data/products/ingredients';
import { transformationRules } from '@/code/data/mix/transformationRules';
import type { EffectCode } from '@/code/types/effects/Effect';
import type { TransformationRule } from '@/code/types/mixing/TransformationRule';
import type { ProductCode } from '@/code/types/products/Product';
import { isMarijuanaProduct } from '@/code/types/products/Product';
import { findProductByCode } from '@/code/utils/products/productUtils';

// --- Types & Constants ----------------------------------------------------

interface SearchParams {
    readonly targetEffects: ReadonlySet<EffectCode>;
    readonly baseProductCode?: ProductCode;
    /** Maximum number of ingredients allowed in the final mix (default 8) */
    readonly maxDepth?: number;
    /** Print verbose logs to console */
    readonly debug?: boolean;
}

interface SearchNode {
    readonly ingredients: Ingredient[]; // path so far (order matters for price etc.)
    readonly effects: Set<EffectCode>; // closed under transformation rules
    readonly g: number; // cost so far (ingredient count)
    readonly f: number; // g + h
}

interface RuleInfoSimple {
    trigger: string; // ingredient code
    output: EffectCode;
}

const allIngredients: ReadonlyArray<Ingredient> = allIngredientsData;

// --- Helper – rule application -------------------------------------------
/**
 * Applies all applicable transformation rules to the given set of effects, mutating it in place until no further changes occur.
 *
 * @param pathIngredients - The sequence of ingredients whose transformation rules are considered.
 * @param effects - The set of effects to be transformed.
 *
 * @remark
 * The function repeatedly applies transformation rules triggered by the provided ingredients, updating the effects set until no more rules can be applied.
 */
function applyTransformations(pathIngredients: ReadonlyArray<Ingredient>, effects: Set<EffectCode>): void {
    let changed = true;
    while (changed) {
        changed = false;
        for (const ing of pathIngredients) {
            const rules = transformationRules[ing.code] as ReadonlyArray<TransformationRule> | undefined;
            if (!rules) continue;
            for (const rule of rules) {
                const preCondMet =
                    rule.ifPresent.every((e) => effects.has(e)) && rule.ifNotPresent.every((e) => !effects.has(e));
                if (!preCondMet) continue;
                for (const oldEff of Object.keys(rule.replace) as EffectCode[]) {
                    if (!effects.has(oldEff)) continue;
                    const newEff = rule.replace[oldEff];
                    effects.delete(oldEff);
                    if (newEff !== undefined) effects.add(newEff);
                    changed = true;
                }
            }
        }
    }
}

/**
 * Computes the set of effects resulting from combining the base effects with the default effects of the given ingredient path, applying all applicable transformation rules.
 *
 * @param path - The ordered list of ingredients to include.
 * @param baseEffects - The initial set of effects to start from.
 * @returns A set of effects after adding ingredient defaults and applying transformations.
 */
function calcCombinedEffects(path: ReadonlyArray<Ingredient>, baseEffects: ReadonlySet<EffectCode>): Set<EffectCode> {
    const effects = new Set<EffectCode>(baseEffects);
    for (const ing of path) {
        effects.add(ing.defaultEffect);
    }
    applyTransformations(path, effects);
    return effects;
}

// --- Heuristic ------------------------------------------------------------
/** Pre-compute, for each ingredient code, the full set of effects it can provide
 * (its default effect plus every rule output it can trigger alone). */
const ingredientCoverage = new Map<string, Set<EffectCode>>();
let globalMaxCoverage = 1;
for (const ing of allIngredients) {
    const set = new Set<EffectCode>();
    set.add(ing.defaultEffect);
    const rules = transformationRules[ing.code] as ReadonlyArray<TransformationRule> | undefined;
    if (rules) {
        for (const rule of rules) {
            for (const out of Object.values(rule.replace)) {
                if (out !== undefined) set.add(out);
            }
        }
    }
    ingredientCoverage.set(ing.code, set);
    if (set.size > globalMaxCoverage) globalMaxCoverage = set.size;
}

/**
 * Estimates the minimum number of additional ingredients needed to cover all missing effects.
 *
 * Calculates an admissible lower bound by assuming each future ingredient can provide the maximum number of missing effects that any single ingredient can cover.
 *
 * @param missingCnt - The number of effects still missing from the current state.
 * @returns The estimated minimum number of additional ingredients required.
 */
function heuristic(missingCnt: number): number {
    return Math.ceil(missingCnt / globalMaxCoverage);
}

// --- Priority queue (binary heap) ----------------------------------------
class MinHeap<T extends { f: number }> {
    private data: T[] = [];
    push(item: T): void {
        this.data.push(item);
        this.up(this.data.length - 1);
    }
    pop(): T | undefined {
        const n = this.data.length;
        if (!n) return undefined;
        const top = this.data[0];
        const last = this.data.pop()!;
        if (n > 1) {
            this.data[0] = last;
            this.down(0);
        }
        return top;
    }
    get size(): number {
        return this.data.length;
    }
    private up(i: number): void {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.data[p].f <= this.data[i].f) break;
            [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
            i = p;
        }
    }
    private down(i: number): void {
        const n = this.data.length;
        while (true) {
            const l = (i << 1) + 1;
            const r = l + 1;
            let smallest = i;
            if (l < n && this.data[l].f < this.data[smallest].f) smallest = l;
            if (r < n && this.data[r].f < this.data[smallest].f) smallest = r;
            if (smallest === i) break;
            [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
            i = smallest;
        }
    }
}

// --- Main search ----------------------------------------------------------
/**
 * Searches for a sequence of ingredients that, when combined, produce all specified target effects, optionally starting from a given base product.
 *
 * Returns the ordered list of ingredients to use, or `null` if no solution is found within the allowed maximum ingredient count.
 *
 * @param params - Search parameters including the set of target effects, optional base product code, maximum ingredient count, and debug flag.
 * @returns An array of ingredients in the order they should be added to achieve the target effects, or `null` if no valid combination is found within the maximum depth.
 *
 * @remark The order of ingredients affects the resulting effects due to transformation rules. The search uses ingredient count as the cost metric and may return any minimal-length solution.
 */
export function reverseMixByEffect(params: SearchParams): Ingredient[] | null {
    const { targetEffects, baseProductCode, maxDepth = 8, debug = false } = params;
    const dbg = (...args: unknown[]): void => {
        if (debug) console.log('[reverseMixByEffect]', ...args);
    };
    if (targetEffects.size === 0) return [];

    // Gather base-product effects (only one default effect per product atm)
    const baseEffects = new Set<EffectCode>();
    if (baseProductCode) {
        const prodRes = findProductByCode(baseProductCode);
        prodRes.match(
            (prod) => {
                if (isMarijuanaProduct(prod) && prod.defaultEffect) {
                    baseEffects.add(prod.defaultEffect);
                }
            },
            () => {
                /* ignore – base product not found */
            }
        );
    }

    // Early exit if base already satisfies the target
    if ([...targetEffects].every((e) => baseEffects.has(e))) {
        dbg('Base product already satisfies target effects.');
        return [];
    }

    const startNode: SearchNode = {
        ingredients: [],
        effects: new Set(baseEffects),
        g: 0,
        f: heuristic(targetEffects.size),
    };
    dbg('Starting search. targetEffects=', [...targetEffects]);

    const frontier = new MinHeap<SearchNode>();
    frontier.push(startNode);

    // visited key = stringified sorted effects + g  (we prune same state if cost higher)
    const visited = new Map<string, number>();

    let iter = 0;

    /**
     * Builds a map from each effect code to the set of ingredient codes that can produce it via transformation rules.
     *
     * @returns A map where each key is an effect code and the value is a set of ingredient codes capable of generating that effect through transformations.
     */
    function buildEffectToIngredientMap(): Map<EffectCode, Set<string>> {
        const map = new Map<EffectCode, Set<string>>();
        for (const [ingCode, rules] of Object.entries(transformationRules)) {
            for (const rule of rules as ReadonlyArray<TransformationRule>) {
                for (const out of Object.values(rule.replace)) {
                    if (out === undefined) continue;
                    if (!map.has(out)) map.set(out, new Set());
                    map.get(out)!.add(ingCode);
                }
            }
        }
        return map;
    }

    const effectToIngredient = buildEffectToIngredientMap();

    while (frontier.size > 0) {
        const node = frontier.pop()!;
        iter++;
        if (debug && iter % 1000 === 0) dbg('Visited', iter, 'states. frontier=', frontier.size);

        dbg(`POP depth=${node.ingredients.length} g=${node.g} frontier=${frontier.size} effects=${[...node.effects]}`);

        // Goal test
        const missing: EffectCode[] = [];
        for (const eff of targetEffects) {
            if (!node.effects.has(eff)) missing.push(eff);
        }
        if (missing.length === 0) {
            dbg(
                'Goal reached. Path=',
                node.ingredients.map((i) => i.code)
            );
            return node.ingredients;
        }

        if (node.ingredients.length >= maxDepth) continue;

        const stateKey = [...node.effects].sort().join(',') + '|' + missing.length;
        if (visited.has(stateKey) && visited.get(stateKey)! <= node.g) continue;
        visited.set(stateKey, node.g);

        // Expand: try every unused ingredient, but only those that can
        // plausibly help with remaining missing effects.
        const relevantIngredients = allIngredients.filter((ing) => {
            if (node.ingredients.some((i) => i.code === ing.code)) return false;
            if (missing.includes(ing.defaultEffect)) return true;
            // or if triggers rule producing any missing effect
            return missing.some((eff) => effectToIngredient.get(eff)?.has(ing.code));
        });

        for (const ing of relevantIngredients) {
            const newPath = [...node.ingredients, ing];
            const newEffects = calcCombinedEffects(newPath, baseEffects);
            const newMissingCnt = [...targetEffects].filter((e) => !newEffects.has(e)).length;
            const g = newPath.length; // ingredient count as cost
            const h = heuristic(newMissingCnt);

            // Determine if ingredient adds *any* new effect compared to current state
            const addsNewEffect = [...newEffects].some((e) => !node.effects.has(e));

            // Skip only if it neither adds a new effect nor changes missing count (truly useless)
            if (!addsNewEffect && newMissingCnt === missing.length) {
                if (debug) dbg(`  SKIP ingredient=${ing.code} (no change)`);
                continue;
            }

            const child: SearchNode = {
                ingredients: newPath,
                effects: newEffects,
                g,
                f: g + h,
            };
            if (debug && (newMissingCnt < missing.length || addsNewEffect)) {
                dbg(`  PUSH ingredient=${ing.code} depth=${child.ingredients.length} missing→${newMissingCnt}`);
            }
            frontier.push(child);
        }
    }

    dbg('No solution found within depth', maxDepth);
    return null; // no solution within depth
}

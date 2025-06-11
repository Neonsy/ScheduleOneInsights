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
 * Applies all transformation rules exhaustively, mutating the provided effects Set.
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
 * Admissible lower bound: assume every future ingredient will cover the maximum
 * number of *still-missing* effects that ANY single ingredient could cover.
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
 * Finds a sequence of ingredients that gives the desired effects.  Returns the
 * ingredient list in the order they should be added, or null if no solution
 * within `maxDepth` is found.
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

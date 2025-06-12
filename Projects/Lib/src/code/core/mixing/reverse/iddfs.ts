import { ingredients as allIngredients } from '@/code/data/products/ingredients';
import { transformationRules } from '@/code/data/mix/transformationRules';
import { simulateEffectSet } from '@/code/utils/mixing/mixSimulator';
import type { Ingredient } from '@/code/types/products/Ingredient';
import type { EffectCode } from '@/code/types/effects/Effect';
import type { ProductCode } from '@/code/types/products/Product';
import type { ReverseSearchParams } from '@/code/types/mixing/ReverseSearchParams';

interface Node {
    readonly effects: Set<EffectCode>;
    readonly path: Ingredient[];
}

// Pre-compute ingredient coverage for dynamic scoring
const ingredientCoverage = new Map<string, Set<EffectCode>>();
for (const ing of allIngredients) {
    const set = new Set<EffectCode>();
    set.add(ing.defaultEffect);
    const rules = transformationRules[ing.code as keyof typeof transformationRules];
    if (rules) {
        for (const rule of rules) {
            for (const out of Object.values(rule.replace)) {
                if (out !== undefined) set.add(out);
            }
        }
    }
    ingredientCoverage.set(ing.code, set);
}

export function reverseMixIddfs(params: ReverseSearchParams): Ingredient[] | null {
    const { targetEffects, baseProductCode, maxDepth = 16, debug } = params;
    const startEffects = simulateEffectSet(baseProductCode, []);

    if ([...targetEffects].every((e) => startEffects.has(e))) return [];

    // Map key = sorted effects string => minimum depth visited
    const globalVisited = new Map<string, number>();

    const dbg = (...a: unknown[]): void => {
        if (debug) console.log('[iddfs]', ...a);
    };

    for (let limit = 1; limit <= maxDepth; limit++) {
        dbg('Depth limit =', limit);
        globalVisited.clear();
        const res = dfs({ effects: startEffects, path: [] }, limit);
        if (res) return res;
    }
    return null;

    function dfs(node: Node, limit: number): Ingredient[] | null {
        // goal
        for (const t of targetEffects)
            if (!node.effects.has(t)) break;
            else continue;
        if ([...targetEffects].every((e) => node.effects.has(e))) return node.path;

        if (node.path.length >= limit) return null;

        const key = [...node.effects].sort().join(',');
        const prevDepth = globalVisited.get(key);
        if (prevDepth !== undefined && prevDepth <= node.path.length) return null;
        globalVisited.set(key, node.path.length);

        // Build candidates
        const missing = [...targetEffects].filter((e) => !node.effects.has(e));
        const cands: { ing: Ingredient; score: number }[] = [];

        for (const ing of allIngredients) {
            const newPathCodes = [...node.path.map((i) => i.code), ing.code];
            const newEffects = simulateEffectSet(baseProductCode, newPathCodes);
            const newMissingCnt = missing.filter((e) => !newEffects.has(e)).length;
            const score = missing.length - newMissingCnt; // how many we cover
            if (score === 0 && newMissingCnt === missing.length) continue; // truly redundant
            cands.push({ ing, score });
        }

        cands.sort((a, b) => b.score - a.score || a.ing.code.localeCompare(b.ing.code));

        for (const { ing } of cands) {
            const childPath = [...node.path, ing];
            const childEffects = simulateEffectSet(
                baseProductCode,
                childPath.map((i) => i.code)
            );
            const res = dfs({ effects: childEffects, path: childPath }, limit);
            if (res) return res;
        }
        return null;
    }
}

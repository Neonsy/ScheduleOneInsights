import { ingredients as allIngredients } from '@/code/data/products/ingredients';
import type { EffectCode } from '@/code/types/effects/Effect';
import { simulateEffectSet } from '@/code/utils/mixing/mixSimulator';
import { mixProductCore } from '@/code/core/mixing/normal/algorithm';
import type { ProductCode } from '@/code/types/products/Product';

interface Node {
    effects: Set<EffectCode>;
    path: string[]; // ingredient codes
}

function keyFromEffects(effects: Set<EffectCode>): string {
    return [...effects].sort().join(',');
}

/**
 * Exhaustively searches all ingredient sequences up to a given depth trying to realise the desired effects.
 * Prints result path if found, or summary statistics otherwise.
 */
async function main(): Promise<void> {
    // --- CONFIG -----------------------------------------------------------
    const baseProductCode: ProductCode | undefined = 'OK';
    const target: EffectCode[] = ['AG', 'GI', 'LF', 'ZBFI', 'EPS'];
    const maxDepth = 26;
    /** How often to log search progress (in number of nodes expanded) */
    const LOG_INTERVAL = 10_000;

    // ---------------------------------------------------------------------
    const startEffects = simulateEffectSet(baseProductCode, []);
    const startNode: Node = { effects: startEffects, path: [] };

    const queue: Node[] = [startNode];
    const visited = new Set<string>();
    visited.add(keyFromEffects(startEffects));

    let expanded = 0;
    const targetSet = new Set<EffectCode>(target);

    while (queue.length > 0) {
        const node = queue.shift()!;
        expanded++;

        // Periodic progress logging
        if (expanded % LOG_INTERVAL === 0) {
            // eslint-disable-next-line no-console
            console.log(
                `[${new Date().toISOString()}] Expanded ${expanded} nodes | Queue: ${queue.length} | Current depth: ${node.path.length} | Unique effect sets: ${visited.size}`
            );
        }

        // Goal test
        let goal = true;
        for (const t of targetSet) {
            if (!node.effects.has(t)) {
                goal = false;
                break;
            }
        }
        if (goal) {
            console.log('FOUND plan depth', node.path.length, 'path', node.path);
            const result = mixProductCore(baseProductCode ?? ('M' as ProductCode), node.path as unknown as string[]);
            console.log('Final effects:', result.effects);
            return;
        }

        if (node.path.length >= maxDepth) continue;

        // Expand by adding every ingredient (duplicates allowed)
        for (const ing of allIngredients) {
            const newPath = [...node.path, ing.code];
            const newEffects = simulateEffectSet(baseProductCode, newPath);
            const k = keyFromEffects(newEffects);
            if (visited.has(k)) continue;
            visited.add(k);
            queue.push({ effects: newEffects, path: newPath });
        }
    }

    console.log('NO PLAN found up to depth', maxDepth);
    console.log('Visited effect sets:', visited.size, 'Nodes expanded:', expanded);
}

main().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
});

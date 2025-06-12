/**
 * Internal helper types & data structures for the reverse-mixing search
 * algorithm.  **Do NOT import these from files under `src/exports/`.**
 */

import type { EffectCode } from '@/code/types/effects/Effect';
import type { Ingredient } from '@/code/types/products/Ingredient';

/**
 * Node stored in the A* frontier while searching for a valid ingredient list.
 *
 * `g` – cost so far (number of ingredients)
 * `f` – `g + h` where `h` is the heuristic lower-bound on remaining cost.
 */
export interface SearchNode {
    readonly ingredients: Ingredient[];
    readonly effects: Set<EffectCode>;
    readonly g: number;
    readonly f: number;
}

/**
 * Simple binary min-heap keyed by the `f` value of its items.  Generic so we
 * can strongly type the payload objects.
 */
export class MinHeap<T extends { f: number }> {
    private readonly data: T[] = [];

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
            // Move last to root and heapify-down
            this.data[0] = last;
            this.down(0);
        }
        return top;
    }

    get size(): number {
        return this.data.length;
    }

    /* ────────────────────────────────────────────────────────── */
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

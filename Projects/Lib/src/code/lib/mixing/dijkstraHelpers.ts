import type { EffectCode } from '@/code/types/effects/Effect';
import type { PQNode } from '@/code/lib/types/mixing/Dijkstra';

/**
 * @internal
 * A simple priority queue implementation for Dijkstra's algorithm.
 * Sorts by cost in ascending order.
 */
export class SimplePriorityQueue {
    private queue: PQNode[] = [];

    push(node: PQNode): void {
        this.queue.push(node);
        this.queue.sort((a, b) => a.cost - b.cost); // Simple sort, can be optimized
    }

    pop(): PQNode | undefined {
        return this.queue.shift();
    }

    isEmpty(): boolean {
        return this.queue.length === 0;
    }
}

/**
 * @internal
 * Generates a sorted, comma-separated string key from an array of effect codes.
 * Used for identifying unique effect combinations in the Dijkstra search.
 * @param codes - An array of effect codes.
 * @returns A string key representing the sorted effect codes.
 */
export function getEffectsKey(codes: ReadonlyArray<EffectCode>): string {
    return [...codes].sort().join(',');
}

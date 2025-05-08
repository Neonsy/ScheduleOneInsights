import type { Ingredient } from '@/code/types/products/Ingredient';

/**
 * @internal
 * Represents a node in the priority queue for Dijkstra's algorithm.
 */
export interface PQNode {
    readonly cost: number;
    readonly sequence: ReadonlyArray<Ingredient['code']>;
    readonly effectsKey: string;
}

/**
 * Creates a memoized version of a function
 *
 * @param fn - The function to memoize
 * @param keyFn - Optional function to generate a cache key from the arguments
 * @returns A memoized version of the function
 */
export function memoize<T extends (...args: any[]) => any>(fn: T, keyFn?: (...args: Parameters<T>) => string): T {
    const cache = new Map<string, ReturnType<T>>();

    return ((...args: Parameters<T>): ReturnType<T> => {
        const key = keyFn ? keyFn(...args) : JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key)!;
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
    }) as T;
}

/**
 * Creates a memoized version of a function with a maximum cache size
 *
 * @param fn - The function to memoize
 * @param maxSize - Maximum number of results to cache
 * @param keyFn - Optional function to generate a cache key from the arguments
 * @returns A memoized version of the function
 */
export function memoizeWithLimit<T extends (...args: any[]) => any>(fn: T, maxSize: number, keyFn?: (...args: Parameters<T>) => string): T {
    const cache = new Map<string, ReturnType<T>>();
    const keyQueue: string[] = [];

    return ((...args: Parameters<T>): ReturnType<T> => {
        const key = keyFn ? keyFn(...args) : JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key)!;
        }

        const result = fn(...args);

        // If cache is full, remove the oldest entry
        if (cache.size >= maxSize && keyQueue.length > 0) {
            const oldestKey = keyQueue.shift()!;
            cache.delete(oldestKey);
        }

        // Add new entry
        cache.set(key, result);
        keyQueue.push(key);

        return result;
    }) as T;
}

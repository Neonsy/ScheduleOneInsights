import type { EffectCode } from '@/code/types/effects/Effect';
import type { ProductCode } from '@/code/types/products/Product';
import { reverseMixByEffect } from '@/exports/core/mixing/reverse';
import { findEffectByNameOrThrow } from '@/code/utils/effects/effectUtils';

/* --------------------------------------------------------------------------
 * Quick-and-dirty playground script
 * --------------------------------------------------------------------------
 * Modify the arrays below (targetEffectNames & baseProductCode) to experiment
 * with the reverse-mixing A* search.   Run via:
 *   pnpm dlx tsx src/tmp.ts
 * or through your IDE's TS-node/tsx run-config.
 * ------------------------------------------------------------------------ */

// Desired effect names – feel free to change / add.
const targetEffectNames: string[] = ['Bright-Eyed', 'Focused', 'Refreshing'];

// Set a base product code (optional).  See src/code/data/products for codes.
const baseProductCode: ProductCode | undefined = 'OK'; // OG Kush

const maxDepth = 128;

// Convert names → codes, catching unknown names early.
let targetEffects: Set<EffectCode>;
try {
    targetEffects = new Set(targetEffectNames.map((n) => findEffectByNameOrThrow(n)));
} catch (e) {
    console.error('[tmp] Unknown effect name:', (e as Error).message);
    process.exit(1);
}

console.log('\n--- Reverse-mix search demo -------------------------------------------');
console.log('Target effects :', [...targetEffects].join(', '));
console.log('Base product   :', baseProductCode ?? '(none)');
console.log('Max depth      :', maxDepth);
console.log('----------------------------------------------------------------------');

const start = Date.now();
const result = reverseMixByEffect({
    targetEffects,
    baseProductCode,
    maxDepth,
    debug: true,
});
const duration = ((Date.now() - start) / 1000).toFixed(2);

if (result === null) {
    console.log('No solution found within depth', maxDepth, `(${duration}s)`);
    process.exit(0);
}

if (result.length === 0) {
    console.log('Base product already meets all target effects.');
    process.exit(0);
}

console.log(`Found solution in ${duration}s using ${result.length} ingredient(s):`);
for (const ing of result) {
    console.log(`  – ${ing.name} [${ing.code}] (default effect: ${ing.defaultEffect})`);
}

// vite.config.ts
import { builtinModules } from 'module';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// Get base builtins + those with node: prefix
const nodeBuiltins = builtinModules.map((m) => `node:${m}`).concat(builtinModules);

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        sourcemap: true,
        // Keep targeting Node.js
        target: 'node20', // Or your minimum supported Node version
        lib: {
            entry: resolve(__dirname, 'src/index.ts'), // ADJUST if needed
            name: 'ScheduleOneInsightsLib',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            // Explicitly externalize Node built-ins (both 'buffer' and 'node:buffer')
            // and any other runtime dependencies
            external: [
                ...nodeBuiltins,
                // Add other external deps like 'lz-string' if applicable
            ],
            output: {
                globals: {
                    // Define globals for UMD if needed
                },
            },
        },
    },
    plugins: [
        dts({
            tsconfigPath: './tsconfig.build.json',
            insertTypesEntry: true,
        }),
    ],
});

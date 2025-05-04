import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    test: {
        globals: true,
        environment: 'node',
        typecheck: {
            tsconfig: './tsconfig.dev.json',
        },
        include: ['tests/**/*.test.ts'],
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
});

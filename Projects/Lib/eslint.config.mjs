import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier'; // Disables conflicting ESLint rules
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'; // Runs Prettier as an ESLint rule & registers plugin
import neverthrowPlugin from '@bufferings/eslint-plugin-neverthrow';

/** @type {import("eslint").Linter.Config} */
export default tseslint.config(
    eslint.configs.recommended, // Base ESLint recommendations
    ...tseslint.configs.recommended, // TypeScript-ESLint recommendations (includes parser, plugin, and rules)
    ...tseslint.configs.recommendedTypeChecked,
    neverthrowPlugin.configs.recommended, // Neverthrow plugin recommendations

    // 1. prettierConfig disables ESLint rules that conflict with Prettier.
    // 2. prettierPluginRecommended enables running Prettier as an ESLint rule.
    // Order matters: prettierConfig should ideally come before rules that might conflict,
    // and prettierPluginRecommended often comes towards the end of the stylistic chain.
    prettierConfig,
    prettierPluginRecommended, // This will use prettier.config.mjs for rules

    // Custom overrides and additional configurations
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            // parser: tseslint.parser, // Already set by tseslint.configs.recommended
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['./tsconfig.json'], // Ensure this tsconfig includes all files you want linted with type info
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                browser: true, // If you have browser-specific code
                es2021: true,
                node: true,
            },
        },
        rules: {
            'linebreak-style': 'off', // Good, as Prettier handles line endings
            'prettier/prettier': ['warn', { endOfLine: 'auto' }],
        },
    }
);

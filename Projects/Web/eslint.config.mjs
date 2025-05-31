import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import neverthrow from 'eslint-plugin-neverthrow';
import next from '@next/eslint-plugin-next';
import tsParser from '@typescript-eslint/parser';
import globalsAll from 'globals';

export default [
    eslint.configs.recommended,
    prettierConfig,
    {
        plugins: {
            '@typescript-eslint': tseslint,
            prettier: prettierPlugin,
            'jsx-a11y': jsxA11y,
            react,
            'react-hooks': reactHooks,
            '@next/next': next,
            neverthrow,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
                tsconfigRootDir: process.cwd(),
            },
            globals: {
                ...globalsAll.browser,
                ...globalsAll.node,
            },
        },
        rules: {
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            'linebreak-style': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error'],
            'react/react-in-jsx-scope': 'off',
            // Add more strict rules, neverthrow, next, react, jsx-a11y, etc. as needed
        },
        settings: {
            react: {
                version: 'detect',
                runtime: 'automatic',
            },
        },
    },
];

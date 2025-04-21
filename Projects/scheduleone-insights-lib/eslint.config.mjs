import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import("eslint").Linter.Config} */
export default tseslint.config(tseslint.configs.recommended, eslint.configs.recommended, prettierConfig, {
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tseslint.parser,
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        globals: {
            browser: true,
            es2021: true,
            node: true,
        },
    },
    plugins: {
        '@typescript-eslint': tseslint.plugin,
        prettier: prettierPlugin,
    },
    rules: {
        'prettier/prettier': ['error'],
        'linebreak-style': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
});

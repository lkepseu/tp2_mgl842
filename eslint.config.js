import { defineConfig } from 'eslint-define-config';
import vuePlugin from 'eslint-plugin-vue';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import vueParser from 'vue-eslint-parser';
import typescriptParser from '@typescript-eslint/parser';

export default defineConfig([
    {
        languageOptions: {
            parser: vueParser,  // Utilisation du parser pour Vue.js
            parserOptions: {
                parser: typescriptParser, // Utilisation du parser TypeScript
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            vue: vuePlugin, // Ajout du plugin Vue
            '@typescript-eslint': typescriptPlugin, // Ajout du plugin TypeScript
        },
        rules: {
            'no-console': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'vue/max-attributes-per-line': ['error', { 'singleline': 3, 'multiline': 1 }],
            'vue/singleline-html-element-content-newline': ['error', {
                'ignoreWhenNoAttributes': true,  // Option correcte
                'ignoreWhenEmpty': true, // Option correcte
            }],
        },
    },
]);

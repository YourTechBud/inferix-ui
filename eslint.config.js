import eslint from '@eslint/js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  ignores: ['build/**', 'dist/**', 'node_modules/**', '.react-router/**'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
  ],
  plugins: {
    'simple-import-sort': simpleImportSort,
    '@stylistic/ts': stylisticTs,
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    '@stylistic/ts/semi': ['error', 'always'],
    '@stylistic/ts/quotes': ['error', 'single'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
});

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  }),
  { files: ['**/*.{js,mjs,cjs,ts,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  { settings: { react: { version: 'detect' } } },
  eslintConfigPrettier,
  {
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.husky/**'],
  },
];

export default eslintConfig;

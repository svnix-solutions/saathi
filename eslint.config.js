// ESLint flat config. Enforces the layering in docs/ARCHITECTURE.md:
// tokens → domain → design systems → apps, with dependencies pointing down only.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';

const appImports = ['@/apps/*', '@/apps/**'];

/** no-restricted-imports with a message per forbidden group */
const restrict = (...groups) => ['error', { patterns: groups.map(([group, message]) => ({ group, message })) }];

export default tseslint.config(
  { ignores: ['node_modules', 'storybook-static', 'web', 'deploy', 'public', '**/*.d.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}', '.storybook/**/*.{ts,tsx}'],
    languageOptions: { globals: { ...globals.browser } },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // the React Compiler rules are advisory for a prototype with timers and refs
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/static-components': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  { files: ['scripts/**/*.{js,mjs}', '*.config.js'], languageOptions: { globals: { ...globals.node } } },

  // ---- layer boundaries ----
  {
    files: ['src/tokens/**'],
    rules: { 'no-restricted-imports': restrict([['@/*', '!@/tokens', '!@/tokens/**', 'react', 'react-native'], 'tokens/ is the bottom layer: no project or React imports.']) },
  },
  {
    files: ['src/domain/**', 'src/data/**'],
    rules: { 'no-restricted-imports': restrict([['react', 'react-native', 'react-dom', '@/native/**', '@/native/*', ...appImports], 'domain/ holds business rules only: no React, no UI, no apps.']) },
  },
  {
    files: ['src/native/**'],
    rules: { 'no-restricted-imports': restrict([appImports, 'The design system must not import from apps/.']) },
  },
  {
    files: ['src/apps/customer/**'],
    rules: { 'no-restricted-imports': restrict([['@/apps/partner/**', '@/apps/admin/**'], 'Apps are independent: share code through native/ui or domain/.']) },
  },
  {
    files: ['src/apps/partner/**'],
    rules: { 'no-restricted-imports': restrict([['@/apps/customer/**', '@/apps/admin/**'], 'Apps are independent: share code through native/ui or domain/.']) },
  },
  {
    files: ['src/apps/admin/**'],
    rules: { 'no-restricted-imports': restrict([['@/apps/customer/**', '@/apps/partner/**', '@/native/**', 'react-native'], 'The admin panel is React DOM: use admin/ui, not React Native.']) },
  },
  {
    // brand colours come from tokens; theme colours from useTheme().c
    files: ['src/apps/customer/**/*.{ts,tsx}', 'src/apps/partner/**/*.{ts,tsx}', 'src/native/**/*.{ts,tsx}'],
    ignores: ['**/*.stories.tsx'],
    rules: { 'no-restricted-syntax': ['error', { selector: 'Literal[value=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]', message: 'Use palette / useTheme().c instead of a hex colour.' }] },
  },
  ...storybook.configs['flat/recommended'],
);

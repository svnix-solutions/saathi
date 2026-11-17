import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { fileURLToPath } from 'node:url';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: { modulesToTranspile: ['react-native-svg'] },
  },
  staticDirs: ['../public'],
  viteFinal: async (cfg) => {
    cfg.resolve = cfg.resolve ?? {};
    cfg.resolve.alias = { ...(cfg.resolve.alias as object), '@': fileURLToPath(new URL('../src', import.meta.url)) };
    // platform files: Foo.web.tsx wins over Foo.tsx in Storybook
    cfg.resolve.extensions = ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'];
    cfg.optimizeDeps = { ...cfg.optimizeDeps, exclude: [...(cfg.optimizeDeps?.exclude ?? []), 'react-native-svg'] };
    return cfg;
  },
};
export default config;

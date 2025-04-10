import type { Config } from 'tailwindcss';
import sharedConfig from 'tailwind-config';

const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
  content: [
    './src/**/*.tsx',
    './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}',
    '../../packages/isomorphic-core/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [sharedConfig],
};

export default config;

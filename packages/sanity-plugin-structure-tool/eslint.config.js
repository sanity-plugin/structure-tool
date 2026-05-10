import config from '@structure-tool/eslint-config/base';
import { defineConfig } from '@structure-tool/eslint-config/utils';

export default defineConfig([
  ...config,
  {
    name: 'x/disabled-restricted-imports',
    files: ['**/*.{ts,cts,mts,tsx}'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
]);

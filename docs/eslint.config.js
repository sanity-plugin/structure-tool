import config from '@structure-tool/eslint-config/base';
import { defineConfig, getNoExtraneousDependenciesRule } from '@structure-tool/eslint-config/utils';

export default defineConfig([
  ...config,
  {
    name: 'x/import-x/modify-no-extraneous-dependencies',
    rules: {
      'import-x/no-extraneous-dependencies': getNoExtraneousDependenciesRule([
        'vitepress',
        'vitepress-plugin-group-icons',
        'vitepress-plugin-llms',
      ]),
    },
  },
]);

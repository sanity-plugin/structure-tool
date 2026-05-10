// eslint-disable-next-line import-x/no-extraneous-dependencies
import { defineConfig } from '@sanity/pkg-utils';

export default defineConfig({
  dist: 'dist',
  extract: {
    rules: {
      'ae-incompatible-release-tags': 'off',
      'ae-internal-missing-underscore': 'off',
      'ae-missing-release-tag': 'off',
    },
  },
  sourcemap: false,
  minify: true,
});

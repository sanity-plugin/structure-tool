import config from '@structure-tool/tsdown-config/package';
import { defineConfig } from 'tsdown';

export default defineConfig((options, context) => {
  const defaultOptions = config(options, context);

  return {
    ...defaultOptions,
    entry: './src/index.ts',
    deps: {
      onlyBundle: ['type-fest'],
    },
  };
});

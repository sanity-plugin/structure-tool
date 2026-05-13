import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
  const { watch } = options;

  return {
    entry: {
      base: './src/tsdown-base.config.js',
      package: './src/tsdown-package.config.js',
    },
    dts: true,
    format: 'esm',
    platform: 'node',
    treeshake: !watch,
    sourcemap: !watch,
    minify: !watch,
    exports: true,
    nodeProtocol: true,
    deps: {
      neverBundle: ['tsdown'],
    },
  };
});

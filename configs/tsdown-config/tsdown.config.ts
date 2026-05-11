import { defineConfig } from 'tsdown';

export default defineConfig((options, context) => {
  const { watch } = options;
  const { ci } = context;

  return {
    entry: {
      base: './src/tsdown-base.config.js',
      package: './src/tsdown-package.config.js',
    },
    dts: true,
    format: 'esm',
    platform: 'node',
    treeshake: !watch,
    sourcemap: !ci,
    minify: !watch,
    exports: true,
    nodeProtocol: true,
    deps: {
      neverBundle: ['tsdown'],
    },
  };
});

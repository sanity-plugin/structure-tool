import type { UserConfig, UserConfigFn } from 'tsdown';

const config = (...params: Parameters<UserConfigFn>): UserConfig => {
  const [options, context] = params;
  const { watch } = options;
  const { ci } = context;

  return {
    entry: 'src/**/**.ts',
    dts: true,
    format: ['esm', 'cjs'],
    platform: 'node',
    treeshake: !watch,
    sourcemap: !ci,
    minify: !watch,
    exports: true,
    nodeProtocol: true,
    deps: {
      skipNodeModulesBundle: true,
      neverBundle: ['type-fest'],
    },
  };
};

export default config;

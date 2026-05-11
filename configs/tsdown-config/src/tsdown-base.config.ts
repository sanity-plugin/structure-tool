import type { UserConfig, UserConfigFn } from 'tsdown';

const config = (...params: Parameters<UserConfigFn>): UserConfig => {
  const [options, context] = params;
  const { watch } = options;
  const { ci } = context;

  return {
    entry: 'src/**/**.ts',
    dts: false,
    format: 'esm',
    outDir: 'dist',
    platform: 'node',
    treeshake: !watch,
    sourcemap: !ci,
    minify: !watch,
    exports: false,
    nodeProtocol: true,
    unbundle: true,
  };
};

export default config;

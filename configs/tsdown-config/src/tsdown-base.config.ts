import type { UserConfig, UserConfigFn } from 'tsdown';

const config = (...params: Parameters<UserConfigFn>): UserConfig => {
  const [options] = params;
  const { watch } = options;

  return {
    entry: 'src/**/**.ts',
    dts: false,
    format: 'esm',
    outDir: 'dist',
    platform: 'node',
    treeshake: !watch,
    sourcemap: !!watch,
    minify: !watch,
    exports: false,
    nodeProtocol: true,
    unbundle: true,
  };
};

export default config;

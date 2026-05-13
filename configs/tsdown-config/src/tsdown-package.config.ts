import type { UserConfig, UserConfigFn } from 'tsdown';

const config = (...params: Parameters<UserConfigFn>): UserConfig => {
  const [options] = params;
  const { watch } = options;

  return {
    entry: 'src/**/**.ts',
    dts: true,
    format: 'esm',
    platform: 'node',
    treeshake: !watch,
    sourcemap: false,
    minify: !watch,
    exports: true,
    nodeProtocol: true,
  };
};

export default config;

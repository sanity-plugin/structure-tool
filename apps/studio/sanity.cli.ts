import { defineCliConfig } from 'sanity/cli';
// eslint-disable-next-line import-x/no-extraneous-dependencies
import tsconfigPaths from 'vite-tsconfig-paths';

import { envs } from '@/config';

const { SANITY_STUDIO_PROJECT_ID } = envs;

export default defineCliConfig({
  api: {
    projectId: SANITY_STUDIO_PROJECT_ID,
  },
  deployment: {
    autoUpdates: false,
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
  reactCompiler: {
    target: '19',
  },
});

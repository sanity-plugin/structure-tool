import { defineCliConfig } from 'sanity/cli';

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
    resolve: {
      tsconfigPaths: true,
    },
  },
  reactCompiler: {
    target: '19',
  },
});

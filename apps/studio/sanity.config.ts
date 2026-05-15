import { assist } from '@sanity/assist';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { SingletonAction } from 'sanity-plugin-structure-tool';

import { envs } from '@/config';
import constants from '@/constants';
import schemaTypes from '@/schemas';
import { structure } from '@/structure';
import listItems from '@/structure/listItems';

const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET } = envs;

export default defineConfig({
  name: 'sanity-plugin-structure-tool',
  title: constants.APP_NAME,
  projectId: SANITY_STUDIO_PROJECT_ID,
  dataset: SANITY_STUDIO_DATASET,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structure({
      listItems,
    }),
    assist(),
    visionTool(),
  ],
  document: {
    actions: SingletonAction,
  },
});

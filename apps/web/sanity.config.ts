import { assist } from '@sanity/assist';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { SingletonAction } from 'sanity-plugin-structure-tool';

import { envs } from '@/config';
import constants from '@/constants';
import listItems from '@/sanity/listItems';
import schemaTypes from '@/sanity/schemas';
import { structure } from '@/structure';

const { NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET } = envs;

export default defineConfig({
  name: 'sanity-plugin-structure-tool',
  title: constants.APP_NAME,
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
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

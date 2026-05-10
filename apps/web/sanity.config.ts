import { assist } from '@sanity/assist';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureToolPlugin } from 'sanity-plugin-structure-tool';

import { envs } from '@/config';
import constants from '@/constants';
import contentTypes from '@/sanity/contentTypes/contentTypes';
import schemaTypes from '@/sanity/schemas';

const { NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET } = envs;

export default defineConfig({
  name: 'sanity-plugin-structure-tool',
  title: constants.APP_NAME,
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  schema: {
    types: schemaTypes,
  },
  plugins: [structureToolPlugin({ contentTypes }), assist(), visionTool()],
});

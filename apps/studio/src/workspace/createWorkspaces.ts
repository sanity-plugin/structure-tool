import { assist } from '@sanity/assist';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { SingletonAction } from 'sanity-plugin-structure-tool';

import { envs } from '@/config';
import schemaTypes from '@/schemas';
import { structure } from '@/structure';
import listItems from '@/structure/listItems';
import workspaces from '@/workspace/workspaces';

import type { Config } from 'sanity';

const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET } = envs;

type CreateWorkspaces = () => Config[];

const createWorkspaces: CreateWorkspaces = () =>
  workspaces.map((item) =>
    defineConfig({
      ...item,
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
    }),
  );

export default createWorkspaces;

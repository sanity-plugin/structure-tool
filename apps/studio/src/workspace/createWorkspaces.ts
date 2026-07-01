import { assist } from '@sanity/assist';
import { esESLocale } from '@sanity/locale-es-es';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { SingletonAction } from 'sanity-plugin-structure-tool';

import { envs } from '@/config';
import { workspaceTypes } from '@/constants/common';
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
        ...(item.name === workspaceTypes.SANITY_STRUCTURE_TOOL_SPANISH ? [esESLocale()] : []),
      ],
      document: {
        actions: SingletonAction,
      },
    }),
  );

export default createWorkspaces;

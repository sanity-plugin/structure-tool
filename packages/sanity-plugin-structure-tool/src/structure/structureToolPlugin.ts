import { definePlugin } from 'sanity';
import { structureTool } from 'sanity/structure';

import { getAllContentTypes } from '@/helpers/getAllContentTypes';
import { structure } from '@/structure/structure';
import { templates } from '@/structure/templates';

import type { StructureToolPlugin } from '@/structure/types/common.types';

export const structureToolPlugin: StructureToolPlugin = (params) => {
  const { contentTypes, defaultRoles, roles } = params;

  const allContentTypes = getAllContentTypes(contentTypes);

  return {
    structure: definePlugin(() => {
      console.log('hello from sanity-plugin-structure-tool');

      return {
        name: 'sanity-plugin-structure-tool',
        plugins: [
          structureTool({
            structure: structure(params),
          }),
        ],
        schema: {
          templates: templates(allContentTypes),
        },
      };
    }),
    templates: templates(allContentTypes),
  };
};

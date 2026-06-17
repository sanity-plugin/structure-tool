import { definePlugin } from 'sanity';
import { structureTool } from 'sanity/structure';

import { defineListItem } from '@/factories/defineListItem';
import { defineListItems } from '@/factories/defineListItems';
import { helpers } from '@/factories/helpers';
import { getAllListItems } from '@/helpers/getAllListItems';
import { structure } from '@/structure/structure/structure';
import { templates } from '@/structure/templates/templates';

import type {
  StructureToolPluginOutput,
  StructureToolPluginParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { StructureToolParams } from '@/structure/types/common.types';

export const structureToolPlugin = <const T extends StructureToolParams = StructureToolParams>(
  params: StructureToolPluginParams<T>,
): StructureToolPluginOutput<T> => ({
  structure: definePlugin(({ listItems }) => {
    const flatListItems = getAllListItems<T>(listItems);

    return {
      name: 'sanity-plugin-structure-tool',
      plugins: [
        structureTool({
          structure: structure<T>({
            ...params,
            listItems,
          }),
        }),
      ],
      schema: {
        templates: templates<T>(flatListItems),
      },
    };
  }),
  templates: ({ listItems }) => {
    const flatListItems = getAllListItems<T>(listItems);

    return templates<T>(flatListItems);
  },
  defineListItems,
  defineListItem,
  helpers,
});

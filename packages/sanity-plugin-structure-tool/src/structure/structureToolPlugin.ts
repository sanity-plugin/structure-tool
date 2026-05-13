import { definePlugin } from 'sanity';
import { structureTool } from 'sanity/structure';

import { defineListItem } from '@/factories/defineListItem';
import { defineListItems } from '@/factories/defineListItems';
import { getAllListItems } from '@/helpers/getAllListItems';
import { structure } from '@/structure/structure';
import { templates } from '@/structure/templates';

import type {
  StructureToolPluginOutput,
  StructureToolPluginParams,
} from '@/structure/types/common.types';

export const structureToolPlugin = <
  const Roles extends string[],
  const DefaultRoles extends Roles[number][],
>(
  params: StructureToolPluginParams<Roles, DefaultRoles>,
): StructureToolPluginOutput<Roles> => {
  console.log('hello from sanity-plugin-structure-tool');

  return {
    structure: definePlugin(({ listItems }) => {
      const flatListItems = getAllListItems<Roles>(listItems);

      return {
        name: 'sanity-plugin-structure-tool',
        plugins: [
          structureTool({
            structure: structure<Roles, DefaultRoles>(params),
          }),
        ],
        schema: {
          templates: templates<Roles>(flatListItems),
        },
      };
    }),
    templates: ({ listItems }) => {
      const flatListItems = getAllListItems<Roles>(listItems);
      return templates<Roles>(flatListItems);
    },
    defineListItems: (listItems) => defineListItems<Roles>(listItems),
    defineListItem: (listItem) => defineListItem<Roles>(listItem),
  };
};

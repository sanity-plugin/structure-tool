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
  const { listItems } = params;

  const flatListItems = getAllListItems<Roles>(listItems);

  return {
    structure: definePlugin(() => {
      console.log('hello from sanity-plugin-structure-tool');

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
    templates: templates<Roles>(flatListItems),
    defineListItems: (items) => defineListItems<Roles>(items),
    defineListItem: (items) => defineListItem<Roles>(items),
  };
};

import { definePlugin } from 'sanity';
import { structureTool } from 'sanity/structure';

import { defineListItem } from '@/factories/defineListItem';
import { defineListItems } from '@/factories/defineListItems';
import { getAllListItems } from '@/helpers/getAllListItems';
import { structure } from '@/structure/structure/structure';
import { templates } from '@/structure/templates/templates';

import type {
  StructureToolPluginOutput,
  StructureToolPluginParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';

export const structureToolPlugin = <
  const Roles extends readonly string[] | undefined = undefined,
  const DefaultRoles extends readonly string[] | undefined = undefined,
>(
  params: StructureToolPluginParams<Roles, DefaultRoles>,
): StructureToolPluginOutput<Roles, DefaultRoles> => {
  console.log('hello from sanity-plugin-structure-tool');

  return {
    structure: definePlugin(({ listItems }) => {
      const flatListItems = getAllListItems<Roles, DefaultRoles>(listItems);

      return {
        name: 'sanity-plugin-structure-tool',
        plugins: [
          structureTool({
            structure: structure<Roles, DefaultRoles>({ ...params, listItems }),
          }),
        ],
        schema: {
          templates: templates<Roles, DefaultRoles>(flatListItems),
        },
      };
    }),
    templates: ({ listItems }) => {
      const flatListItems = getAllListItems<Roles, DefaultRoles>(listItems);

      return templates<Roles, DefaultRoles>(flatListItems);
    },
    defineListItems: (listItems) => defineListItems<Roles, DefaultRoles>(listItems),
    defineListItem: (listItem) => defineListItem<Roles, DefaultRoles>(listItem),
  };
};

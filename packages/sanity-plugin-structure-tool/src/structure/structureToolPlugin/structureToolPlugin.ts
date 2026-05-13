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
  const Workspaces extends readonly string[] | undefined = undefined,
  const Roles extends readonly string[] | undefined = undefined,
  const DefaultRoles extends readonly string[] | undefined = undefined,
>(
  params: StructureToolPluginParams<Workspaces, Roles, DefaultRoles>,
): StructureToolPluginOutput<Workspaces, Roles, DefaultRoles> => ({
  structure: definePlugin(({ listItems }) => {
    const flatListItems = getAllListItems<Workspaces, Roles, DefaultRoles>(listItems);

    return {
      name: 'sanity-plugin-structure-tool',
      plugins: [
        structureTool({
          structure: structure<Workspaces, Roles, DefaultRoles>({ ...params, listItems }),
        }),
      ],
      schema: {
        templates: templates<Workspaces, Roles, DefaultRoles>(flatListItems),
      },
    };
  }),
  templates: ({ listItems }) => {
    const flatListItems = getAllListItems<Workspaces, Roles, DefaultRoles>(listItems);

    return templates<Workspaces, Roles, DefaultRoles>(flatListItems);
  },
  defineListItems: (listItems) => defineListItems<Workspaces, Roles, DefaultRoles>(listItems),
  defineListItem: (listItem) => defineListItem<Workspaces, Roles, DefaultRoles>(listItem),
});

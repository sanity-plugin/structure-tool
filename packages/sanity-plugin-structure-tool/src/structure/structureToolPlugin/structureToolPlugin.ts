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
  const DefaultWorkspaces extends readonly string[] | undefined = undefined,
  const Roles extends readonly string[] | undefined = undefined,
  const DefaultRoles extends readonly string[] | undefined = undefined,
>(
  params: StructureToolPluginParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
): StructureToolPluginOutput<Workspaces, DefaultWorkspaces, Roles, DefaultRoles> => ({
  structure: definePlugin(({ listItems }) => {
    const flatListItems = getAllListItems<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>(
      listItems,
    );

    return {
      name: 'sanity-plugin-structure-tool',
      plugins: [
        structureTool({
          structure: structure<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>({
            ...params,
            listItems,
          }),
        }),
      ],
      schema: {
        templates: templates<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>(flatListItems),
      },
    };
  }),
  templates: ({ listItems }) => {
    const flatListItems = getAllListItems<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>(
      listItems,
    );

    return templates<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>(flatListItems);
  },
  defineListItems: (listItems) =>
    defineListItems<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>(listItems),
  defineListItem: (listItem) =>
    defineListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>(listItem),
});

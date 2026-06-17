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

export const structureToolPlugin = <
  const Workspaces extends StructureToolParams['Workspaces'] = undefined,
  const DefaultWorkspaces extends StructureToolParams['DefaultWorkspaces'] = undefined,
  const Roles extends StructureToolParams['Roles'] = undefined,
  const DefaultRoles extends StructureToolParams['DefaultRoles'] = undefined,
>(
  params: StructureToolPluginParams<{
    Workspaces: Workspaces;
    DefaultWorkspaces: DefaultWorkspaces;
    Roles: Roles;
    DefaultRoles: DefaultRoles;
  }>,
): StructureToolPluginOutput<{
  Workspaces: Workspaces;
  DefaultWorkspaces: DefaultWorkspaces;
  Roles: Roles;
  DefaultRoles: DefaultRoles;
}> => ({
  structure: definePlugin(({ listItems }) => {
    const flatListItems = getAllListItems<{
      Workspaces: Workspaces;
      DefaultWorkspaces: DefaultWorkspaces;
      Roles: Roles;
      DefaultRoles: DefaultRoles;
    }>(listItems);

    return {
      name: 'sanity-plugin-structure-tool',
      plugins: [
        structureTool({
          structure: structure<{
            Workspaces: Workspaces;
            DefaultWorkspaces: DefaultWorkspaces;
            Roles: Roles;
            DefaultRoles: DefaultRoles;
          }>({
            ...params,
            listItems,
          }),
        }),
      ],
      schema: {
        templates: templates<{
          Workspaces: Workspaces;
          DefaultWorkspaces: DefaultWorkspaces;
          Roles: Roles;
          DefaultRoles: DefaultRoles;
        }>(flatListItems),
      },
    };
  }),
  templates: ({ listItems }) => {
    const flatListItems = getAllListItems<{
      Workspaces: Workspaces;
      DefaultWorkspaces: DefaultWorkspaces;
      Roles: Roles;
      DefaultRoles: DefaultRoles;
    }>(listItems);

    return templates<{
      Workspaces: Workspaces;
      DefaultWorkspaces: DefaultWorkspaces;
      Roles: Roles;
      DefaultRoles: DefaultRoles;
    }>(flatListItems);
  },
  defineListItems,
  defineListItem,
  helpers,
});

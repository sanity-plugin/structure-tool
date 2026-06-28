import { definePlugin } from 'sanity';
import { structureTool } from 'sanity/structure';

import { defineListItem } from '@/factories/defineListItem';
import { defineListItems } from '@/factories/defineListItems';
import { helpers } from '@/factories/helpers';
import { structure } from '@/structure/structure/structure';
import { templates } from '@/structure/templates/templates';

import type {
  StructureToolPluginOutput,
  StructureToolPluginParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { StructureToolParams } from '@/structure/types/common.types';

/**
 * Main entry point function to instantiate the Sanity Plugin Structure Tool.
 * Sets up workspaces, roles, structure builder list items, template resolvers, and return helpers.
 *
 * @param params - Configuration options for the structure tool plugin.
 * @returns The resolved structure tool outputs, containing templates, structure plugin, and helper builders.
 */
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
}> => {
  const { enableAutoGenerateTemplates = true, ...restParams } = params;

  /**
   * Internal type parameters map capturing the inferred generic arguments for workspaces and roles.
   */
  interface DefaultsStructureToolParams {
    Workspaces: Workspaces;
    DefaultWorkspaces: DefaultWorkspaces;
    Roles: Roles;
    DefaultRoles: DefaultRoles;
  }

  return {
    structure: definePlugin(({ listItems }) => ({
      name: 'sanity-plugin-structure-tool',
      plugins: [
        structureTool({
          structure: structure<DefaultsStructureToolParams>({
            ...restParams,
            listItems,
          }),
        }),
      ],
      schema: {
        ...(enableAutoGenerateTemplates
          ? {
              templates: templates<DefaultsStructureToolParams>({ listItems }),
            }
          : null),
      },
    })),
    templates,
    defineListItems,
    defineListItem,
    helpers,
  };
};

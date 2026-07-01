import { defineLocaleResourceBundle, definePlugin } from 'sanity';
import { structureTool } from 'sanity/structure';

import { constants } from '@/constants';
import { defineListItem } from '@/factories/defineListItem';
import { defineListItems } from '@/factories/defineListItems';
import { helpers } from '@/factories/helpers';
import { structure } from '@/structure/structure/structure';
import { templates } from '@/structure/templates/templates';

import type { LocaleResourceBundle } from 'sanity';

import type {
  StructureToolPluginOutput,
  StructureToolPluginParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { StructureToolParams } from '@/structure/types/common.types';

/**
 * Main entry point function to instantiate the Sanity Plugin Structure Tool.
 * Sets up workspaces, roles, locales, structure builder list items, template resolvers, and return helpers.
 *
 * @template Workspaces - The list of workspace names.
 * @template DefaultWorkspaces - The list of default workspace names.
 * @template Roles - The list of role names.
 * @template DefaultRoles - The list of default role names.
 * @template Locale - The list of translation locale codes.
 * @param params - Configuration options for the structure tool plugin.
 * @returns The resolved structure tool outputs, containing templates, structure plugin, and helper builders.
 */
export const structureToolPlugin = <
  const Workspaces extends StructureToolParams['Workspaces'] = undefined,
  const DefaultWorkspaces extends StructureToolParams['DefaultWorkspaces'] = undefined,
  const Roles extends StructureToolParams['Roles'] = undefined,
  const DefaultRoles extends StructureToolParams['DefaultRoles'] = undefined,
  const Locale extends StructureToolParams['Locale'] = undefined,
>(
  params: StructureToolPluginParams<{
    Workspaces: Workspaces;
    DefaultWorkspaces: DefaultWorkspaces;
    Roles: Roles;
    DefaultRoles: DefaultRoles;
    Locale: Locale;
  }>,
): StructureToolPluginOutput<{
  Workspaces: Workspaces;
  DefaultWorkspaces: DefaultWorkspaces;
  Roles: Roles;
  DefaultRoles: DefaultRoles;
  Locale: Locale;
}> => {
  const { i18n, enableAutoGenerateTemplates = true, ...restParams } = params;

  /**
   * Internal type parameters map capturing the inferred generic arguments for workspaces and roles.
   */
  interface DefaultsStructureToolParams {
    Workspaces: Workspaces;
    DefaultWorkspaces: DefaultWorkspaces;
    Roles: Roles;
    DefaultRoles: DefaultRoles;
    Locale: Locale;
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
      ...(i18n
        ? {
            i18n: {
              bundles: Object.entries(i18n).map(([key, value]) =>
                defineLocaleResourceBundle({
                  ...(value as LocaleResourceBundle),
                  locale: key,
                  namespace: constants.I18N_NAMESPACE,
                }),
              ),
            },
          }
        : null),
    })),
    templates,
    defineListItems,
    defineListItem,
    helpers,
  };
};

import type { SortOrderingItem } from 'sanity';
import type { ChildResolverOptions, StructureBuilder } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type {
  ListItemReturn,
  StructureToolGenericParam,
  StructureToolParams,
  ValidSanityContext,
} from '@/structure/types/common.types';
import type { ListItem } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';
import type { sanitizeUrl } from '@/utils';

/**
 * Context values passed to a dynamic list item ID generator function.
 */
export type ListItemId = Record<
  'values',
  {
    /**
     * Unique identifier for this item context.
     */
    uniqueId: string;
    /**
     * Array of paths sanitized for this item.
     */
    sanitizedPaths: string[];
    /**
     * Primary id value.
     */
    id: string;
    /**
     * A slugify function to generate URL safe slugs from strings.
     */
    slugify: typeof sanitizeUrl;
  }
>;

/**
 * Represents the parent and child display titles configuration for a list item.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface ListItemTitle<T extends StructureToolParams> {
  /**
   * The display title when this item is rendered as a parent list/pane.
   */
  parent?: StructureToolGenericParam<T, string>;
  /**
   * The display title when this item is rendered as a child of another list.
   */
  child?: StructureToolGenericParam<T, string, ListItemChildOptions>;
}

/**
 * Extra context parameters representing the options passed by the Sanity child pane resolver.
 */
export interface ListItemChildOptions {
  /**
   * The options provided by the Sanity Studio child resolver context.
   */
  childOptions: ChildResolverOptions;
}

/**
 * Configuration for defining nested children of a list item.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface ListItemChildren<T extends StructureToolParams> {
  /**
   * Nested child list items. Can be an array or a dynamic callback function returning list items.
   */
  children?: StructureToolGenericParam<T, ListItem<T>[], ListItemChildOptions>;
}

/**
 * Defines default ordering rules for a list item pane.
 * Maps field paths to direction ('asc' | 'desc') or sorting items.
 */
export type ListItemDefaultOrdering = Record<
  string,
  SortOrderingItem['direction'] | Omit<SortOrderingItem, 'field'>
>;

/**
 * A callback function to construct a list item or divider imperatively using the native Sanity `StructureBuilder`.
 * Returns `null` if the item shouldn't be rendered.
 */
export type ListItemRaw = (S: StructureBuilder, context: ValidSanityContext) => ListItemReturn;

/**
 * Restricts visibility of a list item to specific workspaces.
 * Can be an array of workspace names or a dynamic function returning workspace names.
 *
 * @template T - The structure tool configuration parameters schema, containing Workspaces and DefaultWorkspaces.
 */
export type ListItemWorkspaces<
  T extends SetNonNullable<StructureToolParams, 'Workspaces' | 'DefaultWorkspaces'>,
> = StructureToolGenericParam<
  T,
  T['Workspaces'][number][],
  {
    /**
     * The default workspace configuration fallback.
     */
    defaultWorkspaces: T['DefaultWorkspaces'];
  }
>;

/**
 * Restricts visibility of a list item to users with specific roles.
 * Can be an array of role names or a dynamic function returning role names.
 *
 * @template T - The structure tool configuration parameters schema, containing Roles and DefaultRoles.
 */
export type ListItemRoles<T extends SetNonNullable<StructureToolParams, 'Roles' | 'DefaultRoles'>> =
  StructureToolGenericParam<
    T,
    T['Roles'][number][],
    {
      /**
       * The default role configuration fallback.
       */
      defaultRoles: T['DefaultRoles'];
    }
  >;

/**
 * Mixin type mapping role and workspace visibility constraints onto a list item definition.
 * Dynamically resolves to include `roles` and/or `workspaces` properties depending on the generic constraints.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export type WorkspacesAndRolesListItem<T extends StructureToolParams> = SimpleMerge<
  [
    T['Workspaces'] extends SetNonNullable<StructureToolParams>['Workspaces']
      ? T['DefaultWorkspaces'] extends SetNonNullable<StructureToolParams>['DefaultWorkspaces']
        ? {
            /**
             * Workspace-level restrictions for this list item.
             */
            workspaces?: ListItemWorkspaces<{
              Workspaces: T['Workspaces'];
              DefaultWorkspaces: T['DefaultWorkspaces'];
              Roles: T['Roles'];
              DefaultRoles: T['DefaultRoles'];
              Locale: T['Locale'];
            }>;
          }
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {}
      : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        {},
    T['Roles'] extends SetNonNullable<StructureToolParams>['Roles']
      ? T['DefaultRoles'] extends SetNonNullable<StructureToolParams>['DefaultRoles']
        ? {
            /**
             * Role-level restrictions for this list item.
             */
            roles?: ListItemRoles<{
              Workspaces: T['Workspaces'];
              DefaultWorkspaces: T['DefaultWorkspaces'];
              Roles: T['Roles'];
              DefaultRoles: T['DefaultRoles'];
              Locale: T['Locale'];
            }>;
          }
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {}
      : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        {},
  ]
>;

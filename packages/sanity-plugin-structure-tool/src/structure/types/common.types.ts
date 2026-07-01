import type { ConfigContext, CurrentUser } from 'sanity';
import type { ListBuilder, StructureBuilder } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { SimpleMerge } from '@/types/lib.types';

/**
 * Enforces compile-time type safety on workspaces and roles.
 * Users define string literal unions for workspaces and roles here, which are then checked by the system.
 */
export interface StructureToolParams {
  /**
   * The list of valid workspace names as a readonly array of string literal types.
   */
  Workspaces: readonly string[] | undefined;
  /**
   * The default active workspaces to fallback to when no workspace is active/selected.
   */
  DefaultWorkspaces: readonly string[] | undefined;
  /**
   * The list of valid user role names as a readonly array of string literal types.
   */
  Roles: readonly string[] | undefined;
  /**
   * The default user roles to fallback to when no roles are found/configured on the user.
   */
  DefaultRoles: readonly string[] | undefined;
  /**
   * The translation locale codes as a string literal union type.
   */
  Locale: string | undefined;
}

/**
 * A refinement of Sanity's `ConfigContext` where the `currentUser` property is guaranteed to be non-null.
 */
export type ValidSanityContext = SetNonNullable<ConfigContext, 'currentUser'>;

/**
 * Utility type to extract a union of workspace names defined in the schema.
 * Defaults to `string` if no workspaces are specified.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export type Workspace<T extends Pick<StructureToolParams, 'Workspaces'>> =
  T['Workspaces'] extends readonly string[] ? T['Workspaces'][number] : string;

/**
 * Standard parameters provided to callbacks during rendering and structure building.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface StructureCommonParams<T extends StructureToolParams> {
  /**
   * Sanity's `StructureBuilder` instance used to construct the panes.
   */
  S: StructureBuilder;
  /**
   * The active workspace.
   */
  workspace: Workspace<T>;
  /**
   * The current non-null context of Sanity Studio.
   */
  context: ValidSanityContext;
}

/**
 * Parameters passed to callback functions when resolving values dynamically.
 *
 * @template T - The structure tool configuration parameters schema.
 * @template U - Extra parameters to merge into the callback context.
 */
export type StructureToolCallbackParams<
  T extends Pick<StructureToolParams, 'Workspaces'>,
  U = unknown,
> = SimpleMerge<
  [
    {
      /**
       * The currently active workspace.
       */
      workspace: Workspace<T>;
      /**
       * Information about the current authenticated user.
       */
      currentUser: CurrentUser;
      /**
       * The current non-null context of Sanity Studio.
       */
      context: ValidSanityContext;
    },
    U,
  ]
>;

/**
 * A configuration value that can either be a direct value `R`,
 * or a callback function returning `R` that receives contextual information.
 *
 * @template T - The structure tool configuration parameters schema.
 * @template R - The type of the value.
 * @template U - Additional parameters to merge into the callback context.
 */
export type StructureToolGenericParam<
  T extends Pick<StructureToolParams, 'Workspaces'>,
  R,
  U = unknown,
> = R | ((params: StructureToolCallbackParams<T, U>) => R);

/**
 * The return type for a resolved list item in Sanity structure builder.
 * Resolves to the elements accepted by Sanity's `ListBuilder.items()`, or `null` if the item is omitted/filtered out.
 */
export type ListItemReturn = Parameters<ListBuilder['items']>[0][number] | null;

/**
 * Utility type to extract the raw/original type of a `StructureToolGenericParam` configuration value.
 * Resolves the callback return type or the direct value type `R`.
 *
 * @template T - The generic configuration parameter type.
 */
export type GetListItemOriginalType<T> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends StructureToolGenericParam<infer _P, infer R, infer _U> ? R : never;

import type { ConfigContext, CurrentUser } from 'sanity';
import type { StructureBuilder } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { SimpleMerge } from '@/types/lib.types';

export interface StructureToolParams {
  Workspaces: readonly string[] | undefined;
  DefaultWorkspaces: readonly string[] | undefined;
  Roles: readonly string[] | undefined;
  DefaultRoles: readonly string[] | undefined;
}

export type ValidSanityContext = SetNonNullable<ConfigContext, 'currentUser'>;

export type Workspace<T extends Pick<StructureToolParams, 'Workspaces'>> =
  T['Workspaces'] extends readonly string[] ? T['Workspaces'][number] : string;

export interface StructureCommonParams<T extends StructureToolParams> {
  S: StructureBuilder;
  workspace: Workspace<T>;
  context: ValidSanityContext;
}

export type StructureToolCallbackParams<
  T extends Pick<StructureToolParams, 'Workspaces'>,
  U = unknown,
> = SimpleMerge<
  [
    {
      workspace: Workspace<T>;
      currentUser: CurrentUser;
      context: ValidSanityContext;
    },
    U,
  ]
>;

export type StructureToolGenericParam<
  T extends Pick<StructureToolParams, 'Workspaces'>,
  R,
  U = unknown,
> = R | ((params: StructureToolCallbackParams<T, U>) => R);

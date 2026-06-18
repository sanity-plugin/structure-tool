import type { ConfigContext, CurrentUser } from 'sanity';
import type { SetNonNullable } from 'type-fest';

export interface StructureToolParams {
  Workspaces: readonly string[] | undefined;
  DefaultWorkspaces: readonly string[] | undefined;
  Roles: readonly string[] | undefined;
  DefaultRoles: readonly string[] | undefined;
}

export type ValidSanityContext = SetNonNullable<ConfigContext, 'currentUser'>;

export type Workspace<T extends Pick<StructureToolParams, 'Workspaces'>> =
  T['Workspaces'] extends readonly string[] ? T['Workspaces'][number] : string;

export interface StructureToolCallbackParams<T extends Pick<StructureToolParams, 'Workspaces'>> {
  workspace: Workspace<T>;
  currentUser: CurrentUser;
  context: ValidSanityContext;
}

export type StructureToolGenericParam<T extends Pick<StructureToolParams, 'Workspaces'>, R> =
  | R
  | ((params: StructureToolCallbackParams<T>) => R);

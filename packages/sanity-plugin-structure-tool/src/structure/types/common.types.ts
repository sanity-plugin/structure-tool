import type { CurrentUser } from 'sanity';
import type { StructureResolverContext } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

export interface StructureToolParams {
  Workspaces: readonly string[] | undefined;
  DefaultWorkspaces: readonly string[] | undefined;
  Roles: readonly string[] | undefined;
  DefaultRoles: readonly string[] | undefined;
}

export type Workspace<T extends Pick<StructureToolParams, 'Workspaces'>> =
  T['Workspaces'] extends readonly string[] ? T['Workspaces'][number] : string;

interface StructureToolCallbackParams<T extends Pick<StructureToolParams, 'Workspaces'>> {
  workspace: Workspace<T>;
  currentUser: CurrentUser;
  context: SetNonNullable<StructureResolverContext, 'currentUser'>;
}

export type StructureToolGenericParam<T extends Pick<StructureToolParams, 'Workspaces'>, R> =
  | R
  | ((params: StructureToolCallbackParams<T>) => R);

import type { ListItemWithoutGenerics } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

// Workspaces

interface ListItemWorkspacesParams<DefaultWorkspaces extends readonly string[]> {
  defaultWorkspaces: DefaultWorkspaces;
}

export type ListItemWorkspaces<
  Workspaces extends readonly string[],
  DefaultWorkspaces extends readonly string[],
> =
  | Workspaces[number][]
  | ((params: ListItemWorkspacesParams<DefaultWorkspaces>) => Workspaces[number][]);

// Roles

interface ListItemRolesParams<DefaultRoles extends readonly string[]> {
  defaultRoles: DefaultRoles;
}

export type ListItemRoles<
  Roles extends readonly string[],
  DefaultRoles extends readonly string[],
> = Roles[number][] | ((params: ListItemRolesParams<DefaultRoles>) => Roles[number][]);

export type ListItemCore<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    ListItemWithoutGenerics,
    Workspaces extends readonly string[]
      ? DefaultWorkspaces extends readonly string[]
        ? {
            workspaces?: ListItemWorkspaces<Workspaces, DefaultWorkspaces>;
          }
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {}
      : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        {},
    Roles extends readonly string[]
      ? DefaultRoles extends readonly string[]
        ? {
            roles?: ListItemRoles<Roles, DefaultRoles>;
          }
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {}
      : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        {},
  ]
>;

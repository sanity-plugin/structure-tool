import type { StructureToolParams } from '@/structure/types/common.types';
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

export type ListItemWithWorkspacesAndRoles<T extends StructureToolParams> = SimpleMerge<
  [
    T['Workspaces'] extends readonly string[]
      ? T['DefaultWorkspaces'] extends readonly string[]
        ? {
            workspaces?: ListItemWorkspaces<T['Workspaces'], T['Workspaces']>;
          }
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {}
      : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        {},
    T['Roles'] extends readonly string[]
      ? T['DefaultRoles'] extends readonly string[]
        ? {
            roles?: ListItemRoles<T['Roles'], T['DefaultRoles']>;
          }
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {}
      : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        {},
  ]
>;

export type ListItemCore<T extends StructureToolParams> = SimpleMerge<
  [ListItemWithoutGenerics, ListItemWithWorkspacesAndRoles<T>]
>;

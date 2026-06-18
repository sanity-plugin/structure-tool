import type { SetNonNullable } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

// Workspaces

interface ListItemWorkspacesParams<
  T extends Pick<SetNonNullable<StructureToolParams>, 'DefaultWorkspaces'>,
> {
  defaultWorkspaces: T['DefaultWorkspaces'];
}

export type ListItemWorkspaces<
  T extends Pick<SetNonNullable<StructureToolParams>, 'Workspaces' | 'DefaultWorkspaces'>,
> =
  | T['Workspaces'][number][]
  | ((params: ListItemWorkspacesParams<T>) => T['Workspaces'][number][]);

// Roles

interface ListItemRolesParams<
  T extends Pick<SetNonNullable<StructureToolParams>, 'Roles' | 'DefaultRoles'>,
> {
  defaultRoles: T['DefaultRoles'];
}

export type ListItemRoles<
  T extends Pick<SetNonNullable<StructureToolParams>, 'Roles' | 'DefaultRoles'>,
> = T['Roles'][number][] | ((params: ListItemRolesParams<T>) => T['Roles'][number][]);

export type ListItemWithWorkspacesAndRoles<T extends StructureToolParams> = SimpleMerge<
  [
    T['Workspaces'] extends SetNonNullable<StructureToolParams>['Workspaces']
      ? T['DefaultWorkspaces'] extends SetNonNullable<StructureToolParams>['DefaultWorkspaces']
        ? {
            workspaces?: ListItemWorkspaces<{
              Workspaces: T['Workspaces'];
              DefaultWorkspaces: T['DefaultWorkspaces'];
            }>;
          }
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {}
      : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        {},
    T['Roles'] extends SetNonNullable<StructureToolParams>['Roles']
      ? T['DefaultRoles'] extends SetNonNullable<StructureToolParams>['DefaultRoles']
        ? {
            roles?: ListItemRoles<{
              Roles: T['Roles'];
              DefaultRoles: T['DefaultRoles'];
            }>;
          }
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {}
      : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        {},
  ]
>;

export type ListItemCore<T extends StructureToolParams> = SimpleMerge<
  [ListItem<T>, ListItemWithWorkspacesAndRoles<T>]
>;

import type { SortOrderingItem } from 'sanity';
import type { ListBuilder, StructureBuilder } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type {
  StructureToolGenericParam,
  StructureToolParams,
  ValidSanityContext,
} from '@/structure/types/common.types';
import type { SimpleMerge } from '@/types/lib.types';
import type { sanitizeUrl } from '@/utils';

// Id

export type ListItemId = Record<
  'values',
  {
    uniqueId: string;
    sanitizedPaths: string[];
    id: string;
    slugify: typeof sanitizeUrl;
  }
>;

// Default Ordering

export type ListItemDefaultOrdering = Record<
  string,
  SortOrderingItem['direction'] | Omit<SortOrderingItem, 'field'>
>;

// Raw

export type ListItemRaw = (
  S: StructureBuilder,
  context: ValidSanityContext,
) => Parameters<ListBuilder['items']>[0][number] | null;

// Workspaces

export type ListItemWorkspaces<
  T extends SetNonNullable<StructureToolParams, 'Workspaces' | 'DefaultWorkspaces'>,
> = StructureToolGenericParam<
  T,
  T['Workspaces'][number][],
  {
    defaultWorkspaces: T['DefaultWorkspaces'];
  }
>;

// Roles

export type ListItemRoles<T extends SetNonNullable<StructureToolParams, 'Roles' | 'DefaultRoles'>> =
  StructureToolGenericParam<
    T,
    T['Roles'][number][],
    {
      defaultRoles: T['DefaultRoles'];
    }
  >;

// Workspaces & Roles

export type WorkspacesAndRolesListItem<T extends StructureToolParams> = SimpleMerge<
  [
    T['Workspaces'] extends SetNonNullable<StructureToolParams>['Workspaces']
      ? T['DefaultWorkspaces'] extends SetNonNullable<StructureToolParams>['DefaultWorkspaces']
        ? {
            workspaces?: ListItemWorkspaces<{
              Workspaces: T['Workspaces'];
              DefaultWorkspaces: T['DefaultWorkspaces'];
              Roles: T['Roles'];
              DefaultRoles: T['DefaultRoles'];
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
              Workspaces: T['Workspaces'];
              DefaultWorkspaces: T['DefaultWorkspaces'];
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

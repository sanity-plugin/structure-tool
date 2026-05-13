import type { IconComponent } from '@sanity/icons';
import type { ComponentType, ReactNode } from 'react';
import type { CurrentUser } from 'sanity';
import type { ListBuilder, StructureBuilder, StructureResolverContext } from 'sanity/structure';
import type { Merge, SetNonNullable } from 'type-fest';

import type { WorkspaceType } from '@/types/constants.types';
import type { SimpleMerge } from '@/types/lib.types';

export type ListItemFilters = string[] | ((currentUser: CurrentUser) => string[]);

export type ListItemRaw = (
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
) => Parameters<ListBuilder['items']>[0][number] | null;

interface ListItemRolesParams<DefaultRoles extends readonly string[]> {
  defaultRoles: DefaultRoles;
}

export type ListItemRoles<
  Roles extends readonly string[],
  DefaultRoles extends readonly string[],
> = Roles[number][] | ((params: ListItemRolesParams<DefaultRoles>) => Roles[number][]);

export interface ListItemCore {
  title?: string;
  schemaType?: string;
  icon?: IconComponent | ComponentType | ReactNode;
  raw?: ListItemRaw;
  singleton?: boolean;
  filters?: ListItemFilters;
  filterParams?: Record<string, unknown>;
  hideAddButton?: boolean;
  isDivider?: boolean;
  isPlural?: boolean;
  templates?: Record<string, unknown>;
}

export type ListItem<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    ListItemCore,
    Roles extends readonly string[]
      ? DefaultRoles extends readonly string[]
        ? {
            roles: ListItemRoles<Roles, DefaultRoles>;
          }
        : Record<string, never>
      : Record<string, never>,
    {
      workspaces?: WorkspaceType[];
      children?: ListItem<Roles, DefaultRoles>[];
    },
  ]
>;

export type ListItemExtended<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = Merge<
  ListItem<Roles, DefaultRoles>,
  {
    id: string;
    children: ListItemExtended<Roles, DefaultRoles>[];
  }
>;

import type { IconComponent } from '@sanity/icons';
import type { ComponentType, ReactNode } from 'react';
import type { CurrentUser } from 'sanity';
import type { ListBuilder, StructureBuilder, StructureResolverContext } from 'sanity/structure';
import type { Merge, SetNonNullable } from 'type-fest';

import type { WorkspaceType } from '@/types/constants.types';

export type ListItemFilters = string[] | ((currentUser: CurrentUser) => string[]);

export type ListItemRaw = (
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
) => Parameters<ListBuilder['items']>[0][number] | null;

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

export type ListItem<Roles extends readonly string[] | undefined> = Merge<
  ListItemCore,
  {
    roles?: Roles extends readonly string[] ? Roles[number][] : never;
    workspaces?: WorkspaceType[];
    children?: ListItem<Roles>[];
  }
>;

export interface ListItemExtended<
  Roles extends readonly string[] | undefined,
> extends ListItem<Roles> {
  id: string;
  children: ListItemExtended<Roles>[];
}

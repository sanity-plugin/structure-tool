import type { ComponentType, ReactNode } from 'react';
import type { CurrentUser } from 'sanity';
import type {
  ListBuilder,
  StructureBuilder,
  StructureResolverContext,
  UserComponent,
} from 'sanity/structure';
import type { RequireOneOrNone, SetNonNullable } from 'type-fest';

import type { ListItemCore } from '@/structure/types/listItemCore.types';
import type { IconComponent, SimpleMerge } from '@/types/lib.types';

// Filter & Filter Params

interface ListItemFilterCallbackParams {
  currentUser: CurrentUser;
}

export type ListItemFilter = string | ((params: ListItemFilterCallbackParams) => string);

export type ListItemFilterParams =
  | Record<string, unknown>
  | ((params: ListItemFilterCallbackParams) => Record<string, unknown>);

// Raw

export type ListItemRaw = (
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
) => Parameters<ListBuilder['items']>[0][number] | null;

export type ListItemWithoutGenerics = RequireOneOrNone<
  {
    title?: string;
    schemaType?: string;
    icon?: IconComponent | ComponentType | ReactNode;
    singleton?: boolean;
    component?: UserComponent;
    apiVersion?: string;
    filter?: ListItemFilter;
    filterParams?: ListItemFilterParams;
    hideAddButton?: boolean;
    templates?: Record<string, unknown>;
    raw?: ListItemRaw;
    isDivider?: boolean;
    isPlural?: boolean;
  },
  'hideAddButton' | 'templates'
>;

export type ListItem<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    ListItemCore<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
    {
      children?: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[];
    },
  ]
>;

export type ListItemExtended<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    ListItemCore<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
    {
      id: string;
      displayTitle: string;
      children: ListItemExtended<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[];
    },
  ]
>;

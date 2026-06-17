import type { ComponentType, ReactNode } from 'react';
import type { CurrentUser } from 'sanity';
import type {
  ListBuilder,
  StructureBuilder,
  StructureResolverContext,
  UserComponent,
} from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
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

export interface ListItemWithoutGenerics {
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
}

export type ListItem<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemCore<T>,
    {
      children?: ListItem<T>[];
    },
  ]
>;

export type ListItemExtended<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemCore<T>,
    {
      id: string;
      displayTitle: string;
      children: ListItemExtended<T>[];
    },
  ]
>;

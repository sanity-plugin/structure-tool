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

export interface ListItemFilterCallbackParams {
  currentUser: CurrentUser;
}

// Raw

export type ListItemRaw = (
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
) => Parameters<ListBuilder['items']>[0][number] | null;

export interface ListItem<T extends StructureToolParams> {
  title?: string;
  schemaType?: string;
  icon?: IconComponent | ComponentType | ReactNode;
  singleton?: boolean;
  component?: UserComponent;
  children?: ListItem<T>[];
  apiVersion?: string;
  filter?: string | ((params: ListItemFilterCallbackParams) => string);
  filterParams?:
    | Record<string, unknown>
    | ((params: ListItemFilterCallbackParams) => Record<string, unknown>);
  hideAddButton?: boolean;
  templates?: Record<string, unknown>;
  raw?: ListItemRaw;
  isDivider?: boolean;
  isPlural?: boolean;
}

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

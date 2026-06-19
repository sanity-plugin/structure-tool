import type { ComponentType, ReactNode } from 'react';
import type { PreviewLayoutKey, SortOrderingItem } from 'sanity';
import type { ListBuilder, StructureBuilder, UserComponent } from 'sanity/structure';

import type {
  StructureToolGenericParam,
  StructureToolParams,
  ValidSanityContext,
} from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { IconComponent, SimpleMerge } from '@/types/lib.types';

// Default Ordering

type ListItemDefaultOrdering = Record<
  string,
  SortOrderingItem['direction'] | Omit<SortOrderingItem, 'field'>
>;

// Raw

export type ListItemRaw = (
  S: StructureBuilder,
  context: ValidSanityContext,
) => Parameters<ListBuilder['items']>[0][number] | null;

// Core

export interface ListItemCore {
  title?: string;
  schemaType?: string;
  icon?: IconComponent | ComponentType | ReactNode;
  singleton?: boolean;
  component?: UserComponent;
  componentProps?: Record<string, unknown>;
  apiVersion?: string;
  filter?: string;
  filterParams?: Record<string, unknown>;
  defaultOrdering?: ListItemDefaultOrdering;
  defaultLayout?: PreviewLayoutKey;
  hideAddButton?: boolean;
  templates?: Record<string, unknown>;
  raw?: ListItemRaw;
  isDivider?: boolean;
  isPlural?: boolean;
}

type DefaultListItem = 'icon' | 'component' | 'raw';

type DynamicListItemProps<T extends StructureToolParams> = {
  [K in Exclude<keyof ListItemCore, DefaultListItem>]?: StructureToolGenericParam<
    T,
    ListItemCore[K]
  >;
};

export type ListItem<T extends StructureToolParams> = SimpleMerge<
  [
    Pick<ListItemCore, DefaultListItem>,
    DynamicListItemProps<T>,
    {
      children?: StructureToolGenericParam<T, ListItem<T>[]>;
    },
  ]
>;

export type ListItemExtended<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemCore,
    ListItemWithWorkspacesAndRoles<T>,
    {
      id: string;
      displayTitle: string;
      children: ListItemExtended<T>[];
    },
  ]
>;

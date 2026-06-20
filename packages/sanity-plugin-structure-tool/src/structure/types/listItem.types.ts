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
  icon?: IconComponent | ComponentType | ReactNode | false;
  showIcons?: boolean;
  singleton?: boolean;
  component?: UserComponent;
  componentOptions?: Record<string, unknown>;
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
      id?: StructureToolGenericParam<T, string, ListItemId>;
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
      showIcon: boolean;
    },
  ]
>;

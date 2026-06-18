import type { ComponentType, ReactNode } from 'react';
import type { ListBuilder, StructureBuilder, UserComponent } from 'sanity/structure';

import type {
  StructureToolGenericParam,
  StructureToolParams,
  ValidSanityContext,
} from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { IconComponent, SimpleMerge } from '@/types/lib.types';

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
  apiVersion?: string;
  filter?: string;
  filterParams?: Record<string, unknown>;
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
      children?: ListItem<T>[];
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

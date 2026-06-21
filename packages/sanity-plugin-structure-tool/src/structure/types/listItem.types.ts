import type { ComponentType, ReactNode } from 'react';
import type { PreviewLayoutKey } from 'sanity';
import type { MenuItem, MenuItemGroup, UserComponent } from 'sanity/structure';

import type {
  StructureToolGenericParam,
  StructureToolParams,
} from '@/structure/types/common.types';
import type {
  ListItemDefaultOrdering,
  ListItemId,
  ListItemRaw,
  WorkspacesAndRolesListItem,
} from '@/structure/types/listItemDefinitions.types';
import type { IconComponent, SimpleMerge } from '@/types/lib.types';

// List Item Core

export interface ListItemCore<T extends StructureToolParams> {
  id?: StructureToolGenericParam<T, string, ListItemId>;
  title?: StructureToolGenericParam<T, string>;
  schemaType?: StructureToolGenericParam<T, string>;
  icon?: IconComponent | ComponentType | ReactNode | false;
  showIcons?: StructureToolGenericParam<T, boolean>;
  singleton?: StructureToolGenericParam<T, boolean>;
  component?: UserComponent;
  componentOptions?: StructureToolGenericParam<T, Record<string, unknown>>;
  apiVersion?: StructureToolGenericParam<T, string>;
  filter?: StructureToolGenericParam<T, string>;
  filterParams?: StructureToolGenericParam<T, Record<string, unknown>>;
  defaultOrdering?: StructureToolGenericParam<T, ListItemDefaultOrdering>;
  defaultLayout?: StructureToolGenericParam<T, PreviewLayoutKey>;
  menuItemGroups?: StructureToolGenericParam<T, MenuItemGroup[]>;
  menuItems?: StructureToolGenericParam<T, MenuItem[]>;
  hideAddButton?: StructureToolGenericParam<T, boolean>;
  templates?: StructureToolGenericParam<T, Record<string, unknown>>;
  raw?: ListItemRaw;
  isDivider?: StructureToolGenericParam<T, boolean>;
  isPlural?: StructureToolGenericParam<T, boolean>;
}

// List Item

export type ListItem<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemCore<T>,
    WorkspacesAndRolesListItem<T>,
    {
      children?: StructureToolGenericParam<T, ListItem<T>[]>;
    },
  ]
>;

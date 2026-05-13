import type { userRoles } from '@/constants';
import type { Plugin, TemplateResolver } from 'sanity';
import type {
  StructureBuilder,
  StructureResolver,
  StructureResolverContext,
} from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { DefineListItemType } from '@/factories/defineListItem';
import type { DefineListItemsType } from '@/factories/defineListItems';
import type { ListItem, ListItemExtended, ListItemRaw } from '@/structure/types/listItem.types';

// Render content type

export type RenderListItem = <Roles extends string[]>(
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
  listItem: ListItemExtended<Roles>,
) => ReturnType<ListItemRaw>;

// Structure

export type Structure = <Roles extends string[], DefaultRoles extends string[]>(
  params: StructureToolPluginParams<Roles, DefaultRoles>,
) => StructureResolver;

// Structure Tool

type MustIncludeAdminRole<T extends string[]> = typeof userRoles.ADMINISTRATOR extends T[number]
  ? T
  : never;

export interface StructureToolPluginParams<Roles extends string[], DefaultRoles extends string[]> {
  title: string;
  emptyListTitle?: string;
  roles?: MustIncludeAdminRole<Roles>;
  defaultRoles?: MustIncludeAdminRole<DefaultRoles>;
}

export type StructureToolItemParams<Roles extends string[], DefaultRoles extends string[]> = Omit<
  StructureToolPluginParams<Roles, DefaultRoles>,
  'title' | 'emptyListTitle'
>;

interface StructureToolPluginOutputParams<Roles extends string[]> {
  listItems: ListItem<Roles>[];
}

export interface StructureToolPluginOutput<Roles extends string[]> {
  structure: Plugin<StructureToolPluginOutputParams<Roles>>;
  templates: (params: StructureToolPluginOutputParams<Roles>) => TemplateResolver;
  defineListItems: DefineListItemsType<Roles>;
  defineListItem: DefineListItemType<Roles>;
}

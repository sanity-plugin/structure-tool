import type { Plugin, TemplateResolver } from 'sanity';
import type { Merge, RequireAllOrNone } from 'type-fest';

import type { userRoles } from '@/constants';
import type { DefineListItemType } from '@/factories/defineListItem';
import type { DefineListItemsType } from '@/factories/defineListItems';
import type { ListItem } from '@/structure/types/listItem.types';

export interface StructureToolCoreParams {
  title: string;
  emptyListTitle?: string;
}

type MustIncludeAdminRole<T extends string[]> = typeof userRoles.ADMINISTRATOR extends T[number]
  ? T
  : never;

export interface StructureToolRoleParams<Roles extends string[], DefaultRoles extends string[]> {
  roles?: MustIncludeAdminRole<Roles>;
  defaultRoles?: MustIncludeAdminRole<DefaultRoles>;
}

export type StructureToolPluginParams<
  Roles extends string[],
  DefaultRoles extends string[],
> = Merge<RequireAllOrNone<StructureToolRoleParams<Roles, DefaultRoles>>, StructureToolCoreParams>;

interface StructureToolPluginOutputParams<Roles extends string[]> {
  listItems: ListItem<Roles>[];
}

export interface StructureToolPluginOutput<Roles extends string[]> {
  structure: Plugin<StructureToolPluginOutputParams<Roles>>;
  templates: (params: StructureToolPluginOutputParams<Roles>) => TemplateResolver;
  defineListItems: DefineListItemsType<Roles>;
  defineListItem: DefineListItemType<Roles>;
}

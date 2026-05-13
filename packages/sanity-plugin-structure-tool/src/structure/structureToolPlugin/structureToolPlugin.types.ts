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

type MustIncludeAdminRole<T extends readonly string[] | undefined> = T extends readonly string[]
  ? typeof userRoles.ADMINISTRATOR extends T[number]
    ? T
    : never
  : never;

export interface StructureToolRoleParams<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  roles?: MustIncludeAdminRole<Roles>;
  defaultRoles?: MustIncludeAdminRole<DefaultRoles>;
}

export type StructureToolPluginParams<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = Merge<RequireAllOrNone<StructureToolRoleParams<Roles, DefaultRoles>>, StructureToolCoreParams>;

interface StructureToolPluginOutputParams<Roles extends readonly string[] | undefined> {
  listItems: ListItem<Roles>[];
}

export interface StructureToolPluginOutput<Roles extends readonly string[] | undefined> {
  structure: Plugin<StructureToolPluginOutputParams<Roles>>;
  templates: (params: StructureToolPluginOutputParams<Roles>) => TemplateResolver;
  defineListItems: DefineListItemsType<Roles>;
  defineListItem: DefineListItemType<Roles>;
}

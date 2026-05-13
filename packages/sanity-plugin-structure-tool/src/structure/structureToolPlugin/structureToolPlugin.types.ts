import type { Plugin, TemplateResolver } from 'sanity';
import type { RequireAllOrNone } from 'type-fest';

import type { userRoles } from '@/constants';
import type { DefineListItemType } from '@/factories/defineListItem';
import type { DefineListItemsType } from '@/factories/defineListItems';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

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
> = SimpleMerge<
  [RequireAllOrNone<StructureToolRoleParams<Roles, DefaultRoles>>, StructureToolCoreParams]
>;

interface StructureToolPluginOutputParams<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  listItems: ListItem<Roles, DefaultRoles>[];
}

export interface StructureToolPluginOutput<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  structure: Plugin<StructureToolPluginOutputParams<Roles, DefaultRoles>>;
  templates: (params: StructureToolPluginOutputParams<Roles, DefaultRoles>) => TemplateResolver;
  defineListItems: DefineListItemsType<Roles, DefaultRoles>;
  defineListItem: DefineListItemType<Roles, DefaultRoles>;
}

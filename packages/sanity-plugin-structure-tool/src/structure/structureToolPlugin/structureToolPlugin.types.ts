import type { Plugin, TemplateResolver } from 'sanity';
import type { RequireAllOrNone } from 'type-fest';

import type { DefineListItemType } from '@/factories/defineListItem';
import type { DefineListItemsType } from '@/factories/defineListItems';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

export interface StructureToolCoreParams {
  title: string;
  emptyListTitle?: string;
}

export interface StructureToolRoleParams<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  roles?: Roles;
  defaultRoles?: DefaultRoles;
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

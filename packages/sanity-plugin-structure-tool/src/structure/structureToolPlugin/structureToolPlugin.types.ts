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
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  workspaces?: Workspaces;
  roles?: Roles;
  defaultRoles?: DefaultRoles;
}

export type StructureToolPluginParams<
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    RequireAllOrNone<StructureToolRoleParams<Workspaces, Roles, DefaultRoles>>,
    StructureToolCoreParams,
  ]
>;

interface StructureToolPluginOutputParams<
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  listItems: ListItem<Workspaces, Roles, DefaultRoles>[];
}

export interface StructureToolPluginOutput<
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  structure: Plugin<StructureToolPluginOutputParams<Workspaces, Roles, DefaultRoles>>;
  templates: (
    params: StructureToolPluginOutputParams<Workspaces, Roles, DefaultRoles>,
  ) => TemplateResolver;
  defineListItems: DefineListItemsType<Workspaces, Roles, DefaultRoles>;
  defineListItem: DefineListItemType<Workspaces, Roles, DefaultRoles>;
}

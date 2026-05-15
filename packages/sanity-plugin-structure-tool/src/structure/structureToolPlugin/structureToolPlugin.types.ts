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

export interface StructureToolWorkspaceParams<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
> {
  workspaces?: Workspaces;
  defaultWorkspaces?: DefaultWorkspaces;
}

export interface StructureToolRoleParams<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  roles?: Roles;
  defaultRoles?: DefaultRoles;
}

export type StructureToolPluginParams<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    RequireAllOrNone<StructureToolWorkspaceParams<Workspaces, DefaultWorkspaces>>,
    RequireAllOrNone<StructureToolRoleParams<Roles, DefaultRoles>>,
    StructureToolCoreParams,
  ]
>;

interface StructureToolPluginOutputParams<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  listItems: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[];
}

export interface StructureToolPluginOutput<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  structure: Plugin<
    StructureToolPluginOutputParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>
  >;
  templates: (
    params: StructureToolPluginOutputParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
  ) => TemplateResolver;
  defineListItems: DefineListItemsType<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;
  defineListItem: DefineListItemType<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;
}

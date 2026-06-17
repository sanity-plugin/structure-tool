import type { Plugin, TemplateResolver } from 'sanity';
import type { StructureResolverContext } from 'sanity/structure';
import type { RequireAllOrNone } from 'type-fest';

import type { DefineListItemType } from '@/factories/defineListItem';
import type { DefineListItemsType } from '@/factories/defineListItems';
import type { Helpers } from '@/factories/helpers';
import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

interface StructureToolCoreFieldParams<T extends Pick<StructureToolParams, 'Workspaces'>> {
  workspace: T['Workspaces'] extends readonly string[] ? T['Workspaces'][number] : string;
  context: StructureResolverContext;
}

export interface StructureToolCoreParams<T extends Pick<StructureToolParams, 'Workspaces'>> {
  title: string | ((params: StructureToolCoreFieldParams<T>) => string);
  emptyListTitle?: string | ((params: StructureToolCoreFieldParams<T>) => string);
}

export interface StructureToolWorkspaceParams<
  T extends Pick<StructureToolParams, 'Workspaces' | 'DefaultWorkspaces'>,
> {
  workspaces?: T['Workspaces'];
  defaultWorkspaces?: T['DefaultWorkspaces'];
}

export interface StructureToolRoleParams<
  T extends Pick<StructureToolParams, 'Roles' | 'DefaultRoles'>,
> {
  roles?: T['Roles'];
  defaultRoles?: T['DefaultRoles'];
}

export type StructureToolPluginParams<T extends StructureToolParams> = SimpleMerge<
  [
    RequireAllOrNone<StructureToolWorkspaceParams<T>>,
    RequireAllOrNone<StructureToolRoleParams<T>>,
    StructureToolCoreParams<T>,
  ]
>;

interface StructureToolPluginOutputParams<T extends StructureToolParams> {
  listItems: ListItem<T>[];
}

export interface StructureToolPluginOutput<T extends StructureToolParams> {
  structure: Plugin<StructureToolPluginOutputParams<T>>;
  templates: (params: StructureToolPluginOutputParams<T>) => TemplateResolver;
  defineListItems: DefineListItemsType<T>;
  defineListItem: DefineListItemType<T>;
  helpers: Helpers<T>;
}

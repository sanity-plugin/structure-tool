import type { Plugin, TemplateResolver } from 'sanity';
import type { RequireAllOrNone } from 'type-fest';

import type { DefineListItem } from '@/factories/defineListItem';
import type { DefineListItems } from '@/factories/defineListItems';
import type { Helpers } from '@/factories/helpers';
import type {
  StructureToolGenericParam,
  StructureToolParams,
} from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

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

export interface StructureToolCoreParams<T extends StructureToolParams> {
  title: StructureToolGenericParam<T, string>;
  emptyListTitle?: StructureToolGenericParam<T, string>;
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
  defineListItems: DefineListItems<T>;
  defineListItem: DefineListItem<T>;
  helpers: Helpers<T>;
}

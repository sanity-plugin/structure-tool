import type {
  StructureToolCoreParams,
  StructureToolRoleParams,
  StructureToolWorkspaceParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

interface StructureListItems<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> {
  listItems: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[];
}

export type StructureParams<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    StructureToolCoreParams,
    StructureToolWorkspaceParams<Workspaces, DefaultWorkspaces>,
    StructureToolRoleParams<Roles, DefaultRoles>,
    StructureListItems<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
  ]
>;

export type StructureListItemsParams<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = Omit<
  StructureParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
  keyof StructureToolCoreParams
>;

import type {
  StructureToolCoreParams,
  StructureToolRoleParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

export type StructureParams<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    StructureToolRoleParams<Roles, DefaultRoles>,
    StructureToolCoreParams,
    {
      listItems: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[];
    },
  ]
>;

export type StructureListItemsParams<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    StructureToolRoleParams<Roles, DefaultRoles>,
    {
      listItems: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[];
    },
  ]
>;

import type {
  StructureToolCoreParams,
  StructureToolRoleParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

export type StructureParams<
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    StructureToolRoleParams<Workspaces, Roles, DefaultRoles>,
    StructureToolCoreParams,
    {
      listItems: ListItem<Workspaces, Roles, DefaultRoles>[];
    },
  ]
>;

export type StructureListItemsParams<
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    StructureToolRoleParams<Workspaces, Roles, DefaultRoles>,
    {
      listItems: ListItem<Workspaces, Roles, DefaultRoles>[];
    },
  ]
>;

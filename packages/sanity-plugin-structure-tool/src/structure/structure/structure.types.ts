import type {
  StructureToolCoreParams,
  StructureToolRoleParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

export type StructureParams<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    StructureToolRoleParams<Roles, DefaultRoles>,
    StructureToolCoreParams,
    {
      listItems: ListItem<Roles, DefaultRoles>[];
    },
  ]
>;

export type StructureListItemsParams<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = SimpleMerge<
  [
    StructureToolRoleParams<Roles, DefaultRoles>,
    {
      listItems: ListItem<Roles, DefaultRoles>[];
    },
  ]
>;

import type { Merge } from 'type-fest';

import type {
  StructureToolCoreParams,
  StructureToolRoleParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { ListItem } from '@/structure/types/listItem.types';

export type StructureParams<Roles extends string[], DefaultRoles extends string[]> = Merge<
  Merge<StructureToolRoleParams<Roles, DefaultRoles>, StructureToolCoreParams>,
  {
    listItems: ListItem<Roles>[];
  }
>;

export type StructureListItemsParams<Roles extends string[], DefaultRoles extends string[]> = Merge<
  StructureToolRoleParams<Roles, DefaultRoles>,
  {
    listItems: ListItem<Roles>[];
  }
>;

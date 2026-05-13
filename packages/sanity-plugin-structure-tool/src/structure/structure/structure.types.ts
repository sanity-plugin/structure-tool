import type { Merge } from 'type-fest';

import type {
  StructureToolCoreParams,
  StructureToolRoleParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { ListItem } from '@/structure/types/listItem.types';

export type StructureParams<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = Merge<
  Merge<StructureToolRoleParams<Roles, DefaultRoles>, StructureToolCoreParams>,
  {
    listItems: ListItem<Roles>[];
  }
>;

export type StructureListItemsParams<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = Merge<
  StructureToolRoleParams<Roles, DefaultRoles>,
  {
    listItems: ListItem<Roles>[];
  }
>;

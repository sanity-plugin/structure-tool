import type {
  StructureToolCoreParams,
  StructureToolRoleParams,
  StructureToolWorkspaceParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItem } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

interface StructureListItems<T extends StructureToolParams> {
  listItems: SimpleMerge<[ListItem<T>, ListItemWithWorkspacesAndRoles<T>]>;
}

export type StructureListItemsParams<T extends StructureToolParams> = SimpleMerge<
  [StructureToolWorkspaceParams<T>, StructureToolRoleParams<T>, StructureListItems<T>]
>;

export type StructureParams<T extends StructureToolParams> = SimpleMerge<
  [StructureToolCoreParams<T>, StructureListItemsParams<T>]
>;

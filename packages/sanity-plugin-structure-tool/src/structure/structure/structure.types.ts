import type {
  StructureToolCoreParams,
  StructureToolRoleParams,
  StructureToolWorkspaceParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

interface StructureListItems<T extends StructureToolParams> {
  listItems: ListItem<T>[];
}

export type StructureParams<T extends StructureToolParams> = SimpleMerge<
  [
    StructureToolCoreParams<T>,
    StructureToolWorkspaceParams<T>,
    StructureToolRoleParams<T>,
    StructureListItems<T>,
  ]
>;

export type StructureListItemsParams<T extends StructureToolParams> = Omit<
  StructureParams<T>,
  keyof StructureToolCoreParams<T>
>;

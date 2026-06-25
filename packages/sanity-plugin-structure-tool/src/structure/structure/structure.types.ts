import type {
  PluginParams,
  StructureToolCoreParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

/**
 * Parameters configured on the structure representation.
 * Combines core params (like title, emptyListTitle) with plugin-level role/workspace restrictions
 * and the child list items list.
 *
 * @template T - The structure tool configuration parameter schema.
 */
export type StructureParams<T extends StructureToolParams> = SimpleMerge<
  [
    StructureToolCoreParams<T>,
    PluginParams<T>,
    {
      listItems: ListItem<T>[];
    },
  ]
>;

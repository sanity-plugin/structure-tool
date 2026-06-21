import type {
  PluginParams,
  StructureToolCoreParams,
} from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

export type StructureParams<T extends StructureToolParams> = SimpleMerge<
  [
    StructureToolCoreParams<T>,
    PluginParams<T>,
    {
      listItems: ListItem<T>[];
    },
  ]
>;

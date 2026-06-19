import type { StructureCommonParams } from '@/structure/structure/structure.types';
import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemExtended, ListItemRaw } from '@/structure/types/listItem.types';

interface RenderListItemParams<T extends StructureToolParams> extends StructureCommonParams<T> {
  listItem: ListItemExtended<T>;
}

export type RenderListItem = <T extends StructureToolParams>(
  params: RenderListItemParams<T>,
) => ReturnType<ListItemRaw>;

export type RenderItem = <T extends StructureToolParams>(
  params: ListItemExtended<T>,
) => ReturnType<ListItemRaw>;

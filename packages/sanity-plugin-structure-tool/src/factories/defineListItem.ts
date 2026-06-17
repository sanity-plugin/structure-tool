import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

export type DefineListItemType<T extends StructureToolParams> = (
  listItem: ListItem<T>,
) => ListItem<T>;

export type DefineListItem = <T extends StructureToolParams>(listItem: ListItem<T>) => ListItem<T>;

export const defineListItem: DefineListItem = (listItem) => listItem;

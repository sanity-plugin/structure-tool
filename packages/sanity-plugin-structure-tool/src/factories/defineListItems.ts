import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

export type DefineListItemsType<T extends StructureToolParams> = (
  listItems: ListItem<T>[],
) => ListItem<T>[];

export type DefineListItems = <T extends StructureToolParams>(
  listItems: ListItem<T>[],
) => ListItem<T>[];

export const defineListItems: DefineListItems = (listItems) => listItems;

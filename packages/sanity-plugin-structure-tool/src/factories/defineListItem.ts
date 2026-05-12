import type { ListItem } from '@/structure/types/listItem.types';

export type DefineListItemType<T extends string[]> = (listItem: ListItem<T>) => ListItem<T>;

export type DefineListItem = <T extends string[]>(listItem: ListItem<T>) => ListItem<T>;

export const defineListItem: DefineListItem = (listItem) => listItem;

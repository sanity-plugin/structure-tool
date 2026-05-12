import type { ListItem } from '@/structure/types/listItem.types';

export type DefineListItemsType<T extends string[]> = (listItems: ListItem<T>[]) => ListItem<T>[];

export type DefineListItems = <T extends string[]>(listItems: ListItem<T>[]) => ListItem<T>[];

export const defineListItems: DefineListItems = (listItems) => listItems;

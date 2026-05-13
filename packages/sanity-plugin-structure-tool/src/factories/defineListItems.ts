import type { ListItem } from '@/structure/types/listItem.types';

export type DefineListItemsType<Roles extends readonly string[] | undefined> = (
  listItems: ListItem<Roles>[],
) => ListItem<Roles>[];

export type DefineListItems = <Roles extends readonly string[] | undefined>(
  listItems: ListItem<Roles>[],
) => ListItem<Roles>[];

export const defineListItems: DefineListItems = (listItems) => listItems;

import type { ListItem } from '@/structure/types/listItem.types';

export type DefineListItemsType<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = (listItems: ListItem<Roles, DefaultRoles>[]) => ListItem<Roles, DefaultRoles>[];

export type DefineListItems = <
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  listItems: ListItem<Roles, DefaultRoles>[],
) => ListItem<Roles, DefaultRoles>[];

export const defineListItems: DefineListItems = (listItems) => listItems;

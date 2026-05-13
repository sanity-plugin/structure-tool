import type { ListItem } from '@/structure/types/listItem.types';

export type DefineListItemType<
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = (listItem: ListItem<Roles, DefaultRoles>) => ListItem<Roles, DefaultRoles>;

export type DefineListItem = <
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  listItem: ListItem<Roles, DefaultRoles>,
) => ListItem<Roles, DefaultRoles>;

export const defineListItem: DefineListItem = (listItem) => listItem;

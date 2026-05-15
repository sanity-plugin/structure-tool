import type { ListItem } from '@/structure/types/listItem.types';

export type DefineListItemsType<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = (
  listItems: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[],
) => ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[];

export type DefineListItems = <
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  listItems: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[],
) => ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[];

export const defineListItems: DefineListItems = (listItems) => listItems;

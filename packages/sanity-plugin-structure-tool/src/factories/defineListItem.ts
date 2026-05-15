import type { ListItem } from '@/structure/types/listItem.types';

export type DefineListItemType<
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
> = (
  listItem: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
) => ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export type DefineListItem = <
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  listItem: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
) => ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>;

export const defineListItem: DefineListItem = (listItem) => listItem;

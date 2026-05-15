import type { ListItem } from '@/structure/types/listItem.types';

export const getAllListItems = <
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  listItems: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[],
): ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[] => {
  const schemaTypes = [] as ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[];

  const getListItems = (
    items: ListItem<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[],
  ): void => {
    for (const item of items) {
      if (item?.schemaType) {
        schemaTypes.push(item);
      }

      if (item?.children?.length) {
        getListItems(item.children);
      }
    }
  };

  getListItems(listItems);

  return schemaTypes;
};

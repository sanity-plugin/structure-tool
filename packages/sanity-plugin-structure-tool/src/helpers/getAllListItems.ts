import type { ListItem } from '@/structure/types/listItem.types';

export const getAllListItems = <
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  listItems: ListItem<Workspaces, Roles, DefaultRoles>[],
): ListItem<Workspaces, Roles, DefaultRoles>[] => {
  const schemaTypes = [] as ListItem<Workspaces, Roles, DefaultRoles>[];

  const getListItems = (items: ListItem<Workspaces, Roles, DefaultRoles>[]): void => {
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

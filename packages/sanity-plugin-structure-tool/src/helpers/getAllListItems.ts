import type { ListItem } from '@/structure/types/listItem.types';

export const getAllListItems = <
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  listItems: ListItem<Roles, DefaultRoles>[],
): ListItem<Roles, DefaultRoles>[] => {
  const schemaTypes = [] as ListItem<Roles, DefaultRoles>[];

  const getListItems = (items: ListItem<Roles, DefaultRoles>[]): void => {
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

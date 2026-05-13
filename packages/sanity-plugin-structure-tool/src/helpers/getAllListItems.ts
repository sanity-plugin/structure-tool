import type { ListItem } from '@/structure/types/listItem.types';

export const getAllListItems = <Roles extends readonly string[] | undefined>(
  listItems: ListItem<Roles>[],
): ListItem<Roles>[] => {
  const schemaTypes = [] as ListItem<Roles>[];

  const getListItems = (items: ListItem<Roles>[]): void => {
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

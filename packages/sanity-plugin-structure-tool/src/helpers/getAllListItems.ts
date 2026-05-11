import type { ListItem } from '@/structure/types/listItem.types';

type GetAllListItems = (listItems: ListItem[]) => ListItem[];

type GetListItems = (items: ListItem[]) => void;

export const getAllListItems: GetAllListItems = (listItems) => {
  const schemaTypes = [] as ListItem[];

  const getListItems: GetListItems = (items) => {
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

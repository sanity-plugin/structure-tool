import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

export const getAllListItems = <T extends StructureToolParams>(
  listItems: ListItem<T>[],
): ListItem<T>[] => {
  const schemaTypes = [] as ListItem<T>[];

  const getListItems = (items: ListItem<T>[]): void => {
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

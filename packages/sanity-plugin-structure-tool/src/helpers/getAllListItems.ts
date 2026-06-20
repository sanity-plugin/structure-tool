import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { ConfigContext } from 'sanity';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

export const getAllListItems = <T extends StructureToolParams>(
  context: ConfigContext,
  listItems: ListItem<T>[],
): ListItem<T>[] => {
  const contextValues = getContextValues(context);

  const schemaTypes = [] as ListItem<T>[];

  const getListItems = (items: ListItem<T>[]): void => {
    for (const item of items) {
      const schemaType = getValidListItem(item?.schemaType, contextValues);
      const children = getValidListItem(item?.children, contextValues);

      if (schemaType) {
        schemaTypes.push(item);
      }

      if (children?.length) {
        getListItems(children);
      }
    }
  };

  getListItems(listItems);

  return schemaTypes;
};

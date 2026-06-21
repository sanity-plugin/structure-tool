import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { ConfigContext } from 'sanity';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

export const getFlatListItems = <T extends StructureToolParams>(
  listItems: ListItem<T>[],
  context: ConfigContext,
): ListItem<T>[] => {
  const contextValues = getContextValues(context);

  const schemaTypes = [] as ListItem<T>[];

  const getListItems = (items: ListItem<T>[]): void => {
    for (const item of items) {
      const schemaType = getValidListItem(item?.schemaType, contextValues);
      // FIXME
      const children = getValidListItem(item?.children, { ...contextValues, childOptions: {} });

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

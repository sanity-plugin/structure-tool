import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { ConfigContext } from 'sanity';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

/**
 * Recursively traverses a list of nested configuration items and extracts a flat array of list items that have a configured schema type.
 *
 * @param listItems - The array of list items to flatten.
 * @param context - The Sanity Studio configuration context.
 * @returns A flat array of resolved list items.
 */
export const getFlatListItems = <T extends StructureToolParams>(
  listItems: ListItem<T>[],
  context: ConfigContext,
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

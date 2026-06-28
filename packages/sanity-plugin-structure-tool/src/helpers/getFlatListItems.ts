import { getComputedListItems } from '@/helpers/getComputedListItems';

import type { ConfigContext } from 'sanity';
import type { ChildResolverOptions } from 'sanity/structure';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

/**
 * Recursively traverses a list of nested configuration items and extracts a flat array of list items that have a configured schema type.
 *
 * @template T - The structure tool configuration parameters schema.
 * @param listItems - The array of list items to flatten.
 * @param context - The Sanity Studio configuration context.
 * @returns A flat array of resolved list items.
 */
export const getFlatListItems = <T extends StructureToolParams>(
  listItems: ListItem<T>[],
  context: ConfigContext,
): ListItem<T>[] => {
  const schemaTypes = [] as ListItem<T>[];

  /**
   * Internal recursive traveler that extracts items containing a schema type.
   *
   * @param items - Child items collection.
   */
  const getListItems = (items: ListItem<T>[]): void => {
    for (const item of items) {
      const { schemaType, children } = getComputedListItems({
        listItem: item,
        context,
      });

      const schemaTypeValue = schemaType();
      const childrenValue = children({ childOptions: {} as ChildResolverOptions });

      if (schemaTypeValue) {
        schemaTypes.push(item);
      }

      if (childrenValue?.length) {
        getListItems(childrenValue);
      }
    }
  };

  getListItems(listItems);

  return schemaTypes;
};

import type { ListItemKey } from '@/structure/listItems/listItems.types';

/**
 * Resolves a list item imperatively by evaluating its custom `raw` callback.
 *
 * @param params - Render context parameters containing mapping and list parameters.
 * @returns The custom resolved list item, or null if undefined.
 */
export const getRaw: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const { raw } = listItem;

  return raw ? raw(S, context) : null;
};

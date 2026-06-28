import { getComputedListItems } from '@/helpers/getComputedListItems';

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

  const { raw } = getComputedListItems({ listItem, context });

  return raw ? raw(S, context) : null;
};

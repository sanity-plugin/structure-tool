import { getComputedListItems } from '@/helpers/getComputedListItems';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

/**
 * Renders a visual separator/divider line in the structure tree.
 *
 * @param params - Render context parameters containing mapping and list parameters.
 * @returns The resolved Sanity Studio divider/item structure.
 */
export const getDivider: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;

  const { i18n, parentTitle } = getComputedListItems({ listItem, context });

  const parentTitleValue = parentTitle();

  return S.divider()
    .title(parentTitleValue)
    .i18n(i18n({ i18nTitle: parentTitleValue }));
};

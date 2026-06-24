import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getTitle } from '@/helpers/getTitle';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

export const getDivider: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;

  const { title } = getComputedListItems({ listItem, context });
  const { parentTitle } = getTitle(title, context);

  return S.divider().title(parentTitle);
};

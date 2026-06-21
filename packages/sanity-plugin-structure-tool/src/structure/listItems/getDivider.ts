import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

export const getDivider: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const { title } = listItem;

  const contextValues = getContextValues(context);

  const displayTitle = getValidListItem(title, contextValues);

  return S.divider().title(displayTitle ?? '');
};

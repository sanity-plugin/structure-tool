import type { ListItemKey } from '@/structure/listItems/listItems.types';

export const getRaw: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const { raw } = listItem;

  return raw ? raw(S, context) : null;
};

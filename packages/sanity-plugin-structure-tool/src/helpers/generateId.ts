import { constants } from '@/constants';
import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';
import { sanitizeUrl } from '@/utils';

import type { ListItemKeyParams } from '@/structure/listItems/listItems.types';
import type { StructureToolParams } from '@/structure/types/common.types';

interface GenerateIdOutput {
  uniqueId: string;
  id: string;
}

type GenerateId = <T extends StructureToolParams>(
  title: string,
  params: ListItemKeyParams<T>,
) => GenerateIdOutput;

export const generateId: GenerateId = (title, params) => {
  const { listItemsParams, itemsParams, mappingParams } = params;
  const { context } = listItemsParams;
  const { id: itemId } = itemsParams;
  const { listItem, index } = mappingParams;
  const { id } = listItem;

  const contextValues = getContextValues(context);

  const uniqueIdValue = [itemId, index + 1].join(constants.URL_PATH_SEPARATOR);
  const sanitizedPaths = sanitizeUrl(title).split(' ');

  const idValue = [uniqueIdValue, ...sanitizedPaths].join(constants.URL_PATH_SEPARATOR);

  const userEnteredId = getValidListItem(id, {
    ...contextValues,
    values: {
      uniqueId: uniqueIdValue,
      sanitizedPaths,
      id: idValue,
      slugify: sanitizeUrl,
    },
  });

  return {
    uniqueId: uniqueIdValue,
    id: userEnteredId ?? idValue,
  };
};

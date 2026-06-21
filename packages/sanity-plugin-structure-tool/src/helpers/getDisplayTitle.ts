import pluralize from 'pluralize-esm';

import { getComputedListItems } from '@/helpers/getComputedListItems';

import type { StructureCommonParams, StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

type GetDisplayTitle = <T extends StructureToolParams>(
  params: SimpleMerge<
    [
      Omit<StructureCommonParams<T>, 'workspace'>,
      {
        listItem: ListItem<T>;
      },
    ]
  >,
) => string;

export const getDisplayTitle: GetDisplayTitle = (params) => {
  const { S, context, listItem } = params;

  const {
    title = '',
    schemaType = '',
    singleton,
    isPlural,
  } = getComputedListItems({ listItem, context });

  const schemaDefaultTitle = S.documentTypeListItem(schemaType).getTitle();
  const schemaTitle = schemaType ? schemaDefaultTitle : '';
  const isItPlural = title ? false : (isPlural ?? !singleton);

  const mainTitle = title || (schemaTitle ?? '');

  const finalTitle = isItPlural ? pluralize(mainTitle) : mainTitle;
  return finalTitle || '';
};

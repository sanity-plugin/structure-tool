import pluralize from 'pluralize-esm';

import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getTitle } from '@/helpers/getTitle';

import type { StructureCommonParams, StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

interface GetDisplayTitleOutput {
  parentTitle: string;
  childTitle: string;
}

type GetDisplayTitle = <T extends StructureToolParams>(
  params: SimpleMerge<
    [
      Omit<StructureCommonParams<T>, 'workspace'>,
      {
        listItem: ListItem<T>;
      },
    ]
  >,
) => GetDisplayTitleOutput;

export const getDisplayTitle: GetDisplayTitle = (params) => {
  const { S, context, listItem } = params;

  const {
    title,
    schemaType = '',
    singleton,
    isPlural,
  } = getComputedListItems({ listItem, context });

  const { parentTitle, childTitle } = getTitle(title, context);

  const generateDisplayTitle = (titleParam?: string) => {
    const schemaDefaultTitle = S.documentTypeListItem(schemaType).getTitle();
    const schemaTitle = schemaType ? schemaDefaultTitle : '';
    const isItPlural = titleParam ? false : (isPlural ?? !singleton);

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const mainTitle = titleParam || (schemaTitle ?? '');

    const finalTitle = isItPlural ? pluralize(mainTitle) : mainTitle;
    return finalTitle || '';
  };

  return {
    parentTitle: generateDisplayTitle(parentTitle),
    childTitle: generateDisplayTitle(childTitle),
  };
};

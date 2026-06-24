import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type {
  GetListItemOriginalType,
  StructureToolParams,
  ValidSanityContext,
} from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';

interface GetTitleOutput {
  parentTitle: string;
  childTitle: string;
}

type GetTitle = <T extends StructureToolParams>(
  title: GetListItemOriginalType<ListItemCore<T>['title']>,
  context: ValidSanityContext,
) => GetTitleOutput;

export const getTitle: GetTitle = (title, context) => {
  const contextValues = getContextValues(context);

  if (typeof title === 'object') {
    const { parent, child } = title;

    const parentTitle = getValidListItem(parent, contextValues);
    const childTitle = getValidListItem(child, contextValues);

    return {
      parentTitle: parentTitle ?? '',
      childTitle: childTitle ?? '',
    };
  }

  return {
    parentTitle: title ?? '',
    childTitle: title ?? '',
  };
};

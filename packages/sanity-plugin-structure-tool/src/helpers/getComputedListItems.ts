import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type {
  GetListItemOriginalType,
  StructureCommonParams,
  StructureToolParams,
} from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';

type OmittedListItem = 'id' | 'icon' | 'component' | 'raw';

interface GetComputedListItemsParams<T extends StructureToolParams> extends Pick<
  StructureCommonParams<T>,
  'context'
> {
  listItem: Omit<ListItemCore<T>, OmittedListItem>;
}

export type GetComputedListItems = <T extends StructureToolParams>(
  params: GetComputedListItemsParams<T>,
) => {
  [K in keyof GetComputedListItemsParams<T>['listItem']]: GetListItemOriginalType<
    ListItemCore<T>[K]
  >;
};

export const getComputedListItems: GetComputedListItems = ({ listItem, context }) => {
  const contextValues = getContextValues(context);

  const result = Object.fromEntries(
    Object.entries(listItem).map(([key, value]) => [key, getValidListItem(value, contextValues)]),
  );

  return result;
};

import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { Entries } from 'type-fest';

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

  const notAllowedListItems = new Set(['id', 'icon', 'component', 'raw']);

  const allowedListItems = (Object.entries(listItem) as Entries<typeof listItem>).reduce<
    Entries<typeof listItem>
  >((acc, value) => {
    const [key] = value;

    if (!notAllowedListItems.has(key)) {
      acc.push(value);
    }

    return acc;
  }, []);

  const result = Object.fromEntries(
    allowedListItems.map(([key, value]) => [key, getValidListItem(value, contextValues)]),
  );

  return result;
};

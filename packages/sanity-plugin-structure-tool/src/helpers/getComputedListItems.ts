import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { Entries } from 'type-fest';

import type {
  GetListItemOriginalType,
  StructureCommonParams,
  StructureToolParams,
} from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';

/**
 * Keys of core list item fields that are omitted during dynamic evaluation
 * in getComputedListItems since they are processed independently.
 */
type OmittedListItem = 'id' | 'icon' | 'component' | 'menuItemGroups' | 'menuItems' | 'raw';

/**
 * Parameters for the getComputedListItems helper function.
 *
 * @template T - The structure tool configuration parameters schema.
 */
interface GetComputedListItemsParams<T extends StructureToolParams> extends Pick<
  StructureCommonParams<T>,
  'context'
> {
  listItem: Omit<ListItemCore<T>, OmittedListItem>;
}

/**
 * Function type that resolves all dynamic or conditional callbacks within a list item's core parameters (except omitted ones like id/icon) into their static types based on the active Sanity context.
 */
export type GetComputedListItems = <T extends StructureToolParams>(
  params: GetComputedListItemsParams<T>,
) => {
  [K in keyof GetComputedListItemsParams<T>['listItem']]: GetListItemOriginalType<
    ListItemCore<T>[K]
  >;
};

/**
 * Processes a declarative list item definition and evaluates all dynamic callback fields into their static equivalents.
 * Filters out properties that should not be evaluated at this stage (e.g. id, icon, component, raw).
 *
 * @param params - Object containing the listItem definition and context.
 * @returns An object containing the statically resolved property values of the list item.
 */
export const getComputedListItems: GetComputedListItems = ({ listItem, context }) => {
  const contextValues = getContextValues(context);

  const notAllowedListItems = new Set([
    'id',
    'icon',
    'component',
    'menuItemGroups',
    'menuItems',
    'raw',
  ]);

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

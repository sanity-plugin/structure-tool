import type { RequireOneOrNone } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItem } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

type ListingHelperCoreParams<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemWithWorkspacesAndRoles<T>,
    RequireOneOrNone<Pick<ListItem<T>, 'hideAddButton' | 'templates'>>,
    Pick<
      ListItem<T>,
      | 'id'
      | 'title'
      | 'icon'
      | 'apiVersion'
      | 'filter'
      | 'filterParams'
      | 'defaultOrdering'
      | 'defaultLayout'
      | 'isPlural'
      | 'showIcons'
    >,
  ]
>;

type ListingHelperParams<T extends StructureToolParams> = SimpleMerge<
  [
    ListingHelperCoreParams<T>,
    {
      schemaType: NonNullable<ListItem<T>['schemaType']>;
    },
  ]
>;

type ListingHelperOutput<T extends StructureToolParams> = ListingHelperParams<T>;

export interface ListingHelper<T extends StructureToolParams> {
  (params: ListingHelperParams<T>): ListingHelperOutput<T>;

  (
    schemaType: NonNullable<ListItem<T>['schemaType']>,
    params?: ListingHelperCoreParams<T>,
  ): ListingHelperOutput<T>;
}

export const listingHelper = <T extends StructureToolParams>(
  schemaTypeOrParams: ListingHelperParams<T> | NonNullable<ListItem<T>['schemaType']>,
  params?: ListingHelperCoreParams<T>,
): ListingHelperOutput<T> => {
  if (typeof schemaTypeOrParams === 'object') {
    return schemaTypeOrParams;
  }

  return {
    ...params,
    schemaType: schemaTypeOrParams,
  };
};

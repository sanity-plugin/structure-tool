import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

type ListingHelperRestParams<T extends StructureToolParams> = SimpleMerge<
  [
    WorkspacesAndRolesListItem<T>,
    Pick<
      ListItemCore<T>,
      | 'id'
      | 'title'
      | 'icon'
      | 'showIcons'
      | 'apiVersion'
      | 'filter'
      | 'filterParams'
      | 'defaultOrdering'
      | 'defaultLayout'
      | 'menuItemGroups'
      | 'menuItems'
      | 'hideAddButton'
      | 'templates'
      | 'isPlural'
    >,
  ]
>;

type ListingHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [
    ListingHelperRestParams<T>,
    {
      schemaType: NonNullable<ListItemCore<T>['schemaType']>;
    },
  ]
>;

type ListingHelperOutput<T extends StructureToolParams> = ListingHelperOnlyParams<T>;

export interface ListingHelper<T extends StructureToolParams> {
  (params: ListingHelperOnlyParams<T>): ListingHelperOutput<T>;

  (
    schemaType: NonNullable<ListItemCore<T>['schemaType']>,
    params?: ListingHelperRestParams<T>,
  ): ListingHelperOutput<T>;
}

export const listingHelper = <T extends StructureToolParams>(
  schemaTypeOrParams: ListingHelperOnlyParams<T> | NonNullable<ListItemCore<T>['schemaType']>,
  params?: ListingHelperRestParams<T>,
): ListingHelperOutput<T> => {
  if (typeof schemaTypeOrParams === 'object') {
    return schemaTypeOrParams;
  }

  return {
    ...params,
    schemaType: schemaTypeOrParams,
  };
};

import type { RequireOneOrNone } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

type ListingHelperCoreParams<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemWithWorkspacesAndRoles<T>,
    RequireOneOrNone<Pick<ListItemWithoutGenerics, 'hideAddButton' | 'templates'>>,
    Pick<
      ListItemWithoutGenerics,
      'title' | 'icon' | 'apiVersion' | 'filter' | 'filterParams' | 'isPlural'
    >,
  ]
>;

type ListingHelperParams<T extends StructureToolParams> = SimpleMerge<
  [
    ListingHelperCoreParams<T>,
    {
      schemaType: NonNullable<ListItemWithoutGenerics['schemaType']>;
    },
  ]
>;

type ListingHelperOutput<T extends StructureToolParams> = ListingHelperParams<T>;

export interface ListingHelper<T extends StructureToolParams> {
  (params: ListingHelperParams<T>): ListingHelperOutput<T>;

  (
    schemaType: NonNullable<ListItemWithoutGenerics['schemaType']>,
    params?: ListingHelperCoreParams<T>,
  ): ListingHelperOutput<T>;
}

export const listingHelper = <T extends StructureToolParams>(
  schemaTypeOrParams: ListingHelperParams<T> | NonNullable<ListItemWithoutGenerics['schemaType']>,
  params?: ListingHelperCoreParams<T>,
): ListingHelperOutput<T> => {
  if (typeof schemaTypeOrParams === 'string') {
    return {
      ...params,
      schemaType: schemaTypeOrParams,
    };
  }

  return schemaTypeOrParams;
};

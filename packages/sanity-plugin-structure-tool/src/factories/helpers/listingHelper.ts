import type { RequireOneOrNone, SetRequired } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';

type ListingHelperParams<T extends StructureToolParams> = ListItemWithWorkspacesAndRoles<T> &
  SetRequired<
    Pick<
      ListItemWithoutGenerics,
      'title' | 'schemaType' | 'icon' | 'apiVersion' | 'filter' | 'filterParams' | 'isPlural'
    >,
    'schemaType'
  > &
  RequireOneOrNone<Pick<ListItemWithoutGenerics, 'hideAddButton' | 'templates'>>;

type ListingHelperOutput<T extends StructureToolParams> = ListingHelperParams<T>;

export type ListingHelperType<T extends StructureToolParams> = (
  params: ListingHelperParams<T>,
) => ListingHelperOutput<T>;

export type ListingHelper = <T extends StructureToolParams>(
  params: ListingHelperParams<T>,
) => ListingHelperOutput<T>;

export const listingHelper: ListingHelper = (params) => params;

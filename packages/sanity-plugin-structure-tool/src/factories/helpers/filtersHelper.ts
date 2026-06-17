import type { SetRequired } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';

type FiltersHelperParams<T extends StructureToolParams> = ListItemWithWorkspacesAndRoles<T> &
  SetRequired<
    Pick<ListItemWithoutGenerics, 'title' | 'icon' | 'apiVersion' | 'filter' | 'filterParams'>,
    'title' | 'filter'
  >;

type FiltersHelperOutput<T extends StructureToolParams> = FiltersHelperParams<T>;

export type FiltersHelperType<T extends StructureToolParams> = (
  params: FiltersHelperParams<T>,
) => FiltersHelperOutput<T>;

export type FiltersHelper = <T extends StructureToolParams>(
  params: FiltersHelperParams<T>,
) => FiltersHelperOutput<T>;

export const filtersHelper: FiltersHelper = (params) => params;

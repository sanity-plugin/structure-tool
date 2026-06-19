import type { SetRequired } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItem } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

type FiltersHelperParams<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemWithWorkspacesAndRoles<T>,
    SetRequired<
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
      >,
      'title' | 'filter'
    >,
  ]
>;

type FiltersHelperOutput<T extends StructureToolParams> = FiltersHelperParams<T>;

export type FiltersHelper<T extends StructureToolParams> = (
  params: FiltersHelperParams<T>,
) => FiltersHelperOutput<T>;

export const filtersHelper = <T extends StructureToolParams>(
  params: FiltersHelperParams<T>,
): FiltersHelperOutput<T> => params;

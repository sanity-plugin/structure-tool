import type { SetRequired } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

type FiltersHelperParams<T extends StructureToolParams> = SimpleMerge<
  [
    WorkspacesAndRolesListItem<T>,
    SetRequired<
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

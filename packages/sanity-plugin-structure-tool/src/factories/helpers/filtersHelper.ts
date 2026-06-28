import type { SetRequired } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

/**
 * Required parameters for GROQ-filtered list items (must include title and filter).
 *
 * @template T - The structure tool configuration parameters schema.
 */
type FiltersHelperParams<T extends StructureToolParams> = SimpleMerge<
  [
    WorkspacesAndRolesListItem<T>,
    SetRequired<
      Pick<
        ListItemCore<T>,
        | 'apiVersion'
        | 'defaultLayout'
        | 'defaultOrdering'
        | 'filter'
        | 'filterParams'
        | 'icon'
        | 'id'
        | 'isVisible'
        | 'menuItemGroups'
        | 'menuItems'
        | 'showIcons'
        | 'title'
      >,
      'title' | 'filter'
    >,
  ]
>;

/**
 * Resolved output schema for GROQ-filtered list item configurations.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type FiltersHelperOutput<T extends StructureToolParams> = FiltersHelperParams<T>;

/**
 * Helper function type for defining a list item filtered by a GROQ query.
 * Requires both `title` and `filter` fields to be explicitly provided.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export type FiltersHelper<T extends StructureToolParams> = (
  params: FiltersHelperParams<T>,
) => FiltersHelperOutput<T>;

/**
 * Helper function for defining a list item filtered by a GROQ query.
 * Requires both `title` and `filter` fields to be explicitly provided.
 *
 * @template T - The structure tool configuration parameters schema.
 * @param params - The complete filters configuration parameters object.
 * @returns The resolved GROQ-filtered list item configuration object.
 */
export const filtersHelper = <T extends StructureToolParams>(
  params: FiltersHelperParams<T>,
): FiltersHelperOutput<T> => params;

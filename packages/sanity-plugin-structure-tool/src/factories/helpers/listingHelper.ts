import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

/**
 * Optional structural, role-based, or visual parameter configuration for document listing list items.
 *
 * @template T - The structure tool configuration parameters schema.
 */
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

/**
 * Required parameters for document listing list items (must include schemaType).
 *
 * @template T - The structure tool configuration parameters schema.
 */
type ListingHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [
    ListingHelperRestParams<T>,
    {
      schemaType: NonNullable<ListItemCore<T>['schemaType']>;
    },
  ]
>;

/**
 * Resolved output schema for document listing list item configurations.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type ListingHelperOutput<T extends StructureToolParams> = ListingHelperOnlyParams<T>;

/**
 * Helper function interface for defining a standard Sanity list item listing a document type.
 * Supports call signatures either with a single configuration parameters object containing `schemaType`,
 * or with positional arguments (schemaType string, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface ListingHelper<T extends StructureToolParams> {
  (params: ListingHelperOnlyParams<T>): ListingHelperOutput<T>;

  (
    schemaType: NonNullable<ListItemCore<T>['schemaType']>,
    params?: ListingHelperRestParams<T>,
  ): ListingHelperOutput<T>;
}

/**
 * Helper function to define a standard Sanity list item listing a document type.
 * Supports call signatures either with a single configuration parameters object containing `schemaType`,
 * or with positional arguments (schemaType string, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 * @param schemaTypeOrParams - The schema type name string or the complete listing configuration parameters object.
 * @param params - Optional additional configurations for the list item.
 * @returns The resolved listing list item configuration object.
 */
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

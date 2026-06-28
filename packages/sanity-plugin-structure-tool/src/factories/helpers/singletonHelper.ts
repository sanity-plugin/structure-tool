import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

/**
 * Optional structural, role-based, or visual parameter configuration for singleton list items.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type SingletonHelperRestParams<T extends StructureToolParams> = SimpleMerge<
  [
    WorkspacesAndRolesListItem<T>,
    Pick<
      ListItemCore<T>,
      'defaultPanes' | 'icon' | 'id' | 'isPlural' | 'isVisible' | 'templates' | 'title' | 'views'
    >,
  ]
>;

/**
 * Required parameters for singleton list items (must include schemaType).
 *
 * @template T - The structure tool configuration parameters schema.
 */
type SingletonHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [
    SingletonHelperRestParams<T>,
    {
      schemaType: NonNullable<ListItemCore<T>['schemaType']>;
    },
  ]
>;

/**
 * Resolved output schema for singleton list item configurations.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type SingletonHelperOutput<T extends StructureToolParams> = SimpleMerge<
  [
    SingletonHelperOnlyParams<T>,
    {
      singleton: true;
    },
  ]
>;

/**
 * Helper function interface for defining a singleton document list item.
 * Supports call signatures either with a single configuration parameters object containing `schemaType`,
 * or with positional arguments (schemaType string, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface SingletonHelper<T extends StructureToolParams> {
  (params: SingletonHelperOnlyParams<T>): SingletonHelperOutput<T>;

  (
    schemaType: NonNullable<ListItemCore<T>['schemaType']>,
    params?: SingletonHelperRestParams<T>,
  ): SingletonHelperOutput<T>;
}

/**
 * Helper function to define a singleton document list item.
 * Supports call signatures either with a single configuration parameters object containing `schemaType`,
 * or with positional arguments (schemaType string, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 * @param schemaTypeOrParams - The schema type name string or the complete singleton configuration parameters object.
 * @param params - Optional additional configurations for the list item singleton.
 * @returns The resolved singleton list item configuration object.
 */
export const singletonHelper = <T extends StructureToolParams>(
  schemaTypeOrParams: SingletonHelperOnlyParams<T> | NonNullable<ListItemCore<T>['schemaType']>,
  params?: SingletonHelperRestParams<T>,
): SingletonHelperOutput<T> => {
  if (typeof schemaTypeOrParams === 'object') {
    return {
      ...schemaTypeOrParams,
      singleton: true,
    } as unknown as SingletonHelperOutput<T>;
  }

  return {
    ...params,
    schemaType: schemaTypeOrParams,
    singleton: true,
  };
};

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

/**
 * Optional structural or role-based parameter configuration for raw list items.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type RawHelperRestParams<T extends StructureToolParams> = WorkspacesAndRolesListItem<T>;

/**
 * Required parameters for defining raw list items (must include raw builder callback function).
 *
 * @template T - The structure tool configuration parameters schema.
 */
type RawHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [
    RawHelperRestParams<T>,
    {
      raw: NonNullable<ListItemCore<T>['raw']>;
    },
  ]
>;

/**
 * Resolved output schema for raw list item configurations.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type RawHelperOutput<T extends StructureToolParams> = RawHelperOnlyParams<T>;

/**
 * Helper function interface for defining a list item imperatively using the native Sanity Structure Builder.
 * Supports call signatures either with a single configuration parameters object containing `raw`,
 * or with positional arguments (raw callback function, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface RawHelper<T extends StructureToolParams> {
  (params: RawHelperOnlyParams<T>): RawHelperOutput<T>;

  (raw: NonNullable<ListItemCore<T>['raw']>, params?: RawHelperRestParams<T>): RawHelperOutput<T>;
}

/**
 * Helper function to define a list item imperatively using the native Sanity Structure Builder.
 * Supports call signatures either with a single configuration parameters object containing `raw`,
 * or with positional arguments (raw callback function, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 * @param rawOrParams - The raw builder callback function or the complete raw configuration parameters object.
 * @param params - Optional additional configurations for the list item.
 * @returns The resolved raw list item configuration object.
 */
export const rawHelper = <T extends StructureToolParams>(
  rawOrParams: RawHelperOnlyParams<T> | NonNullable<ListItemCore<T>['raw']>,
  params?: RawHelperRestParams<T>,
): RawHelperOutput<T> => {
  if (typeof rawOrParams === 'object') {
    return rawOrParams;
  }

  return {
    ...params,
    raw: rawOrParams,
  };
};

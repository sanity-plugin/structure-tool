import type {
  StructureToolGenericParam,
  StructureToolParams,
} from '@/structure/types/common.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

/**
 * Configuration helper parameter for specifying the title of a visual divider menu item.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface DividerHelperTitle<T extends StructureToolParams> {
  title?: StructureToolGenericParam<T, string>;
}

/**
 * Optional structural or role-based parameter configuration for list item dividers.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type DividerHelperRestParams<T extends StructureToolParams> = WorkspacesAndRolesListItem<T>;

/**
 * Required parameter schema for defining visual list item dividers.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type DividerHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [DividerHelperRestParams<T>, DividerHelperTitle<T>]
>;

/**
 * Resolved output schema for visual divider list item configurations.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type DividerHelperOutput<T extends StructureToolParams> = DividerHelperOnlyParams<T> & {
  isDivider: true;
};

/**
 * Helper function interface for defining a visual divider/separator line in lists.
 * Supports call signatures either with a single configuration parameters object,
 * or with positional arguments (title, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface DividerHelper<T extends StructureToolParams> {
  (params?: DividerHelperOnlyParams<T>): DividerHelperOutput<T>;

  (
    title?: DividerHelperTitle<T>['title'],
    params?: DividerHelperRestParams<T>,
  ): DividerHelperOutput<T>;
}

/**
 * Helper function to define a visual divider/separator line in lists.
 * Supports call signatures either with a single configuration parameters object,
 * or with positional arguments (title, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 * @param titleOrParams - The display title string (or configuration callback) or the complete divider configuration parameters object.
 * @param params - Optional additional configurations for the list item divider.
 * @returns The resolved divider list item configuration object.
 */
export const dividerHelper = <T extends StructureToolParams>(
  titleOrParams?: DividerHelperOnlyParams<T> | DividerHelperTitle<T>['title'],
  params?: DividerHelperRestParams<T>,
): DividerHelperOutput<T> => {
  if (typeof titleOrParams === 'object') {
    return {
      ...titleOrParams,
      isDivider: true,
    } as unknown as DividerHelperOutput<T>;
  }

  return {
    ...params,
    title: titleOrParams,
    isDivider: true,
  };
};

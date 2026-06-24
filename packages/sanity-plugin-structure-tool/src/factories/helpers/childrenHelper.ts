import type {
  StructureToolGenericParam,
  StructureToolParams,
} from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type {
  ListItemChildren,
  WorkspacesAndRolesListItem,
} from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

/**
 * Configuration helper parameter for specifying the title of a nested list hierarchy.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface ChildrenHelperTitle<T extends StructureToolParams> {
  title?: StructureToolGenericParam<T, string>;
}

/**
 * Optional structural, role-based, or visual parameter configuration for child list items.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type ChildrenHelperRestParams<T extends StructureToolParams> = SimpleMerge<
  [
    WorkspacesAndRolesListItem<T>,
    Pick<ListItemCore<T>, 'id' | 'icon' | 'showIcons' | 'menuItemGroups' | 'menuItems'>,
  ]
>;

/**
 * Required parameters for defining child list items (must include title and children arrays).
 *
 * @template T - The structure tool configuration parameters schema.
 */
type ChildrenHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [
    ChildrenHelperRestParams<T>,
    {
      title: NonNullable<ListItemCore<T>['title']>;
      children: NonNullable<ListItemChildren<T>['children']>;
    },
  ]
>;

/**
 * Resolved output schema for child list item configurations.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type ChildrenHelperOutput<T extends StructureToolParams> = ChildrenHelperOnlyParams<T>;

/**
 * Helper function interface for defining a nested child list/pane structure.
 * Supports call signatures either with a single configuration parameters object,
 * or with positional arguments (title, children array, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface ChildrenHelper<T extends StructureToolParams> {
  (params: ChildrenHelperOnlyParams<T>): ChildrenHelperOutput<T>;

  (
    title: NonNullable<ChildrenHelperTitle<T>['title']>,
    children: ListItemCore<T>[],
    params?: ChildrenHelperRestParams<T>,
  ): ChildrenHelperOutput<T>;
}

/**
 * Helper function to define a nested child list/pane structure.
 * Supports call signatures either with a single configuration parameters object,
 * or with positional arguments (title, children array, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 * @param titleOrParams - The display title string (or configuration callback) or the complete child configuration parameters object.
 * @param children - Optional array of children list items (required if title is passed as first argument).
 * @param params - Optional additional configurations for the list item.
 * @returns The resolved child list item configuration object.
 */
export const childrenHelper = <T extends StructureToolParams>(
  titleOrParams: ChildrenHelperOnlyParams<T> | NonNullable<ChildrenHelperTitle<T>['title']>,
  children?: ListItemCore<T>[],
  params?: ChildrenHelperRestParams<T>,
): ChildrenHelperOutput<T> => {
  if (typeof titleOrParams === 'object' && 'children' in titleOrParams) {
    return titleOrParams;
  }

  return {
    ...params,
    title: titleOrParams,
    children,
  } as unknown as ChildrenHelperOutput<T>;
};

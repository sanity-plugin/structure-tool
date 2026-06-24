import type {
  StructureToolGenericParam,
  StructureToolParams,
} from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

/**
 * Configuration helper parameter for specifying the title of a custom React component list item.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface ComponentHelperTitle<T extends StructureToolParams> {
  title?: StructureToolGenericParam<T, string>;
}

/**
 * Optional structural, role-based, or visual parameter configuration for React component list items.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type ComponentHelperRestParams<T extends StructureToolParams> = SimpleMerge<
  [
    WorkspacesAndRolesListItem<T>,
    Pick<ListItemCore<T>, 'id' | 'icon' | 'componentOptions' | 'menuItemGroups' | 'menuItems'>,
  ]
>;

/**
 * Required parameters for defining custom component list items (must include title and component reference).
 *
 * @template T - The structure tool configuration parameters schema.
 */
type ComponentHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [
    ComponentHelperRestParams<T>,
    {
      title: NonNullable<ListItemCore<T>['title']>;
      component: NonNullable<ListItemCore<T>['component']>;
    },
  ]
>;

/**
 * Resolved output schema for React component list item configurations.
 *
 * @template T - The structure tool configuration parameters schema.
 */
type ComponentHelperOutput<T extends StructureToolParams> = ComponentHelperOnlyParams<T>;

/**
 * Helper function interface for defining a list item rendering a custom React component.
 * Supports call signatures either with a single configuration parameters object,
 * or with positional arguments (title, component reference, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface ComponentHelper<T extends StructureToolParams> {
  (params: ComponentHelperOnlyParams<T>): ComponentHelperOutput<T>;

  (
    title: NonNullable<ComponentHelperTitle<T>['title']>,
    component: NonNullable<ListItemCore<T>['component']>,
    params?: ComponentHelperRestParams<T>,
  ): ComponentHelperOutput<T>;
}

/**
 * Helper function to define a list item rendering a custom React component.
 * Supports call signatures either with a single configuration parameters object,
 * or with positional arguments (title, component reference, and optional parameters).
 *
 * @template T - The structure tool configuration parameters schema.
 * @param titleOrParams - The display title string (or configuration callback) or the complete component configuration parameters object.
 * @param component - Optional component reference (required if title is passed as first argument).
 * @param params - Optional additional configurations for the list item.
 * @returns The resolved component list item configuration object.
 */
export const componentHelper = <T extends StructureToolParams>(
  titleOrParams: ComponentHelperOnlyParams<T> | NonNullable<ComponentHelperTitle<T>['title']>,
  component?: NonNullable<ListItemCore<T>['component']>,
  params?: ComponentHelperRestParams<T>,
): ComponentHelperOutput<T> => {
  if (typeof titleOrParams === 'object' && 'component' in titleOrParams) {
    return titleOrParams;
  }

  return {
    ...params,
    title: titleOrParams,
    component,
  } as unknown as ComponentHelperOutput<T>;
};

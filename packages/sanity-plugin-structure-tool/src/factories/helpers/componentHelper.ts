import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

type ComponentHelperRestParams<T extends StructureToolParams> = SimpleMerge<
  [
    WorkspacesAndRolesListItem<T>,
    Pick<ListItemCore<T>, 'id' | 'icon' | 'componentOptions' | 'menuItemGroups' | 'menuItems'>,
  ]
>;

type ComponentHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [
    ComponentHelperRestParams<T>,
    {
      title: NonNullable<ListItemCore<T>['title']>;
      component: NonNullable<ListItemCore<T>['component']>;
    },
  ]
>;

type ComponentHelperOutput<T extends StructureToolParams> = ComponentHelperOnlyParams<T>;

export interface ComponentHelper<T extends StructureToolParams> {
  (params: ComponentHelperOnlyParams<T>): ComponentHelperOutput<T>;

  (
    title: NonNullable<ListItemCore<T>['title']>,
    component: NonNullable<ListItemCore<T>['component']>,
    params?: ComponentHelperRestParams<T>,
  ): ComponentHelperOutput<T>;
}

export const componentHelper = <T extends StructureToolParams>(
  titleOrParams: ComponentHelperOnlyParams<T> | NonNullable<ListItemCore<T>['title']>,
  component?: NonNullable<ListItemCore<T>['component']>,
  params?: ComponentHelperRestParams<T>,
): ComponentHelperOutput<T> => {
  if (typeof titleOrParams === 'object') {
    return titleOrParams;
  }

  return {
    ...params,
    title: titleOrParams,
    component,
  } as unknown as ComponentHelperOutput<T>;
};

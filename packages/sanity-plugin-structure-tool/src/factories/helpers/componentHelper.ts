import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

type ComponentHelperCoreParams<T extends StructureToolParams> = SimpleMerge<
  [ListItemWithWorkspacesAndRoles<T>, Pick<ListItemWithoutGenerics, 'icon'>]
>;

type ComponentHelperParams<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemWithWorkspacesAndRoles<T>,
    {
      title: NonNullable<ListItemWithoutGenerics['title']>;
      component: NonNullable<ListItemWithoutGenerics['component']>;
    },
  ]
>;

type ComponentHelperOutput<T extends StructureToolParams> = ComponentHelperParams<T>;

export interface ComponentHelper<T extends StructureToolParams> {
  (params: ComponentHelperParams<T>): ComponentHelperOutput<T>;

  (
    title: NonNullable<ListItemWithoutGenerics['title']>,
    component: NonNullable<ListItemWithoutGenerics['component']>,
    params?: ComponentHelperCoreParams<T>,
  ): ComponentHelperOutput<T>;
}

export const componentHelper = <T extends StructureToolParams>(
  titleOrParams: ComponentHelperParams<T> | NonNullable<ListItemWithoutGenerics['title']>,
  component?: NonNullable<ListItemWithoutGenerics['component']>,
  params?: ComponentHelperCoreParams<T>,
): ComponentHelperOutput<T> => {
  if (typeof titleOrParams === 'string' && component) {
    return {
      ...params,
      title: titleOrParams,
      component,
    };
  }

  return titleOrParams as unknown as ComponentHelperOutput<T>;
};

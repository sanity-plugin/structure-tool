import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItem } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

type ChildrenHelperCoreParams<T extends StructureToolParams> = SimpleMerge<
  [ListItemWithWorkspacesAndRoles<T>, Pick<ListItem<T>, 'id' | 'icon' | 'showIcons'>]
>;

type ChildrenHelperParams<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemWithWorkspacesAndRoles<T>,
    {
      title: NonNullable<ListItem<T>['title']>;
      children: NonNullable<ListItem<T>['children']>;
    },
  ]
>;

type ChildrenHelperOutput<T extends StructureToolParams> = ChildrenHelperParams<T>;

export interface ChildrenHelper<T extends StructureToolParams> {
  (params: ChildrenHelperParams<T>): ChildrenHelperOutput<T>;

  (
    title: NonNullable<ListItem<T>['title']>,
    children: ListItem<T>[],
    params?: ChildrenHelperCoreParams<T>,
  ): ChildrenHelperOutput<T>;
}

export const childrenHelper = <T extends StructureToolParams>(
  titleOrParams: ChildrenHelperParams<T> | NonNullable<ListItem<T>['title']>,
  children?: ListItem<T>[],
  params?: ChildrenHelperCoreParams<T>,
): ChildrenHelperOutput<T> => {
  if (typeof titleOrParams === 'object') {
    return titleOrParams;
  }

  return {
    ...params,
    title: titleOrParams,
    children,
  } as unknown as ChildrenHelperOutput<T>;
};

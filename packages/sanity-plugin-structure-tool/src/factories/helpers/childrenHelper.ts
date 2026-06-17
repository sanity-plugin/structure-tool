import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItem, ListItemWithoutGenerics } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

type ChildrenHelperCoreParams<T extends StructureToolParams> = SimpleMerge<
  [ListItemWithWorkspacesAndRoles<T>, Pick<ListItemWithoutGenerics, 'icon'>]
>;

type ChildrenHelperParams<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemWithWorkspacesAndRoles<T>,
    {
      title: NonNullable<ListItemWithoutGenerics['title']>;
      children: ListItem<T>[];
    },
  ]
>;

type ChildrenHelperOutput<T extends StructureToolParams> = ChildrenHelperParams<T>;

export interface ChildrenHelper<T extends StructureToolParams> {
  (params: ChildrenHelperParams<T>): ChildrenHelperOutput<T>;

  (
    title: NonNullable<ListItemWithoutGenerics['title']>,
    children: ListItem<T>[],
    params?: ChildrenHelperCoreParams<T>,
  ): ChildrenHelperOutput<T>;
}

export const childrenHelper = <T extends StructureToolParams>(
  titleOrParams: ChildrenHelperParams<T> | NonNullable<ListItemWithoutGenerics['title']>,
  children?: ListItem<T>[],
  params?: ChildrenHelperCoreParams<T>,
): ChildrenHelperOutput<T> => {
  if (typeof titleOrParams === 'string' && children) {
    return {
      ...params,
      title: titleOrParams,
      children,
    };
  }

  return titleOrParams as unknown as ChildrenHelperOutput<T>;
};

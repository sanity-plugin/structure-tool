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

export interface ChildrenHelperTitle<T extends StructureToolParams> {
  title?: StructureToolGenericParam<T, string>;
}

type ChildrenHelperRestParams<T extends StructureToolParams> = SimpleMerge<
  [
    WorkspacesAndRolesListItem<T>,
    Pick<ListItemCore<T>, 'id' | 'icon' | 'showIcons' | 'menuItemGroups' | 'menuItems'>,
  ]
>;

type ChildrenHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [
    ChildrenHelperRestParams<T>,
    {
      title: NonNullable<ListItemCore<T>['title']>;
      children: NonNullable<ListItemChildren<T>['children']>;
    },
  ]
>;

type ChildrenHelperOutput<T extends StructureToolParams> = ChildrenHelperOnlyParams<T>;

export interface ChildrenHelper<T extends StructureToolParams> {
  (params: ChildrenHelperOnlyParams<T>): ChildrenHelperOutput<T>;

  (
    title: NonNullable<ChildrenHelperTitle<T>['title']>,
    children: ListItemCore<T>[],
    params?: ChildrenHelperRestParams<T>,
  ): ChildrenHelperOutput<T>;
}

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

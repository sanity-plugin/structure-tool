import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

type DividerHelperRestParams<T extends StructureToolParams> = WorkspacesAndRolesListItem<T>;

type DividerHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [DividerHelperRestParams<T>, Pick<ListItemCore<T>, 'title'>]
>;

type DividerHelperOutput<T extends StructureToolParams> = DividerHelperOnlyParams<T> & {
  isDivider: true;
};

export interface DividerHelper<T extends StructureToolParams> {
  (params?: DividerHelperOnlyParams<T>): DividerHelperOutput<T>;

  (title?: ListItemCore<T>['title'], params?: DividerHelperRestParams<T>): DividerHelperOutput<T>;
}

export const dividerHelper = <T extends StructureToolParams>(
  titleOrParams?: DividerHelperOnlyParams<T> | ListItemCore<T>['title'],
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

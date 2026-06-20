import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItem } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

type DividerHelperCoreParams<T extends StructureToolParams> = ListItemWithWorkspacesAndRoles<T>;

type DividerHelperParams<T extends StructureToolParams> = SimpleMerge<
  [DividerHelperCoreParams<T>, Pick<ListItem<T>, 'title'>]
>;

type DividerHelperOutput<T extends StructureToolParams> = DividerHelperParams<T> & {
  isDivider: true;
};

export interface DividerHelper<T extends StructureToolParams> {
  (params?: DividerHelperParams<T>): DividerHelperOutput<T>;

  (title?: ListItem<T>['title'], params?: DividerHelperCoreParams<T>): DividerHelperOutput<T>;
}

export const dividerHelper = <T extends StructureToolParams>(
  titleOrParams?: DividerHelperParams<T> | ListItem<T>['title'],
  params?: DividerHelperCoreParams<T>,
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

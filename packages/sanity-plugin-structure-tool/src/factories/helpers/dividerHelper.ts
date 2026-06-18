import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItem } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

type DividerHelperParams<T extends StructureToolParams> = SimpleMerge<
  [ListItemWithWorkspacesAndRoles<T>, Pick<ListItem<T>, 'title'>]
>;

type DividerHelperOutput<T extends StructureToolParams> = DividerHelperParams<T> & {
  isDivider: true;
};

export interface DividerHelper<T extends StructureToolParams> {
  (params?: DividerHelperParams<T>): DividerHelperOutput<T>;

  (
    title?: ListItem<T>['title'],
    params?: Omit<DividerHelperParams<T>, 'title'>,
  ): DividerHelperOutput<T>;
}

export const dividerHelper = <T extends StructureToolParams>(
  titleOrParams?: DividerHelperParams<T> | ListItem<T>['title'],
  params?: Omit<DividerHelperParams<T>, 'title'>,
): DividerHelperOutput<T> => {
  if (typeof titleOrParams === 'string') {
    return {
      ...params,
      title: titleOrParams,
      isDivider: true,
    };
  }

  return {
    ...titleOrParams,
    isDivider: true,
  };
};

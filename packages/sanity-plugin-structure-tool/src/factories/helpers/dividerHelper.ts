import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';

type DividerHelperParams<T extends StructureToolParams> = ListItemWithWorkspacesAndRoles<T> &
  Pick<ListItemWithoutGenerics, 'title'>;

type DividerHelperOutput<T extends StructureToolParams> = DividerHelperParams<T> & {
  isDivider: true;
};

export interface DividerHelperType<T extends StructureToolParams> {
  (params?: DividerHelperParams<T>): DividerHelperOutput<T>;

  (
    title?: ListItemWithoutGenerics['title'],
    params?: Omit<DividerHelperParams<T>, 'title'>,
  ): DividerHelperOutput<T>;
}

export const dividerHelper = <T extends StructureToolParams>(
  titleOrParams?: DividerHelperParams<T> | ListItemWithoutGenerics['title'],
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

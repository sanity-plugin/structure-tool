import type {
  StructureToolGenericParam,
  StructureToolParams,
} from '@/structure/types/common.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

export interface DividerHelperTitle<T extends StructureToolParams> {
  title?: StructureToolGenericParam<T, string>;
}

type DividerHelperRestParams<T extends StructureToolParams> = WorkspacesAndRolesListItem<T>;

type DividerHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [DividerHelperRestParams<T>, DividerHelperTitle<T>]
>;

type DividerHelperOutput<T extends StructureToolParams> = DividerHelperOnlyParams<T> & {
  isDivider: true;
};

export interface DividerHelper<T extends StructureToolParams> {
  (params?: DividerHelperOnlyParams<T>): DividerHelperOutput<T>;

  (
    title?: DividerHelperTitle<T>['title'],
    params?: DividerHelperRestParams<T>,
  ): DividerHelperOutput<T>;
}

export const dividerHelper = <T extends StructureToolParams>(
  titleOrParams?: DividerHelperOnlyParams<T> | DividerHelperTitle<T>['title'],
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

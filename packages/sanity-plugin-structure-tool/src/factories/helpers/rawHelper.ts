import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

type RawHelperRestParams<T extends StructureToolParams> = WorkspacesAndRolesListItem<T>;

type RawHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [
    RawHelperRestParams<T>,
    {
      raw: NonNullable<ListItemCore<T>['raw']>;
    },
  ]
>;

type RawHelperOutput<T extends StructureToolParams> = RawHelperOnlyParams<T>;

export interface RawHelper<T extends StructureToolParams> {
  (params: RawHelperOnlyParams<T>): RawHelperOutput<T>;

  (raw: NonNullable<ListItemCore<T>['raw']>, params?: RawHelperRestParams<T>): RawHelperOutput<T>;
}

export const rawHelper = <T extends StructureToolParams>(
  rawOrParams: RawHelperOnlyParams<T> | NonNullable<ListItemCore<T>['raw']>,
  params?: RawHelperRestParams<T>,
): RawHelperOutput<T> => {
  if (typeof rawOrParams === 'object') {
    return rawOrParams;
  }

  return {
    ...params,
    raw: rawOrParams,
  };
};

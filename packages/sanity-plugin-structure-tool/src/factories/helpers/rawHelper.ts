import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

type RawHelperCoreParams<T extends StructureToolParams> = ListItemWithWorkspacesAndRoles<T>;

type RawHelperParams<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemWithWorkspacesAndRoles<T>,
    {
      raw: NonNullable<ListItemWithoutGenerics['raw']>;
    },
  ]
>;

type RawHelperOutput<T extends StructureToolParams> = RawHelperParams<T>;

export interface RawHelper<T extends StructureToolParams> {
  (params: RawHelperParams<T>): RawHelperOutput<T>;

  (
    raw: NonNullable<ListItemWithoutGenerics['raw']>,
    params?: RawHelperCoreParams<T>,
  ): RawHelperOutput<T>;
}

export const rawHelper = <T extends StructureToolParams>(
  rawOrParams: RawHelperParams<T> | NonNullable<ListItemWithoutGenerics['raw']>,
  params?: RawHelperCoreParams<T>,
): RawHelperOutput<T> => {
  if (typeof rawOrParams === 'function') {
    return {
      ...params,
      raw: rawOrParams,
    };
  }

  return rawOrParams;
};

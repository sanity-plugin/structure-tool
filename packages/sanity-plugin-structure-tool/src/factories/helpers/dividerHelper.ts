import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';

type DividerHelperParams<T extends StructureToolParams> = ListItemWithWorkspacesAndRoles<T> &
  Pick<ListItemWithoutGenerics, 'title'>;

type DividerHelperOutput<T extends StructureToolParams> = DividerHelperParams<T> & {
  isDivider: true;
};

export type DividerHelperType<T extends StructureToolParams> = (
  params: DividerHelperParams<T>,
) => DividerHelperOutput<T>;

export type DividerHelper = <T extends StructureToolParams>(
  params: DividerHelperParams<T>,
) => DividerHelperOutput<T>;

export const dividerHelper: DividerHelper = (params) => ({
  ...params,
  isDivider: true,
});

import type { SetRequired } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';

type SingletonHelperParams<T extends StructureToolParams> = ListItemWithWorkspacesAndRoles<T> &
  SetRequired<Pick<ListItemWithoutGenerics, 'title' | 'schemaType' | 'icon'>, 'schemaType'>;

type SingletonHelperOutput<T extends StructureToolParams> = SingletonHelperParams<T> & {
  singleton: true;
};

export type SingletonHelperType<T extends StructureToolParams> = (
  params: SingletonHelperParams<T>,
) => SingletonHelperOutput<T>;

export type SingletonHelper = <T extends StructureToolParams>(
  params: SingletonHelperParams<T>,
) => SingletonHelperOutput<T>;

export const singletonHelper: SingletonHelper = (params) => ({
  ...params,
  singleton: true,
});

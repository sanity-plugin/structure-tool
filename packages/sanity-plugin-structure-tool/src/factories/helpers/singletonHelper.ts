import type { SetRequired } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItemWithoutGenerics } from '@/types';

type SingletonHelperParams<T extends StructureToolParams> = ListItemWithWorkspacesAndRoles<T> &
  SetRequired<Pick<ListItemWithoutGenerics, 'title' | 'schemaType' | 'icon'>, 'schemaType'>;

type SingletonHelperOutput<T extends StructureToolParams> = SingletonHelperParams<T> & {
  singleton: true;
};

export interface SingletonHelperType<T extends StructureToolParams> {
  (params: SingletonHelperParams<T>): SingletonHelperOutput<T>;

  (
    schemaType: NonNullable<ListItemWithoutGenerics['schemaType']>,
    params?: Omit<SingletonHelperParams<T>, 'schemaType'>,
  ): SingletonHelperOutput<T>;
}

export const singletonHelper = <T extends StructureToolParams>(
  schemaTypeOrParams: SingletonHelperParams<T> | NonNullable<ListItemWithoutGenerics['schemaType']>,
  params?: Omit<SingletonHelperParams<T>, 'schemaType'>,
): SingletonHelperOutput<T> => {
  if (typeof schemaTypeOrParams === 'string') {
    return {
      ...params,
      schemaType: schemaTypeOrParams,
      singleton: true,
    };
  }

  return {
    ...schemaTypeOrParams,
    singleton: true,
  } as unknown as SingletonHelperOutput<T>;
};

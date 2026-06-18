import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWithWorkspacesAndRoles } from '@/structure/types/listItemCore.types';
import type { ListItem } from '@/types';
import type { SimpleMerge } from '@/types/lib.types';

type SingletonHelperCoreParams<T extends StructureToolParams> = SimpleMerge<
  [ListItemWithWorkspacesAndRoles<T>, Pick<ListItem<T>, 'title' | 'icon' | 'isPlural'>]
>;

type SingletonHelperParams<T extends StructureToolParams> = SimpleMerge<
  [
    SingletonHelperCoreParams<T>,
    {
      schemaType: NonNullable<ListItem<T>['schemaType']>;
    },
  ]
>;

type SingletonHelperOutput<T extends StructureToolParams> = SimpleMerge<
  [
    SingletonHelperParams<T>,
    {
      singleton: true;
    },
  ]
>;

export interface SingletonHelper<T extends StructureToolParams> {
  (params: SingletonHelperParams<T>): SingletonHelperOutput<T>;

  (
    schemaType: NonNullable<ListItem<T>['schemaType']>,
    params?: SingletonHelperCoreParams<T>,
  ): SingletonHelperOutput<T>;
}

export const singletonHelper = <T extends StructureToolParams>(
  schemaTypeOrParams: SingletonHelperParams<T> | NonNullable<ListItem<T>['schemaType']>,
  params?: SingletonHelperCoreParams<T>,
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

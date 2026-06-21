import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { WorkspacesAndRolesListItem } from '@/structure/types/listItemDefinitions.types';
import type { SimpleMerge } from '@/types/lib.types';

type SingletonHelperRestParams<T extends StructureToolParams> = SimpleMerge<
  [
    WorkspacesAndRolesListItem<T>,
    Pick<ListItemCore<T>, 'id' | 'title' | 'icon' | 'templates' | 'isPlural'>,
  ]
>;

type SingletonHelperOnlyParams<T extends StructureToolParams> = SimpleMerge<
  [
    SingletonHelperRestParams<T>,
    {
      schemaType: NonNullable<ListItemCore<T>['schemaType']>;
    },
  ]
>;

type SingletonHelperOutput<T extends StructureToolParams> = SimpleMerge<
  [
    SingletonHelperOnlyParams<T>,
    {
      singleton: true;
    },
  ]
>;

export interface SingletonHelper<T extends StructureToolParams> {
  (params: SingletonHelperOnlyParams<T>): SingletonHelperOutput<T>;

  (
    schemaType: NonNullable<ListItemCore<T>['schemaType']>,
    params?: SingletonHelperRestParams<T>,
  ): SingletonHelperOutput<T>;
}

export const singletonHelper = <T extends StructureToolParams>(
  schemaTypeOrParams: SingletonHelperOnlyParams<T> | NonNullable<ListItemCore<T>['schemaType']>,
  params?: SingletonHelperRestParams<T>,
): SingletonHelperOutput<T> => {
  if (typeof schemaTypeOrParams === 'object') {
    return {
      ...schemaTypeOrParams,
      singleton: true,
    } as unknown as SingletonHelperOutput<T>;
  }

  return {
    ...params,
    schemaType: schemaTypeOrParams,
    singleton: true,
  };
};

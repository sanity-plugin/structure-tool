import { helpers } from '@/factories/helpers';

import type { Helpers } from '@/factories/helpers';
import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

interface DefineListItemParams<T extends StructureToolParams> {
  helpers: Helpers<T>;
}

export type DefineListItem<T extends StructureToolParams> = (
  listItem: ((params: DefineListItemParams<T>) => ListItem<T>) | ListItem<T>,
) => ListItem<T>;

export const defineListItem = <T extends StructureToolParams>(
  listItem: Parameters<DefineListItem<T>>[0],
): ReturnType<DefineListItem<T>> => {
  if (typeof listItem === 'function') {
    return listItem({ helpers });
  }

  return listItem;
};

import { helpers } from '@/factories/helpers';

import type { Helpers } from '@/factories/helpers';
import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

interface DefineListItemsParams<T extends StructureToolParams> {
  helpers: Helpers<T>;
}

export type DefineListItems<T extends StructureToolParams> = (
  listItems: ((params: DefineListItemsParams<T>) => ListItem<T>[]) | ListItem<T>[],
) => ListItem<T>[];

export const defineListItems = <T extends StructureToolParams>(
  listItems: Parameters<DefineListItems<T>>[0],
): ReturnType<DefineListItems<T>> => {
  if (typeof listItems === 'function') {
    return listItems({ helpers });
  }

  return listItems;
};

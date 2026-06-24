import { helpers } from '@/factories/helpers';

import type { Helpers } from '@/factories/helpers';
import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

/**
 * Context properties provided to a dynamic list items definition callback.
 *
 * @template T - The structure tool configuration parameters schema.
 */
interface DefineListItemsParams<T extends StructureToolParams> {
  /**
   * The list helper functions scoped to the configuration.
   */
  helpers: Helpers<T>;
}

/**
 * Function type that accepts either a direct array of list items or a callback function receiving helpers, and returns an array of ListItems.
 * Enables the Helper Callback Pattern.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export type DefineListItems<T extends StructureToolParams> = (
  listItems: ((params: DefineListItemsParams<T>) => ListItem<T>[]) | ListItem<T>[],
) => ListItem<T>[];

/**
 * Helper function to define multiple list items. Supports either a static array of list items or a dynamic callback receiving configuration helpers.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export const defineListItems = <T extends StructureToolParams>(
  listItems: Parameters<DefineListItems<T>>[0],
): ReturnType<DefineListItems<T>> => {
  if (typeof listItems === 'function') {
    return listItems({ helpers });
  }

  return listItems;
};

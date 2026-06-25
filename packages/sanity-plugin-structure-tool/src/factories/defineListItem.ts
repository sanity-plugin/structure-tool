import { helpers } from '@/factories/helpers';

import type { Helpers } from '@/factories/helpers';
import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

/**
 * Context properties provided to a dynamic list item definition callback.
 *
 * @template T - The structure tool configuration parameters schema.
 */
interface DefineListItemParams<T extends StructureToolParams> {
  /**
   * The list helper functions scoped to the configuration.
   */
  helpers: Helpers<T>;
}

/**
 * Function type that accepts either a direct list item object or a callback function receiving helpers, and returns a ListItem.
 * Enables the Helper Callback Pattern.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export type DefineListItem<T extends StructureToolParams> = (
  listItem: ((params: DefineListItemParams<T>) => ListItem<T>) | ListItem<T>,
) => ListItem<T>;

/**
 * Helper function to define a single list item. Supports either a static list item object or a dynamic callback receiving configuration helpers.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export const defineListItem = <T extends StructureToolParams>(
  listItem: Parameters<DefineListItem<T>>[0],
): ReturnType<DefineListItem<T>> => {
  if (typeof listItem === 'function') {
    return listItem({ helpers });
  }

  return listItem;
};

import type {
  RenderItemsParams,
  RenderListItemsParams,
} from '@/structure/renderListItems/renderListItems.types';
import type { ListItemReturn, StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/types';

/**
 * Child item parameters for dynamic list item key generation.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface ListItemKeyChildParams<T extends StructureToolParams> {
  /**
   * The list item being mapped/keyed.
   */
  listItem: ListItem<T>;
  /**
   * The array index of the list item.
   */
  index: number;
}

/**
 * Parameters for resolving a unique key for a list item in the rendering pipeline.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface ListItemKeyParams<T extends StructureToolParams> {
  /**
   * Parameters configured on the main list items render function.
   */
  listItemsParams: RenderListItemsParams<T>;
  /**
   * Parameters configured on the items render function.
   */
  itemsParams: RenderItemsParams<T>;
  /**
   * Parameter mappings of the child item.
   */
  mappingParams: ListItemKeyChildParams<T>;
}

/**
 * Function type that resolves a list item to its unique key/ID.
 */
export type ListItemKey = <T extends StructureToolParams>(
  params: ListItemKeyParams<T>,
) => ListItemReturn;

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

/**
 * Parameters for setting up initial value templates.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface TemplatesParams<T extends StructureToolParams> {
  /**
   * The list items from which the initial value templates will be derived.
   */
  listItems: ListItem<T>[];
}

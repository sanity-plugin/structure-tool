import type { TemplateResolver } from 'sanity';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

/**
 * Parameters for setting up initial value templates.
 *
 * @template T - The structure tool configuration parameters schema.
 */
interface TemplatesParams<T extends StructureToolParams> {
  /**
   * The list items from which the initial value templates will be derived.
   */
  listItems: ListItem<T>[];
}

/**
 * Resolver function type that generates standard Sanity initial value templates from the structure's list items.
 */
export type Templates = <T extends StructureToolParams>(
  params: TemplatesParams<T>,
) => TemplateResolver;

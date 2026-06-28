import type { TemplateResolver } from 'sanity';

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

/**
 * Function type representing the templates resolver generator.
 *
 * @template T - The structure tool configuration parameters schema.
 * @param params - Configuration list items parameters.
 * @returns A TemplateResolver function.
 */
export type Templates = <T extends StructureToolParams>(
  params: TemplatesParams<T>,
) => TemplateResolver;

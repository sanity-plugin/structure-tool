import pluralize from 'pluralize-esm';

import { getComputedListItems } from '@/helpers/getComputedListItems';

import type { StructureCommonParams, StructureToolParams } from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

/**
 * Helper function type that generates a display title for a list item, considering pluralization, singletons, and fallback schema types.
 */
type GenerateDisplayTitle = <T extends StructureToolParams>(
  title: string,
  params: SimpleMerge<
    [
      Omit<StructureCommonParams<T>, 'workspace'>,
      {
        listItem: ListItemCore<T>;
      },
    ]
  >,
) => string;

/**
 * Computes the display title of a list item.
 * Evaluates the dynamically resolved schema name fallback and handles pluralization if needed.
 *
 * @template T - The structure tool configuration parameters schema.
 * @param title - The raw title string.
 * @param params - Render context parameters containing S, context, and the listItem object.
 * @returns The resolved display title string.
 */
export const generateDisplayTitle: GenerateDisplayTitle = (title, params) => {
  const { listItem, S, context } = params;

  const { isPlural, schemaType, singleton } = getComputedListItems({
    listItem,
    context,
  });

  const schemaTypeValue = schemaType();

  const schemaTitle = schemaTypeValue ? S.documentTypeListItem(schemaTypeValue).getTitle() : '';
  const isItPlural = title ? false : (isPlural() ?? !singleton());

  const mainTitle = title || (schemaTitle ?? '');

  const finalTitle = isItPlural ? pluralize(mainTitle) : mainTitle;
  return finalTitle || '';
};

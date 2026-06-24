import pluralize from 'pluralize-esm';

import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getTitle } from '@/helpers/getTitle';

import type { StructureCommonParams, StructureToolParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';
import type { SimpleMerge } from '@/types/lib.types';

/**
 * Result output from resolving the display titles for a list item.
 */
interface GetDisplayTitleOutput {
  /**
   * The display title when this list item acts as the parent pane's header.
   */
  parentTitle: string;
  /**
   * The display title when this list item acts as a nested child pane's header.
   */
  childTitle: string;
}

/**
 * Helper function type that computes parent/child display titles for a list item, considering pluralization, singletons, and fallback schema types.
 */
type GetDisplayTitle = <T extends StructureToolParams>(
  params: SimpleMerge<
    [
      Omit<StructureCommonParams<T>, 'workspace'>,
      {
        listItem: ListItem<T>;
      },
    ]
  >,
) => GetDisplayTitleOutput;

/**
 * Resolves the parent and child display titles of a list item.
 * Evaluates the dynamically resolved schema name fallback and handles pluralization if needed.
 *
 * @param params - Render context parameters containing S, context, and the listItem object.
 * @returns Resolving object containing parentTitle and childTitle.
 */
export const getDisplayTitle: GetDisplayTitle = (params) => {
  const { S, context, listItem } = params;

  const {
    title,
    schemaType = '',
    singleton,
    isPlural,
  } = getComputedListItems({ listItem, context });

  const { parentTitle, childTitle } = getTitle(title, context);

  const generateDisplayTitle = (titleParam?: string) => {
    const schemaDefaultTitle = S.documentTypeListItem(schemaType).getTitle();
    const schemaTitle = schemaType ? schemaDefaultTitle : '';
    const isItPlural = titleParam ? false : (isPlural ?? !singleton);

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const mainTitle = titleParam || (schemaTitle ?? '');

    const finalTitle = isItPlural ? pluralize(mainTitle) : mainTitle;
    return finalTitle || '';
  };

  return {
    parentTitle: generateDisplayTitle(parentTitle),
    childTitle: generateDisplayTitle(childTitle),
  };
};

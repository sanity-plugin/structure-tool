import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type {
  GetListItemOriginalType,
  StructureToolParams,
  ValidSanityContext,
} from '@/structure/types/common.types';
import type { ListItemCore } from '@/structure/types/listItem.types';

/**
 * Result output from resolving the textual title configuration.
 */
interface GetTitleOutput {
  /**
   * The text resolved for the parent pane's header.
   */
  parentTitle: string;
  /**
   * The text resolved for the child pane's header.
   */
  childTitle: string;
}

/**
 * Helper function type that extracts and evaluates raw parent/child title fields.
 */
type GetTitle = <T extends StructureToolParams>(
  title: GetListItemOriginalType<ListItemCore<T>['title']>,
  context: ValidSanityContext,
) => GetTitleOutput;

/**
 * Resolves the parent and child titles from a resolved title parameter (which can be a static string or an object with parent/child titles).
 *
 * @param title - The raw title string or layout title object.
 * @param context - The Sanity Studio configuration context.
 * @returns Resolving object containing parentTitle and childTitle strings.
 */
export const getTitle: GetTitle = (title, context) => {
  const contextValues = getContextValues(context);

  if (typeof title === 'object') {
    const { parent, child } = title;

    const parentTitle = getValidListItem(parent, contextValues);
    const childTitle = getValidListItem(child, contextValues);

    return {
      parentTitle: parentTitle ?? '',
      childTitle: childTitle ?? '',
    };
  }

  return {
    parentTitle: title ?? '',
    childTitle: title ?? '',
  };
};

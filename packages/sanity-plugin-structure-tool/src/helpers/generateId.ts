import { constants } from '@/constants';
import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';
import { sanitizeUrl } from '@/utils';

import type { ListItemKeyParams } from '@/structure/listItems/listItems.types';
import type { StructureToolParams } from '@/structure/types/common.types';

/**
 * Result output from generating a unique, URL-safe identifier for a list item.
 */
interface GenerateIdOutput {
  /**
   * The fallback system unique ID based on item tree depth/index.
   */
  uniqueId: string;
  /**
   * The final resolved ID (uses custom ID if specified by the user, else uniqueId).
   */
  id: string;
}

/**
 * Helper function type that generates a unique slugified ID for a structural list item.
 */
type GenerateId = <T extends StructureToolParams>(
  title: string,
  params: ListItemKeyParams<T>,
) => GenerateIdOutput;

/**
 * Generates a unique, URL-safe workspace-aware ID for a list item, considering user-defined custom IDs.
 *
 * @param title - The raw display title of the item.
 * @param params - Render context parameters containing mapping information and list parameters.
 * @returns Resolving object containing uniqueId and id.
 */
export const generateId: GenerateId = (title, params) => {
  const { listItemsParams, itemsParams, mappingParams } = params;
  const { context } = listItemsParams;
  const { id: itemId } = itemsParams;
  const { listItem, index } = mappingParams;
  const { id } = listItem;

  const contextValues = getContextValues(context);

  const uniqueIdValue = [itemId, index + 1].join(constants.URL_PATH_SEPARATOR);
  const sanitizedPaths = sanitizeUrl(title).split(' ');

  const idValue = [uniqueIdValue, ...sanitizedPaths].join(constants.URL_PATH_SEPARATOR);

  const userEnteredId = getValidListItem(id, {
    ...contextValues,
    values: {
      uniqueId: uniqueIdValue,
      sanitizedPaths,
      id: idValue,
      slugify: sanitizeUrl,
    },
  });

  return {
    uniqueId: uniqueIdValue,
    id: userEnteredId ?? idValue,
  };
};

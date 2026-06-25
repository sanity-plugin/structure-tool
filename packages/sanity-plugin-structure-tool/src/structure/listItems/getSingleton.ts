import { constants } from '@/constants';
import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getDisplayTitle } from '@/helpers/getDisplayTitle';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

/**
 * Renders a list item that opens directly into a singleton document editor pane rather than a list of documents.
 *
 * @param params - Render context parameters containing mapping and list parameters.
 * @returns The resolved Sanity Studio list item structure.
 */
export const getSingleton: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const { icon } = listItem;

  const { schemaType = '', templates } = getComputedListItems({ listItem, context });

  const { parentTitle, childTitle } = getDisplayTitle({ ...listItemsParams, listItem });
  const { id } = generateId(parentTitle, params);

  return S.listItem()
    .title(parentTitle)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .schemaType(schemaType)
    .child(() => {
      let schemaBuilder = S.editor()
        .title(childTitle)
        .id([schemaType, constants.SINGLETON_KEY].join('-'))
        .schemaType(schemaType);

      if (templates) {
        schemaBuilder = schemaBuilder.initialValueTemplate(
          [schemaType, ...Object.keys(templates)].join('-'),
          templates,
        );
      }

      return schemaBuilder;
    });
};

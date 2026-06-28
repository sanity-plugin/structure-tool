import { constants } from '@/constants';
import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { generateDisplayTitle } from '@/helpers/getDisplayTitle';

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

  const { parentTitle, childTitle, schemaType, icon, views, defaultPanes, templates } =
    getComputedListItems({
      listItem,
      context,
    });

  const parentTitleValue = generateDisplayTitle(parentTitle(), { listItem, S, context });
  const schemaTypeValue = schemaType();

  const { id } = generateId(parentTitleValue, params);

  return S.listItem()
    .title(parentTitleValue)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .schemaType(schemaTypeValue)
    .child((_, childOptions) => {
      const childTitleValue = generateDisplayTitle(childTitle({ childOptions }), {
        listItem,
        S,
        context,
      });

      let schemaBuilder = S.editor()
        .title(childTitleValue)
        .id([schemaTypeValue, constants.SINGLETON_KEY].join('-'))
        .schemaType(schemaTypeValue);

      const viewsValue = views({ childOptions });

      if (viewsValue) {
        schemaBuilder = schemaBuilder.views(viewsValue);
      }

      const defaultPanesValue = defaultPanes({
        childOptions,
        defaultPaneViews: (viewsValue ?? []).map((view) => view.id),
      });

      if (defaultPanesValue) {
        schemaBuilder = schemaBuilder.defaultPanes(defaultPanesValue);
      }

      const templatesValue = templates({ childOptions });

      if (templatesValue) {
        schemaBuilder = schemaBuilder.initialValueTemplate(
          [schemaTypeValue, JSON.stringify(templatesValue)].join('-'),
          templatesValue,
        );
      }

      return schemaBuilder;
    });
};

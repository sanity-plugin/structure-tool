import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getTitle } from '@/helpers/getTitle';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

export const getFilters: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const { icon } = listItem;

  const {
    title,
    showIcons,
    apiVersion,
    filter,
    filterParams,
    defaultOrdering,
    defaultLayout,
    menuItemGroups,
    menuItems,
  } = getComputedListItems({ listItem, context });

  const { parentTitle, childTitle } = getTitle(title, context);
  const { id } = generateId(parentTitle, params);

  return S.listItem()
    .title(parentTitle)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .child(() => {
      let schemaBuilder = S.documentList().title(childTitle).showIcons(showIcons);

      if (filter) {
        // eslint-disable-next-line unicorn/no-array-callback-reference
        schemaBuilder = schemaBuilder.filter(filter).params({ ...filterParams });
      }

      if (apiVersion) {
        schemaBuilder = schemaBuilder.apiVersion(apiVersion);
      }

      if (defaultOrdering) {
        schemaBuilder = schemaBuilder.defaultOrdering(
          Object.entries(defaultOrdering).map(([field, value]) => ({
            field,
            ...(typeof value === 'string' ? { direction: value } : value),
          })),
        );
      }

      if (defaultLayout) {
        schemaBuilder = schemaBuilder.defaultLayout(defaultLayout);
      }

      if (menuItemGroups) {
        schemaBuilder = schemaBuilder.menuItemGroups(menuItemGroups);
      }

      if (menuItems) {
        schemaBuilder = schemaBuilder.menuItems(menuItems);
      }

      return schemaBuilder.initialValueTemplates([]);
    });
};

import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

export const getFilters: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const { icon } = listItem;

  const {
    title = '',
    showIcons,
    apiVersion,
    filter,
    filterParams,
    defaultOrdering,
    defaultLayout,
    menuItemGroups = [],
    menuItems,
  } = getComputedListItems({ listItem, context });

  const { id } = generateId(title, params);

  return S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .child(() => {
      let schemaBuilder = S.documentList()
        .title(title)
        // .menuItems([])
        .initialValueTemplates([])
        .showIcons(showIcons);

      if (filter) {
        // eslint-disable-next-line unicorn/no-array-callback-reference
        schemaBuilder = schemaBuilder.filter(filter);
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

      return schemaBuilder
        .params({ ...filterParams })
        .menuItemGroups(menuItemGroups)
        .menuItems(menuItems);
    });
};

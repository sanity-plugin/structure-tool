import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

export const getComponent: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const { icon, component } = listItem;

  const {
    title = '',
    componentOptions,
    menuItemGroups = [],
    menuItems,
  } = getComputedListItems({ listItem, context });

  const { id } = generateId(title, params);

  return S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .child((_, childOption) => {
      let schemaBuilder = S.component(component)
        .id(id)
        .options({ childOption, ...componentOptions })
        .menuItemGroups(menuItemGroups);

      if (menuItems) {
        schemaBuilder = schemaBuilder.menuItems(menuItems);
      }

      return schemaBuilder;
    });
};

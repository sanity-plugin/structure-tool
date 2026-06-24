import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getTitle } from '@/helpers/getTitle';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

export const getComponent: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const { icon, component } = listItem;

  const { title, componentOptions, menuItemGroups, menuItems } = getComputedListItems({
    listItem,
    context,
  });

  const { parentTitle, childTitle } = getTitle(title, context);
  const { id } = generateId(parentTitle, params);

  return S.listItem()
    .title(parentTitle)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .child((_, childOption) => {
      let schemaBuilder = S.component(component)
        .id(id)
        .options({ childOption, ...componentOptions });

      if (childTitle) {
        schemaBuilder = schemaBuilder.title(childTitle);
      }

      if (menuItemGroups) {
        schemaBuilder = schemaBuilder.menuItemGroups(menuItemGroups);
      }

      if (menuItems) {
        schemaBuilder = schemaBuilder.menuItems(menuItems);
      }

      return schemaBuilder;
    });
};

import { MenuItemBuilder, MenuItemGroupBuilder } from 'sanity/structure';

import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getContextValues } from '@/helpers/getContextValues';
import { getTitle } from '@/helpers/getTitle';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

/**
 * Renders a list item that displays a custom React component view.
 *
 * @param params - Render context parameters containing mapping and list parameters.
 * @returns The resolved Sanity Studio list item structure.
 */
export const getComponent: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const {
    icon,
    component,
    menuItems: listItemMenuItems,
    menuItemGroups: listItemMenuItemGroups,
  } = listItem;

  const contextValues = getContextValues(context);

  const { title, componentOptions } = getComputedListItems({
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

      const menuItemGroups = (() => {
        const prev = (schemaBuilder.getMenuItemGroups() ?? []).map((item) =>
          item instanceof MenuItemGroupBuilder ? item.serialize() : item,
        );

        return getValidListItem(listItemMenuItemGroups, { ...contextValues, prev });
      })();

      if (menuItemGroups) {
        schemaBuilder = schemaBuilder.menuItemGroups(menuItemGroups);
      }

      const menuItems = (() => {
        const prev = (schemaBuilder.getMenuItems() ?? []).map((item) =>
          item instanceof MenuItemBuilder ? item.serialize() : item,
        );

        return getValidListItem(listItemMenuItems, { ...contextValues, prev });
      })();

      if (menuItems) {
        schemaBuilder = schemaBuilder.menuItems(menuItems);
      }

      return schemaBuilder;
    });
};

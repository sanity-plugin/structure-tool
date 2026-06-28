import { MenuItemBuilder, MenuItemGroupBuilder } from 'sanity/structure';

import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';

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

  const { parentTitle, childTitle, icon, component, componentOptions, menuItemGroups, menuItems } =
    getComputedListItems({
      listItem,
      context,
    });

  const parentTitleValue = parentTitle();

  const { id } = generateId(parentTitleValue, params);

  return S.listItem()
    .title(parentTitleValue)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .child((_, childOptions) => {
      const title = childTitle({ childOptions });

      let schemaBuilder = S.component(component)
        .id(id)
        .options({ childOptions, ...componentOptions({ childOptions }) });

      if (title) {
        schemaBuilder = schemaBuilder.title(title);
      }

      const menuItemGroupsValue = menuItemGroups({
        childOptions,
        prevMenuItemGroups: (schemaBuilder.getMenuItemGroups() ?? []).map((item) =>
          item instanceof MenuItemGroupBuilder ? item.serialize() : item,
        ),
      });

      if (menuItemGroupsValue) {
        schemaBuilder = schemaBuilder.menuItemGroups(menuItemGroupsValue);
      }

      const menuItemsValue = menuItems({
        childOptions,
        prevMenuItems: (schemaBuilder.getMenuItems() ?? []).map((item) =>
          item instanceof MenuItemBuilder ? item.serialize() : item,
        ),
      });

      if (menuItemsValue) {
        schemaBuilder = schemaBuilder.menuItems(menuItemsValue);
      }

      return schemaBuilder;
    });
};

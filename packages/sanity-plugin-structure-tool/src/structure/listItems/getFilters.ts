import { MenuItemBuilder, MenuItemGroupBuilder } from 'sanity/structure';

import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getContextValues } from '@/helpers/getContextValues';
import { getTitle } from '@/helpers/getTitle';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

/**
 * Renders a list item that queries and displays documents filtered by a GROQ query.
 *
 * @param params - Render context parameters containing mapping and list parameters.
 * @returns The resolved Sanity Studio list item structure.
 */
export const getFilters: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const { icon, menuItems: listItemMenuItems, menuItemGroups: listItemMenuItemGroups } = listItem;

  const contextValues = getContextValues(context);

  const { title, showIcons, apiVersion, filter, filterParams, defaultOrdering, defaultLayout } =
    getComputedListItems({ listItem, context });

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

      return schemaBuilder.initialValueTemplates([]);
    });
};

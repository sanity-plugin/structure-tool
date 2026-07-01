import { MenuItemBuilder, MenuItemGroupBuilder } from 'sanity/structure';

import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';

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

  const {
    apiVersion,
    childTitle,
    defaultLayout,
    defaultOrdering,
    filter,
    filterParams,
    i18n,
    icon,
    menuItemGroups,
    menuItems,
    parentTitle,
    showIcons,
  } = getComputedListItems({ listItem, context });

  const parentTitleValue = parentTitle();

  const { id } = generateId(parentTitleValue, params);

  return S.listItem()
    .title(parentTitleValue)
    .i18n(i18n({ i18nTitle: parentTitleValue }))
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .child((_, childOptions) => {
      const childTitleValue = childTitle({ childOptions });

      let schemaBuilder = S.documentList()
        .title(childTitleValue)
        .i18n(i18n({ i18nTitle: childTitleValue }))
        .showIcons(showIcons({ childOptions }));

      const filterValue = filter({ childOptions });
      const filterParamsValue = filterParams({ childOptions });

      if (filterValue) {
        // eslint-disable-next-line unicorn/no-array-callback-reference
        schemaBuilder = schemaBuilder.filter(filterValue).params({ ...filterParamsValue });
      }

      const apiVersionValue = apiVersion({ childOptions });

      if (apiVersionValue) {
        schemaBuilder = schemaBuilder.apiVersion(apiVersionValue);
      }

      const defaultOrderingValue = defaultOrdering({ childOptions });

      if (defaultOrderingValue) {
        schemaBuilder = schemaBuilder.defaultOrdering(defaultOrderingValue);
      }

      const defaultLayoutValue = defaultLayout({ childOptions });

      if (defaultLayoutValue) {
        schemaBuilder = schemaBuilder.defaultLayout(defaultLayoutValue);
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

      return schemaBuilder.initialValueTemplates([]);
    });
};

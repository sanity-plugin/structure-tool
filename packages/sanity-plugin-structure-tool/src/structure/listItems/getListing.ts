import { MenuItemBuilder, MenuItemGroupBuilder } from 'sanity/structure';

import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { generateDisplayTitle } from '@/helpers/getDisplayTitle';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

/**
 * Renders a list item that displays lists of documents for a specific Sanity schema document type.
 *
 * @param params - Render context parameters containing mapping and list parameters.
 * @returns The resolved Sanity Studio list item structure.
 */
export const getListing: ListItemKey = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;

  const {
    parentTitle,
    childTitle,
    schemaType,
    icon,
    showIcons,
    apiVersion,
    filter,
    filterParams,
    defaultOrdering,
    defaultLayout,
    menuItemGroups,
    menuItems,
    hideAddButton,
    templates,
  } = getComputedListItems({ listItem, context });

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

      const filterValue = filter({ childOptions });
      const filterParamsValue = filterParams({ childOptions });

      let schemaBuilder = S.documentTypeList(schemaTypeValue)
        .title(childTitleValue)
        .id(id)
        .filter(['_type == $schemaType', ...(filterValue ? [filterValue] : [])].join(' && '))
        .params({
          schemaType: schemaTypeValue,
          ...filterParamsValue,
        })
        .showIcons(showIcons({ childOptions }));

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

      const hideAddButtonValue = hideAddButton({ childOptions });

      if (hideAddButtonValue) {
        return schemaBuilder.initialValueTemplates([]);
      }

      const templatesValue = templates({ childOptions });

      if (templatesValue) {
        return schemaBuilder.initialValueTemplates([
          S.initialValueTemplateItem(
            [schemaTypeValue, ...Object.keys(templatesValue)].join('-'),
            templatesValue,
          ),
        ]);
      }

      return schemaBuilder;
    });
};

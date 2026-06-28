import { MenuItemBuilder, MenuItemGroupBuilder } from 'sanity/structure';

import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';

import type { ListItemKeyParams } from '@/structure/listItems/listItems.types';
import type { RenderItems } from '@/structure/renderListItems/renderListItems.types';
import type { ListItemReturn, StructureToolParams } from '@/structure/types/common.types';

/**
 * Helper function type that renders a nested child list/pane menu structure.
 */
type GetChildren = <T extends StructureToolParams>(
  params: ListItemKeyParams<T>,
  renderItems: RenderItems<T>,
) => ListItemReturn;

/**
 * Renders a nested folder list item structure by mapping its children array recursively through the render function.
 *
 * @param params - Render context parameters containing mapping and list parameters.
 * @param renderItems - Resolver function for mapping nested arrays of child list items.
 * @returns The resolved Sanity Studio list item structure.
 */
export const getChildren: GetChildren = (params, renderItems) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const { childTitle, children, icon, menuItemGroups, menuItems, parentTitle, showIcons } =
    getComputedListItems({ listItem, context });

  const parentTitleValue = parentTitle();

  const { uniqueId, id } = generateId(parentTitleValue, params);

  return S.listItem()
    .title(parentTitleValue)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .child((_, childOptions) => {
      let schemaBuilder = S.list()
        .title(childTitle({ childOptions }))
        .showIcons(showIcons({ childOptions }))
        .items(
          renderItems({
            id: uniqueId,
            listItems: children({ childOptions }),
          }).filter((item) => item !== null),
        );

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

import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getContextValues } from '@/helpers/getContextValues';
import { getTitle } from '@/helpers/getTitle';
import { getValidListItem } from '@/helpers/getValidListItem';

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
  const { icon, children: listItemChildren } = listItem;

  const contextValues = getContextValues(context);

  const { title, showIcons, menuItemGroups, menuItems } = getComputedListItems({
    listItem,
    context,
  });

  const { parentTitle, childTitle } = getTitle(title, context);
  const { uniqueId, id } = generateId(parentTitle, params);

  return S.listItem()
    .title(parentTitle)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .child((_, childOptions) => {
      const children = getValidListItem(listItemChildren, { ...contextValues, childOptions }) ?? [];

      let schemaBuilder = S.list()
        .title(childTitle)
        .showIcons(showIcons)
        .items(
          renderItems({
            id: uniqueId,
            listItems: children,
          }).filter((item) => item !== null),
        );

      if (menuItemGroups) {
        schemaBuilder = schemaBuilder.menuItemGroups(menuItemGroups);
      }

      if (menuItems) {
        schemaBuilder = schemaBuilder.menuItems(menuItems);
      }

      return schemaBuilder;
    });
};

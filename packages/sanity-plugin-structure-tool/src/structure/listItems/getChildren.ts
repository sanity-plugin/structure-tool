import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { ListItemKeyParams } from '@/structure/listItems/listItems.types';
import type { RenderItems } from '@/structure/renderListItems/renderListItems.types';
import type { ListItemReturn, StructureToolParams } from '@/structure/types/common.types';

type GetChildren = <T extends StructureToolParams>(
  params: ListItemKeyParams<T>,
  renderItems: RenderItems<T>,
) => ListItemReturn;

export const getChildren: GetChildren = (params, renderItems) => {
  const { listItemsParams, mappingParams } = params;
  const { S, context } = listItemsParams;
  const { listItem } = mappingParams;
  const { icon, children: listItemChildren } = listItem;

  const contextValues = getContextValues(context);

  const {
    title = '',
    showIcons,
    menuItemGroups = [],
    menuItems,
  } = getComputedListItems({ listItem, context });

  const { uniqueId, id } = generateId(title, params);

  return S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .child((_, childOptions) => {
      const children = getValidListItem(listItemChildren, { ...contextValues, childOptions }) ?? [];

      return S.list()
        .title(title)
        .showIcons(showIcons)
        .menuItemGroups(menuItemGroups)
        .menuItems(menuItems)
        .items(
          renderItems({
            id: uniqueId,
            listItems: children,
          }).filter((item) => item !== null),
        );
    });
};

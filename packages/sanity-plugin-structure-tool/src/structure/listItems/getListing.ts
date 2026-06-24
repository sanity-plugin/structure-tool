import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getDisplayTitle } from '@/helpers/getDisplayTitle';

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
  const { icon } = listItem;

  const {
    schemaType = '',
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

  const { parentTitle, childTitle } = getDisplayTitle({ ...listItemsParams, listItem });
  const { id } = generateId(parentTitle, params);

  return S.listItem()
    .title(parentTitle)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .schemaType(schemaType)
    .child(() => {
      let schemaBuilder = S.documentTypeList(schemaType)
        .title(childTitle)
        .id(id)
        .filter(['_type == $schemaType', ...(filter ? [filter] : [])].join(' && '))
        .params({
          schemaType,
          ...filterParams,
        })
        .showIcons(showIcons);

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

      if (menuItemGroups) {
        schemaBuilder = schemaBuilder.menuItemGroups(menuItemGroups);
      }

      if (menuItems) {
        schemaBuilder = schemaBuilder.menuItems(menuItems);
      }

      if (hideAddButton) {
        return schemaBuilder.initialValueTemplates([]);
      }

      if (templates) {
        return schemaBuilder.initialValueTemplates([
          S.initialValueTemplateItem([schemaType, ...Object.keys(templates)].join('-'), templates),
        ]);
      }

      return schemaBuilder;
    });
};

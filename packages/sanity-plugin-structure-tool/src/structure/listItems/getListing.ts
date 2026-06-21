import { generateId } from '@/helpers/generateId';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getDisplayTitle } from '@/helpers/getDisplayTitle';

import type { ListItemKey } from '@/structure/listItems/listItems.types';

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
    menuItemGroups = [],
    menuItems,
    hideAddButton,
    templates,
  } = getComputedListItems({ listItem, context });

  const displayTitle = getDisplayTitle({ ...listItemsParams, listItem });
  const { id } = generateId(displayTitle, params);

  return S.listItem()
    .title(displayTitle)
    .id(id)
    .icon(icon)
    .showIcon(icon !== false)
    .schemaType(schemaType)
    .child(() => {
      let schemaBuilder = S.documentTypeList(schemaType)
        .title(displayTitle)
        .id(id)
        .filter(['_type == $schemaType', ...(filter ? [filter] : [])].join(' && '))
        .params({
          schemaType,
          ...filterParams,
        })
        .showIcons(showIcons)
        .menuItemGroups(menuItemGroups)
        .menuItems(menuItems);

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

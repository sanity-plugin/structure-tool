import { constants } from '@/constants';

import type { RenderListItem } from '@/structure/renderListItem/renderListItem.types';

export const renderListItem: RenderListItem = (S, context, listItem) => {
  const { currentUser } = context;

  const {
    id,
    schemaType,
    children,
    raw,
    singleton,
    templates,
    displayTitle,
    filters = [],
    filterParams = {},
    icon = '',
    hideAddButton = false,
    isDivider = false,
  } = listItem;

  if (raw) return raw(S, context);

  const roleFilter = typeof filters === 'function' ? filters({ currentUser }) : filters;

  if (isDivider) return S.divider().title(displayTitle);

  // Handle folders (items with children)
  if (children && children.length > 0) {
    return S.listItem()
      .title(displayTitle)
      .id(id)
      .icon(icon)
      .child(
        S.list()
          .title(displayTitle)
          .items(
            children
              .map((child) => renderListItem(S, context, child))
              .filter((child) => child !== null),
          ),
      );
  }

  if (!schemaType && filters.length > 0) {
    return S.listItem()
      .title(displayTitle)
      .id(id)
      .icon(icon)
      .child(
        S.documentList()
          .title(displayTitle)
          .filter([...(roleFilter ?? [])].join(' && '))
          .params({ ...filterParams })
          .menuItems([])
          .initialValueTemplates([]),
      );
  }

  if (!schemaType) return null;

  // Handle Document Types
  return S.listItem()
    .title(displayTitle)
    .id(id)
    .icon(icon)
    .schemaType(schemaType)
    .child(
      (() => {
        if (singleton) {
          const schemaBuilder = S.editor()
            .id([schemaType, constants.SINGLETON_KEY].join('-'))
            .schemaType(schemaType);

          if (templates) {
            return schemaBuilder.initialValueTemplate(
              [schemaType, ...Object.keys(templates)].join('-'),
              templates,
            );
          }

          return schemaBuilder;
        }

        const schemaBuilder = S.documentTypeList(schemaType)
          .title(displayTitle)
          .id(id)
          .filter(['_type == $schemaType', ...(roleFilter ?? [])].join(' && '))
          .params({
            schemaType,
            ...filterParams,
          });

        if (hideAddButton) {
          return schemaBuilder.menuItems([]).initialValueTemplates([]);
        }

        if (templates) {
          return schemaBuilder.initialValueTemplates([
            S.initialValueTemplateItem(
              [schemaType, ...Object.keys(templates)].join('-'),
              templates,
            ),
          ]);
        }

        return schemaBuilder;
      })(),
    );
};

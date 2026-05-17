import { constants } from '@/constants';

import type { RenderListItem } from '@/structure/renderListItem/renderListItem.types';

export const renderListItem: RenderListItem = (S, context, listItem) => {
  const { currentUser } = context;

  const {
    schemaType,
    icon,
    raw,
    singleton,
    filter,
    filterParams,
    hideAddButton,
    isDivider,
    templates,
    apiVersion,
    id,
    displayTitle,
    children,
  } = listItem;

  if (raw) return raw(S, context);

  const roleFilter = typeof filter === 'function' ? filter({ currentUser }) : (filter ?? '');
  const roleFilterParams =
    typeof filterParams === 'function' ? filterParams({ currentUser }) : (filterParams ?? {});

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

  if (!schemaType && filter) {
    return S.listItem()
      .title(displayTitle)
      .id(id)
      .icon(icon)
      .child(() => {
        let schemaBuilder = S.documentList()
          .title(displayTitle)
          .menuItems([])
          .initialValueTemplates([]);

        if (roleFilter || roleFilterParams) {
          schemaBuilder = schemaBuilder
            // eslint-disable-next-line unicorn/no-array-callback-reference
            .filter(roleFilter)
            .params(roleFilterParams);
        }

        if (apiVersion) {
          schemaBuilder = schemaBuilder.apiVersion(apiVersion);
        }

        return schemaBuilder;
      });
  }

  if (!schemaType) return null;

  // Handle Document Types
  return S.listItem()
    .title(displayTitle)
    .id(id)
    .icon(icon)
    .schemaType(schemaType)
    .child(() => {
      if (singleton) {
        let schemaBuilder = S.editor()
          .id([schemaType, constants.SINGLETON_KEY].join('-'))
          .schemaType(schemaType);

        if (templates) {
          schemaBuilder = schemaBuilder.initialValueTemplate(
            [schemaType, ...Object.keys(templates)].join('-'),
            templates,
          );
        }

        return schemaBuilder;
      }

      let schemaBuilder = S.documentTypeList(schemaType)
        .title(displayTitle)
        .id(id)
        .filter(['_type == $schemaType', ...(roleFilter ? [roleFilter] : [])].join(' && '))
        .params({
          schemaType,
          ...roleFilterParams,
        });

      if (apiVersion) {
        schemaBuilder = schemaBuilder.apiVersion(apiVersion);
      }

      if (hideAddButton) {
        return schemaBuilder.menuItems([]).initialValueTemplates([]);
      }

      if (templates) {
        return schemaBuilder.initialValueTemplates([
          S.initialValueTemplateItem([schemaType, ...Object.keys(templates)].join('-'), templates),
        ]);
      }

      return schemaBuilder;
    });
};

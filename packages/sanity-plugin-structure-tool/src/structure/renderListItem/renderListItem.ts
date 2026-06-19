import { constants } from '@/constants';

import type { RenderItem, RenderListItem } from '@/structure/renderListItem/renderListItem.types';

export const renderListItem: RenderListItem = (params) => {
  const { S, context, listItem } = params;

  const renderItem: RenderItem = (item) => {
    const {
      schemaType,
      icon,
      singleton,
      component,
      children,
      apiVersion,
      filter,
      filterParams,
      hideAddButton,
      templates,
      raw,
      isDivider,
      id,
      displayTitle,
    } = item;

    if (raw) return raw(S, context);

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
            .items(children.map((child) => renderItem(child)).filter((child) => child !== null)),
        );
    }

    if (component) {
      return S.listItem()
        .title(displayTitle)
        .id(id)
        .icon(icon)
        .child(S.component(component).id(id));
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

          if (filter || filterParams) {
            schemaBuilder = schemaBuilder
              // eslint-disable-next-line unicorn/no-array-callback-reference
              .filter(filter)
              .params({ ...filterParams });
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
          .filter(['_type == $schemaType', ...(filter ? [filter] : [])].join(' && '))
          .params({
            schemaType,
            ...filterParams,
          });

        if (apiVersion) {
          schemaBuilder = schemaBuilder.apiVersion(apiVersion);
        }

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
      });
  };

  return renderItem(listItem);
};

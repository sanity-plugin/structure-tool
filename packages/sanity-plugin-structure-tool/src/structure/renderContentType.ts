import { constants } from '../constants/objects';

import type { RenderContentType } from './@types/common.types';

const renderContentType: RenderContentType = (S, contentType) => {
  const {
    id,
    schemaType,
    children,
    singleton,
    filter = [],
    filterParams = {},
    title = '',
    icon = '',
    isDivider = false,
  } = contentType;

  if (isDivider) return S.divider().title(title);

  // Handle folders (items with children)
  if (children && children.length > 0) {
    return S.listItem()
      .title(title)
      .id(id)
      .icon(icon)
      .child(
        S.list()
          .title(title)
          .items(
            children.map((child) => renderContentType(S, child)).filter((child) => child !== null),
          ),
      );
  }

  if (!schemaType) return null;

  // Handle Document Types
  return S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .schemaType(schemaType)
    .child(
      (() => {
        if (singleton) {
          return S.editor().id([schemaType, constants.SINGLETON].join('-')).schemaType(schemaType);
        }

        return S.documentTypeList(schemaType)
          .id(id)
          .title(title)
          .filter(['_type == $schemaType', ...(filter ?? [])].join(' && '))
          .params({ schemaType, ...filterParams });
      })(),
    );
};

export default renderContentType;

import type { ContentTypes } from '@/structure/types/contentTypes.types';

type GetAllContentTypes = (rootContentTypes: ContentTypes[]) => ContentTypes[];

type GetContentTypes = (cts: ContentTypes[]) => void;

export const getAllContentTypes: GetAllContentTypes = (rootContentTypes) => {
  const schemaTypes = [] as ContentTypes[];

  const getContentTypes: GetContentTypes = (cts) => {
    for (const contentType of cts) {
      if (contentType?.schemaType) {
        schemaTypes.push(contentType);
      }

      if (contentType?.children?.length) {
        getContentTypes(contentType.children);
      }
    }
  };

  getContentTypes(rootContentTypes);

  return schemaTypes;
};

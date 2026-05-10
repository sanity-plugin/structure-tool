import type { GetContentTypes } from './@types/common.types';

export const getContentTypes: GetContentTypes = (types, id) =>
  types.reduce<ReturnType<GetContentTypes>>((acc, contentType, index) => {
    const { children } = contentType;

    const contentTypeObj = {
      ...contentType,
      id: [...id.split('.'), index + 1].join('.'),
    };

    if (children && children.length > 0) {
      acc.push({
        ...contentTypeObj,
        children: getContentTypes(children, contentTypeObj.id),
      });

      return acc;
    }

    acc.push({ ...contentTypeObj, children: [] });

    return acc;
  }, []);

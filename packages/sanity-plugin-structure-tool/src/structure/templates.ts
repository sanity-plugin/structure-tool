import type { TemplateResolver } from 'sanity';

import type { ContentTypes } from '@/structure/types/contentTypes.types';

type Templates = (allContentTypes: ContentTypes[]) => TemplateResolver;

export const templates: Templates = (allContentTypes) => (prev) => {
  const templatesContentTypes = allContentTypes
    .map((item) => {
      const { schemaType, templates: template } = item;

      if (template && schemaType) {
        return {
          id: [schemaType, ...Object.keys(template)].join('-'),
          title: [schemaType, ...Object.keys(template)].join(' '),
          schemaType,
          parameters: Object.entries(template).map((val) => {
            const [key, value] = val;

            return {
              name: key,
              type: typeof value,
            };
          }),
          value: (params: unknown) => params,
        };
      }

      return null;
    })
    .filter((item) => item !== null);

  return [...prev, ...templatesContentTypes];
};

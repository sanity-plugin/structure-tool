import type { TemplateResolver } from 'sanity';

import type { ListItem } from '@/structure/types/listItem.types';

type Templates = (flatListItems: ListItem[]) => TemplateResolver;

export const templates: Templates = (flatListItems) => (prev) => {
  const templatesItems = flatListItems
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

  return [...prev, ...templatesItems];
};

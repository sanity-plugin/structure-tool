import { getTemplateListItems } from '@/helpers/getTemplateListItems';

import type { Templates } from '@/structure/templates/templates.types';

/**
 * Initial value templates resolver function that hooks into Sanity's schema template resolution protocol.
 * Generates custom initial value templates dynamically from filter/singleton definitions.
 *
 * @template T - The structure tool configuration parameters schema.
 * @param params - The template resolution parameters containing list items.
 * @returns A standard Sanity `TemplateResolver` function.
 */
export const templates: Templates = (params) => (prev, context) => {
  const { listItems } = params;

  const flatListItems = getTemplateListItems(listItems, context);

  const templatesItems = flatListItems.map((item) => {
    const { schemaType, templates: templatesValue } = item;

    return {
      id: [schemaType, JSON.stringify(templatesValue)].join('-'),
      title: [schemaType, ...Object.keys(templatesValue)].join(' '),
      schemaType,
      parameters: Object.entries(templatesValue).map((val) => {
        const [key, value] = val;

        return {
          name: key,
          type: typeof value,
        };
      }),
      value: (input: unknown) => input,
    };
  });

  return [...prev, ...templatesItems];
};

import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getFlatListItems } from '@/helpers/getFlatListItems';

import type { TemplateResolver } from 'sanity';
import type { ChildResolverOptions } from 'sanity/structure';

import type { TemplatesParams } from '@/structure/templates/templates.types';
import type { StructureToolParams } from '@/structure/types/common.types';

/**
 * Initial value templates resolver function that hooks into Sanity's schema template resolution protocol.
 * Generates custom initial value templates dynamically from filter/singleton definitions.
 *
 * @template T - The structure tool configuration parameters schema.
 * @param params - The template resolution parameters containing list items.
 * @returns A standard Sanity `TemplateResolver` function.
 */
export const templates =
  <T extends StructureToolParams>(params: TemplatesParams<T>): TemplateResolver =>
  (prev, context) => {
    const { listItems } = params;

    const flatListItems = getFlatListItems<T>(listItems, context);

    const templatesItems = flatListItems
      .map((item) => {
        const { schemaType, templates: templatesFn } = getComputedListItems({
          listItem: item,
          context,
        });

        const schemaTypeValue = schemaType();
        const templatesValue = templatesFn({ childOptions: {} as ChildResolverOptions });

        if (templatesValue && schemaTypeValue) {
          return {
            id: [schemaTypeValue, ...Object.keys(templatesValue)].join('-'),
            title: [schemaTypeValue, ...Object.keys(templatesValue)].join(' '),
            schemaType: schemaTypeValue,
            parameters: Object.entries(templatesValue).map((val) => {
              const [key, value] = val;

              return {
                name: key,
                type: typeof value,
              };
            }),
            value: (input: unknown) => input,
          };
        }

        return null;
      })
      .filter((item) => item !== null);

    return [...prev, ...templatesItems];
  };

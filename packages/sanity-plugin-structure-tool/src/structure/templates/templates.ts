import { getContextValues } from '@/helpers/getContextValues';
import { getFlatListItems } from '@/helpers/getFlatListItems';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { TemplateResolver } from 'sanity';

import type { TemplatesParams } from '@/structure/templates/templates.types';
import type { StructureToolParams } from '@/structure/types/common.types';

export const templates =
  <T extends StructureToolParams>(params: TemplatesParams<T>): TemplateResolver =>
  (prev, context) => {
    const { listItems } = params;

    const contextValues = getContextValues(context);
    const flatListItems = getFlatListItems<T>(listItems, context);

    const templatesItems = flatListItems
      .map((item) => {
        const { schemaType: schemaTypeFn, templates: templateFn } = item;

        const schemaType = getValidListItem(schemaTypeFn, contextValues);
        const template = getValidListItem(templateFn, contextValues);

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
            value: (input: unknown) => input,
          };
        }

        return null;
      })
      .filter((item) => item !== null);

    return [...prev, ...templatesItems];
  };

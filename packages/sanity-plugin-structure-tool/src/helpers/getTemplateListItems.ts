import { getComputedListItems } from '@/helpers/getComputedListItems';

import type { ConfigContext } from 'sanity';
import type { ChildResolverOptions } from 'sanity/structure';

import type { GetListItemOriginalType, StructureToolParams } from '@/structure/types/common.types';
import type { ListItem, ListItemCore } from '@/structure/types/listItem.types';

/**
 * Output structure containing schema type and initial value templates config.
 *
 * @template T - The structure tool configuration parameters schema.
 */
interface GetTemplateListItemsOutput<T extends StructureToolParams> {
  /**
   * The schema type name string.
   */
  schemaType: NonNullable<GetListItemOriginalType<ListItemCore<T>['schemaType']>>;
  /**
   * Initial value templates parameters configuration.
   */
  templates: NonNullable<GetListItemOriginalType<ListItemCore<T>['templates']>>;
}

/**
 * Traverses a nested array of list items and extracts all items that have both a schema type and initial value templates configured.
 *
 * @template T - The structure tool configuration parameters schema.
 * @param listItems - Nested configuration items tree.
 * @param context - ConfigContext instance.
 * @returns Array of resolved schemaType and templates configurations.
 */
export const getTemplateListItems = <T extends StructureToolParams>(
  listItems: ListItem<T>[],
  context: ConfigContext,
): GetTemplateListItemsOutput<T>[] => {
  const schemaTypes = [] as GetTemplateListItemsOutput<T>[];

  /**
   * Recursively traverses child items to extract templates configs.
   *
   * @param items - Child items collection.
   */
  const getListItems = (items: ListItem<T>[]): void => {
    for (const item of items) {
      const { schemaType, templates, children } = getComputedListItems({
        listItem: item,
        context,
      });

      const schemaTypeValue = schemaType();

      const templatesValue = (() => {
        try {
          return templates({ childOptions: {} as ChildResolverOptions });
        } catch (error) {
          console.warn('[Plugin Error]', error);
          // eslint-disable-next-line unicorn/no-useless-undefined
          return undefined;
        }
      })();

      const childrenValue = (() => {
        try {
          return children({ childOptions: {} as ChildResolverOptions });
        } catch (error) {
          console.warn('[Plugin Error]', error);
          // eslint-disable-next-line unicorn/no-useless-undefined
          return undefined;
        }
      })();

      if (schemaTypeValue && templatesValue) {
        schemaTypes.push({ schemaType: schemaTypeValue, templates: templatesValue });
      }

      if (childrenValue?.length) {
        getListItems(childrenValue);
      }
    }
  };

  getListItems(listItems);

  return schemaTypes;
};

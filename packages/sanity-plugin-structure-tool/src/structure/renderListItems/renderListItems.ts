import { constants } from '@/constants';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { getChildren } from '@/structure/listItems/getChildren';
import { getComponent } from '@/structure/listItems/getComponent';
import { getDivider } from '@/structure/listItems/getDivider';
import { getFilters } from '@/structure/listItems/getFilters';
import { getListing } from '@/structure/listItems/getListing';
import { getRaw } from '@/structure/listItems/getRaw';
import { getSingleton } from '@/structure/listItems/getSingleton';

import type { ListItemKeyParams } from '@/structure/listItems/listItems.types';
import type {
  RenderItems,
  RenderListItemsOutput,
  RenderListItemsParams,
} from '@/structure/renderListItems/renderListItems.types';
import type { StructureToolParams } from '@/structure/types/common.types';

export const renderListItems = <T extends StructureToolParams>(
  parentParams: RenderListItemsParams<T>,
): RenderListItemsOutput => {
  const { context, listItems: globalLineItems } = parentParams;

  const renderItems: RenderItems<T> = (childParams) => {
    const { listItems } = childParams;

    return listItems.map((listItem, index) => {
      const params = {
        listItemsParams: parentParams,
        itemsParams: childParams,
        mappingParams: {
          listItem,
          index,
        },
      } satisfies ListItemKeyParams<T>;

      const { children, component, raw } = listItem;

      const { schemaType, singleton, filter, isDivider } = getComputedListItems({
        listItem,
        context,
      });

      // Handle Raw
      if (raw) return getRaw(params);

      // Handle Divider
      if (isDivider) return getDivider(params);

      // Handle folders (items with children)
      if (children && children.length > 0) return getChildren(params, renderItems);

      // Handle Component
      if (component) return getComponent(params);

      // Handle Filters
      if (!schemaType && filter) return getFilters(params);

      // Handle Singleton
      if (singleton && schemaType) return getSingleton(params);

      // Handle Listing
      if (schemaType) return getListing(params);

      return null;
    });
  };

  return renderItems({ id: constants.UNIQUE_ID_FIRST_VALUE, listItems: globalLineItems }).filter(
    (item) => item !== null,
  );
};

import { constants } from '@/constants';
import { getComputedListItems } from '@/helpers/getComputedListItems';
import { hasRolesAccess } from '@/helpers/hasRolesAccess';
import { hasWorkspacesAccess } from '@/helpers/hasWorkspacesAccess';
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

/**
 * Resolves and renders the primary structure array of list items.
 * Evaluates role-based and workspace-based access, and matches each item to its corresponding renderer function.
 *
 * @template T - The structure tool configuration parameters schema.
 * @param parentParams - Render context parameters containing structure lists and plugin params.
 * @returns An array of resolved structure list items.
 */
export const renderListItems = <T extends StructureToolParams>(
  parentParams: RenderListItemsParams<T>,
): RenderListItemsOutput => {
  const { context, listItems: globalLineItems } = parentParams;

  /**
   * Internal recursive function that processes each list item, checks permissions,
   * and delegates rendering to list item mapping renderers.
   *
   * @param childParams - Nested child items mapping parameter values.
   * @returns Array of fully-built structure nodes.
   */
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

      const {
        schemaType,
        singleton,
        filter,
        isDivider,
        isVisible = true,
      } = getComputedListItems({
        listItem,
        context,
      });

      // Check Access
      if (!(hasWorkspacesAccess(params) && hasRolesAccess(params)) || !isVisible) return null;

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

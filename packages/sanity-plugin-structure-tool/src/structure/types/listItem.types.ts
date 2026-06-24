import type { ComponentType, ReactNode } from 'react';
import type { PreviewLayoutKey } from 'sanity';
import type {
  ChildResolverOptions,
  MenuItem,
  MenuItemGroup,
  UserComponent,
} from 'sanity/structure';

import type {
  StructureToolGenericParam,
  StructureToolParams,
} from '@/structure/types/common.types';
import type {
  ListItemDefaultOrdering,
  ListItemId,
  ListItemRaw,
  ListItemTitle,
  WorkspacesAndRolesListItem,
} from '@/structure/types/listItemDefinitions.types';
import type { IconComponent, SimpleMerge } from '@/types/lib.types';

/**
 * Core configuration properties for a structural list item in Sanity Studio.
 * Defines presentation, query filtering, and behavior rules.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface ListItemCore<T extends StructureToolParams> {
  /**
   * The unique identifier for this list item. Can be a static string or a dynamic callback function.
   */
  id?: StructureToolGenericParam<T, string, ListItemId>;
  /**
   * The display title of the item. Can be a static string, a dynamic callback function, or a parent/child titles configuration object.
   */
  title?: StructureToolGenericParam<T, string | ListItemTitle<T>>;
  /**
   * The schema document type associated with this list item.
   */
  schemaType?: StructureToolGenericParam<T, string>;
  /**
   * An optional icon component to render alongside the item. Set to false to hide.
   */
  icon?: IconComponent | ComponentType | ReactNode | false;
  /**
   * Controls whether child document icons are displayed in the list view.
   */
  showIcons?: StructureToolGenericParam<T, boolean>;
  /**
   * If true, treats the item as a single document instance rather than a list of documents.
   */
  singleton?: StructureToolGenericParam<T, boolean>;
  /**
   * Custom React component to render instead of the standard document list.
   */
  component?: UserComponent;
  /**
   * Options to pass to the custom React component.
   */
  componentOptions?: StructureToolGenericParam<T, Record<string, unknown>>;
  /**
   * The Sanity API version used for queries in this list.
   */
  apiVersion?: StructureToolGenericParam<T, string>;
  /**
   * GROQ filter to apply to the document list.
   */
  filter?: StructureToolGenericParam<T, string>;
  /**
   * Parameters passed to the GROQ filter.
   */
  filterParams?: StructureToolGenericParam<T, Record<string, unknown>>;
  /**
   * The default sort ordering of items in the list.
   */
  defaultOrdering?: StructureToolGenericParam<T, ListItemDefaultOrdering>;
  /**
   * Default layout style for document previews (e.g. card, detail, media, default).
   */
  defaultLayout?: StructureToolGenericParam<T, PreviewLayoutKey>;
  /**
   * Groupings of menu actions.
   */
  menuItemGroups?: StructureToolGenericParam<T, MenuItemGroup[]>;
  /**
   * Action items shown in the pane header menu.
   */
  menuItems?: StructureToolGenericParam<T, MenuItem[]>;
  /**
   * If true, hides the "Add document" action in the pane header.
   */
  hideAddButton?: StructureToolGenericParam<T, boolean>;
  /**
   * Initial value template options and overrides.
   */
  templates?: StructureToolGenericParam<T, Record<string, unknown>>;
  /**
   * A raw renderer function to bypass the declarative builder and construct the list item imperatively.
   */
  raw?: ListItemRaw;
  /**
   * If true, this item renders as a visual separator line in the menu.
   */
  isDivider?: StructureToolGenericParam<T, boolean>;
  /**
   * Optional helper indicating if the title should automatically be pluralized.
   */
  isPlural?: StructureToolGenericParam<T, boolean>;
}

/**
 * Represents a complete structure list item.
 * Combines core properties, role/workspace filters, and nested child structure.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export type ListItem<T extends StructureToolParams> = SimpleMerge<
  [
    ListItemCore<T>,
    WorkspacesAndRolesListItem<T>,
    {
      /**
       * Nested child list items. Can be an array or a dynamic callback function returning list items.
       */
      children?: StructureToolGenericParam<
        T,
        ListItem<T>[],
        {
          childOptions: ChildResolverOptions;
        }
      >;
    },
  ]
>;

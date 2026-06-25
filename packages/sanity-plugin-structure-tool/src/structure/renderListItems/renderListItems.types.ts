import type { PluginParams } from '@/structure/structureToolPlugin/structureToolPlugin.types';
import type {
  ListItemReturn,
  StructureCommonParams,
  StructureToolParams,
} from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

// Main

/**
 * Input parameters for the list items rendering function.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface RenderListItemsParams<
  T extends StructureToolParams,
> extends StructureCommonParams<T> {
  /**
   * The list items defining the content structure hierarchy.
   */
  listItems: ListItem<T>[];
  /**
   * Configuration options for roles and workspaces.
   */
  pluginParams: PluginParams<T>;
}

/**
 * Expected output structure of the rendering pipeline.
 * Returns an array of successfully resolved/rendered list items.
 */
export type RenderListItemsOutput = NonNullable<ListItemReturn>[];

// Child

/**
 * Parameters for rendering children and sub-items.
 *
 * @template T - The structure tool configuration parameters schema.
 */
export interface RenderItemsParams<T extends StructureToolParams> {
  /**
   * The current unique identifier for this render instance.
   */
  id: string;
  /**
   * The array of nested/child list items.
   */
  listItems: ListItem<T>[];
}

/**
 * Rendering function type responsible for resolving nested/child list items.
 */
export type RenderItems<T extends StructureToolParams> = (
  params: RenderItemsParams<T>,
) => ListItemReturn[];

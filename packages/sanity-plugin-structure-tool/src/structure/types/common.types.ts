import type { Plugin, TemplateResolver } from 'sanity';
import type {
  StructureBuilder,
  StructureResolver,
  StructureResolverContext,
} from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { ListItem, ListItemExtended, ListItemRaw } from '@/structure/types/listItem.types';

// Render content type

export type RenderListItem = (
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
  listItem: ListItemExtended,
) => ReturnType<ListItemRaw>;

// Structure

export type Structure = (params: StructureToolPluginParams) => StructureResolver;

// Structure Tool

export interface StructureToolPluginParams {
  title: string;
  emptyListTitle?: string;
  listItems: ListItem[];
  roles?: string[];
  defaultRoles?: string[];
}

export type StructureToolItemParams = Omit<StructureToolPluginParams, 'title' | 'emptyListTitle'>;

interface StructureToolPluginOutput {
  structure: Plugin;
  templates: TemplateResolver;
}

export type StructureToolPlugin = (params: StructureToolPluginParams) => StructureToolPluginOutput;

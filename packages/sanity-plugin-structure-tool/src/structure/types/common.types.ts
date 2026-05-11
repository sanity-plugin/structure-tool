import type { Plugin, TemplateResolver } from 'sanity';
import type {
  StructureBuilder,
  StructureResolver,
  StructureResolverContext,
} from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type {
  ContentTypeRaw,
  ContentTypes,
  ContentTypesExtended,
} from '@/structure/types/contentTypes.types';

// Render content type

export type RenderContentType = (
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
  contentType: ContentTypesExtended,
) => ReturnType<ContentTypeRaw>;

// Structure

export type Structure = (contentTypes: ContentTypes[]) => StructureResolver;

// Structure Tool

interface StructureToolPluginParams {
  contentTypes: ContentTypes[];
}

interface StructureToolPluginOutput {
  structure: Plugin;
  templates: TemplateResolver;
}

export type StructureToolPlugin = (params: StructureToolPluginParams) => StructureToolPluginOutput;

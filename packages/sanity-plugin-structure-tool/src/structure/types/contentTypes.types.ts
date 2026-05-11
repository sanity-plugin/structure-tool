import type { IconComponent } from '@sanity/icons';
import type { ComponentType, ReactNode } from 'react';
import type { CurrentUser } from 'sanity';
import type { ListBuilder, StructureBuilder, StructureResolverContext } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { UserRole, WorkspaceType } from '@/types/constants.types';

export type ContentTypeFilters = string[] | ((currentUser: CurrentUser) => string[]);

export type ContentTypeRaw = (
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
) => Parameters<ListBuilder['items']>[0][number] | null;

export interface ContentTypes {
  title?: string;
  schemaType?: string;
  icon?: IconComponent | ComponentType | ReactNode;
  roles: UserRole[];
  workspaces: WorkspaceType[];
  children?: ContentTypes[];
  raw?: ContentTypeRaw;
  singleton?: boolean;
  filters?: ContentTypeFilters;
  filterParams?: Record<string, unknown>;
  hideAddButton?: boolean;
  isDivider?: boolean;
  isPlural?: boolean;
  templates?: Record<string, unknown>;
}

export interface ContentTypesExtended extends ContentTypes {
  id: string;
  children: ContentTypesExtended[];
}

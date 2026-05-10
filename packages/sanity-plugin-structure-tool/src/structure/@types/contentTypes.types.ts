import type { IconComponent } from '@sanity/icons';
import type { ComponentType, ReactNode } from 'react';

export interface ContentTypes {
  title?: string;
  schemaType?: string;
  icon?: IconComponent | ComponentType | ReactNode;
  children?: ContentTypes[];
  singleton?: boolean;
  filter?: string[];
  filterParams?: Record<string, unknown>;
  hideAddButton?: boolean;
  isDivider?: boolean;
}

export interface ContentTypesExtended extends ContentTypes {
  id: string;
  children: ContentTypesExtended[];
}

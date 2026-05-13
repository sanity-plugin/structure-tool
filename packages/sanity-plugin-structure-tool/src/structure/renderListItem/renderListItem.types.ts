import type { StructureBuilder, StructureResolverContext } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { ListItemExtended, ListItemRaw } from '@/structure/types/listItem.types';

export type RenderListItem = <Roles extends readonly string[] | undefined>(
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
  listItem: ListItemExtended<Roles>,
) => ReturnType<ListItemRaw>;

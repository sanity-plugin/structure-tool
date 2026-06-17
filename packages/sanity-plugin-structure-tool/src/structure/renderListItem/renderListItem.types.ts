import type { StructureBuilder, StructureResolverContext } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemExtended, ListItemRaw } from '@/structure/types/listItem.types';

export type RenderListItem = <T extends StructureToolParams>(
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
  listItem: ListItemExtended<T>,
) => ReturnType<ListItemRaw>;

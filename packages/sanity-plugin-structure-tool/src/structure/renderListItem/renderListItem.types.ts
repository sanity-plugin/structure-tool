import type { StructureBuilder, StructureResolverContext } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { ListItemExtended, ListItemRaw } from '@/structure/types/listItem.types';

export type RenderListItem = <
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  S: StructureBuilder,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
  listItem: ListItemExtended<Workspaces, Roles, DefaultRoles>,
) => ReturnType<ListItemRaw>;

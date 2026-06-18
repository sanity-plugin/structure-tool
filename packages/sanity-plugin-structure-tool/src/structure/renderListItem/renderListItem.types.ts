import type { StructureBuilder } from 'sanity/structure';

import type {
  StructureToolParams,
  ValidSanityContext,
  Workspace,
} from '@/structure/types/common.types';
import type { ListItemExtended, ListItemRaw } from '@/structure/types/listItem.types';

export type RenderListItem = <T extends StructureToolParams>(
  S: StructureBuilder,
  workspace: Workspace<T>,
  context: ValidSanityContext,
  listItem: ListItemExtended<T>,
) => ReturnType<ListItemRaw>;

import { getListItems } from '@/helpers/getListItems';

import type { StructureBuilder, StructureResolverContext } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { StructureListItemsParams } from '@/structure/structure/structure.types';
import type { StructureToolParams, Workspace } from '@/structure/types/common.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';

export const getWorkspaceListItems = <T extends StructureToolParams>(
  S: StructureBuilder,
  workspace: Workspace<T>,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
  params: StructureListItemsParams<T>,
): ListItemExtended<T>[] => getListItems<T>(S, workspace, context, '1', params);

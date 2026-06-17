import { getListItems } from '@/helpers/getListItems';

import type { CurrentUser } from 'sanity';
import type { StructureBuilder } from 'sanity/structure';

import type { StructureListItemsParams } from '@/structure/structure/structure.types';
import type { StructureToolParams, Workspace } from '@/structure/types/common.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';

export const getWorkspaceListItems = <T extends StructureToolParams>(
  S: StructureBuilder,
  workspace: Workspace<T>,
  currentUser: CurrentUser,
  params: StructureListItemsParams<T>,
): ListItemExtended<T>[] => getListItems<T>(S, workspace, currentUser, '1', params);

import { getListItems } from '@/helpers/getListItems';

import type { CurrentUser } from 'sanity';

import type { StructureToolItemParams } from '@/structure/types/common.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';
import type { WorkspaceType } from '@/types/constants.types';

export type GetWorkspaceListItems = (
  workspace: WorkspaceType,
  currentUser: CurrentUser,
  params: StructureToolItemParams,
) => ListItemExtended[];

export const getWorkspaceListItems: GetWorkspaceListItems = (workspace, currentUser, params) =>
  getListItems(workspace, currentUser, '1', params);

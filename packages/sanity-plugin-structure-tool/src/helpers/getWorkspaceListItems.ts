import { getListItems } from '@/helpers/getListItems';

import type { CurrentUser } from 'sanity';

import type { StructureListItemsParams } from '@/structure/structure/structure.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';
import type { WorkspaceType } from '@/types/constants.types';

export const getWorkspaceListItems = <Roles extends string[], DefaultRoles extends string[]>(
  workspace: WorkspaceType,
  currentUser: CurrentUser,
  params: StructureListItemsParams<Roles, DefaultRoles>,
): ListItemExtended<Roles>[] =>
  getListItems<Roles, DefaultRoles>(workspace, currentUser, '1', params);

import { getListItems } from '@/helpers/getListItems';

import type { CurrentUser } from 'sanity';

import type { StructureToolItemParams } from '@/structure/types/common.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';
import type { WorkspaceType } from '@/types/constants.types';

export const getWorkspaceListItems = <Roles extends string[], DefaultRoles extends string[]>(
  workspace: WorkspaceType,
  currentUser: CurrentUser,
  params: StructureToolItemParams<Roles, DefaultRoles>,
): ListItemExtended<Roles>[] =>
  getListItems<Roles, DefaultRoles>(workspace, currentUser, '1', params);

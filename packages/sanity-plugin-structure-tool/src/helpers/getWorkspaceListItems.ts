import { getListItems } from '@/helpers/getListItems';

import type { CurrentUser } from 'sanity';

import type { StructureListItemsParams } from '@/structure/structure/structure.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';

export const getWorkspaceListItems = <
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  workspace: Workspaces extends string[] ? Workspaces[number] : string,
  currentUser: CurrentUser,
  params: StructureListItemsParams<Workspaces, Roles, DefaultRoles>,
): ListItemExtended<Workspaces, Roles, DefaultRoles>[] =>
  getListItems<Workspaces, Roles, DefaultRoles>(workspace, currentUser, '1', params);

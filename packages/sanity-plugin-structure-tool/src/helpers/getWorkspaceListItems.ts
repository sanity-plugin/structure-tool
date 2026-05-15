import { getListItems } from '@/helpers/getListItems';

import type { CurrentUser } from 'sanity';
import type { StructureBuilder } from 'sanity/structure';

import type { StructureListItemsParams } from '@/structure/structure/structure.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';

export const getWorkspaceListItems = <
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  S: StructureBuilder,
  workspace: Workspaces extends string[] ? Workspaces[number] : string,
  currentUser: CurrentUser,
  params: StructureListItemsParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
): ListItemExtended<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[] =>
  getListItems<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>(
    S,
    workspace,
    currentUser,
    '1',
    params,
  );

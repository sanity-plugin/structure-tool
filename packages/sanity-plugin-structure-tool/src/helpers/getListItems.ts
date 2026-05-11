import { getRolesWithDefaults } from '@/helpers/getRolesWithDefaults';
import { getUserRoles } from '@/structure/userRoles';

import type { CurrentUser } from 'sanity';

import type { StructureToolItemParams } from '@/structure/types/common.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';
import type { WorkspaceType } from '@/types/constants.types';

export type GetListItems = (
  workspace: WorkspaceType,
  currentUser: CurrentUser,
  id: string,
  params: StructureToolItemParams,
) => ListItemExtended[];

export const getListItems: GetListItems = (workspace, currentUser, id, params) => {
  const { listItems, defaultRoles } = params;

  return listItems.reduce<ReturnType<GetListItems>>((acc, listItem, index) => {
    const { workspaces, roles, children } = listItem;

    const listItemObj = {
      ...listItem,
      id: [...id.split('.'), index + 1].join('.'),
    };

    const userHasAccess = getUserRoles({ currentUser }).some((role) =>
      getRolesWithDefaults(defaultRoles, roles).includes(role),
    );

    if (!userHasAccess) return acc;

    if (children && children.length > 0) {
      if ((workspaces as string[]).includes(workspace)) {
        acc.push({
          ...listItemObj,
          children: getListItems(workspace, currentUser, listItemObj.id, {
            ...params,
            listItems: children,
          }),
        });
      }

      return acc;
    }

    if ((workspaces as string[]).includes(workspace)) {
      acc.push({ ...listItemObj, children: [] });
    }

    return acc;
  }, []);
};

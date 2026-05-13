import { getCurrentUserRoles } from '@/helpers/getCurrentUserRoles';
import { getRolesWithDefaults } from '@/helpers/getRolesWithDefaults';

import type { CurrentUser } from 'sanity';

import type { StructureListItemsParams } from '@/structure/structure/structure.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';
import type { WorkspaceType } from '@/types/constants.types';

export const getListItems = <
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  workspace: WorkspaceType,
  currentUser: CurrentUser,
  id: string,
  params: StructureListItemsParams<Roles, DefaultRoles>,
): ListItemExtended<Roles, DefaultRoles>[] => {
  const { listItems, defaultRoles } = params;

  return listItems.reduce<ListItemExtended<Roles, DefaultRoles>[]>((acc, listItem, index) => {
    const { workspaces, children } = listItem;
    const roles = 'roles' in listItem ? listItem.roles : [];

    const listItemObj = {
      ...listItem,
      id: [...id.split('.'), index + 1].join('.'),
    } as ListItemExtended<Roles, DefaultRoles>;

    const { isRbac, userHasAccess } = (() => {
      if (!defaultRoles || !roles) return { isRbac: false, userHasAccess: true };

      const hasAccess = getCurrentUserRoles({ currentUser }).some((role) =>
        getRolesWithDefaults(defaultRoles, roles).includes(role),
      );

      return { isRbac: true, userHasAccess: hasAccess };
    })();

    if (isRbac && !userHasAccess) return acc;

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

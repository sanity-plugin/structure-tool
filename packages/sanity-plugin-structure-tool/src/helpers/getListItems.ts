import { getCurrentUserRoles } from '@/helpers/getCurrentUserRoles';
import { getRolesWithDefaults } from '@/helpers/getRolesWithDefaults';

import type { CurrentUser } from 'sanity';

import type { StructureListItemsParams } from '@/structure/structure/structure.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';

export const getListItems = <
  Workspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  workspace: Workspaces extends string[] ? Workspaces[number] : string,
  currentUser: CurrentUser,
  id: string,
  params: StructureListItemsParams<Workspaces, Roles, DefaultRoles>,
): ListItemExtended<Workspaces, Roles, DefaultRoles>[] => {
  const { listItems, defaultRoles } = params;

  return listItems.reduce<ListItemExtended<Workspaces, Roles, DefaultRoles>[]>(
    (acc, listItem, index) => {
      const { children } = listItem;

      const workspaces = 'workspaces' in listItem ? listItem.workspaces : undefined;
      const roles = 'roles' in listItem ? listItem.roles : undefined;

      const listItemObj = {
        ...listItem,
        id: [...id.split('.'), index + 1].join('.'),
      };

      const { isRbac, userHasAccess } = (() => {
        if (!defaultRoles || !roles) return { isRbac: false, userHasAccess: true };

        const hasAccess = getCurrentUserRoles({ currentUser }).some((role) =>
          getRolesWithDefaults(defaultRoles, roles).includes(role),
        );

        return { isRbac: true, userHasAccess: hasAccess };
      })();

      if (isRbac && !userHasAccess) return acc;

      if (children && children.length > 0) {
        if (!workspaces || workspaces.includes(workspace)) {
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

      if (!workspaces || workspaces.includes(workspace)) {
        acc.push({ ...listItemObj, children: [] });
      }

      return acc;
    },
    [],
  );
};

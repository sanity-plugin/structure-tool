import { constants } from '@/constants';
import { getContextValues } from '@/helpers/getContextValues';
import { getCurrentUserRoles } from '@/helpers/getCurrentUserRoles';
import { getRolesWithDefaults } from '@/helpers/getRolesWithDefaults';
import { getValidListItem } from '@/helpers/getValidListItem';
import { getWorkspacesWithDefaults } from '@/helpers/getWorkspacesWithDefaults';
import { getComputedListItems } from '@/structure/getComputedListItems/getComputedListItems';
import { sanitizeUrl } from '@/utils';

import type {
  GetWorkspaceItem,
  GetWorkspaceListItem,
} from '@/structure/getWorkspaceListItem/getWorkspaceListItem.types';
import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';

export const getWorkspaceListItem = <T extends StructureToolParams>(
  params: GetWorkspaceListItem<T>,
): ListItemExtended<T>[] => {
  const { S, context, options } = params;
  const {
    workspaces: globalWorkspaces,
    defaultWorkspaces,
    roles: globalRoles,
    defaultRoles,
    listItems,
  } = options;

  const contextValues = getContextValues(context);
  const { workspace, currentUser } = contextValues;

  const getWorkspaceItem = (childParams: GetWorkspaceItem<T>): ListItemExtended<T>[] => {
    const { id: itemId, listItems: items } = childParams;

    return items.reduce<ListItemExtended<T>[]>((acc, listItem, index) => {
      const { id: idFn } = listItem;

      // All Items
      const computedListItem = getComputedListItems({ S, listItem, context });

      // Unique ID & ID
      const { uniqueId, id } = (() => {
        const { displayTitle } = computedListItem;

        const uniqueIdValue = [itemId, index + 1].join(constants.URL_PATH_SEPARATOR);
        const sanitizedPaths = sanitizeUrl(displayTitle).split(' ');

        const idValue = [uniqueIdValue, ...sanitizedPaths].join(constants.URL_PATH_SEPARATOR);

        const userEnteredId = getValidListItem(idFn, {
          ...contextValues,
          values: {
            uniqueId: uniqueIdValue,
            sanitizedPaths,
            id: idValue,
            slugify: sanitizeUrl,
          },
        });

        return { uniqueId: uniqueIdValue, id: userEnteredId ?? idValue };
      })();

      // ListItemObj
      const listItemObj = (() => {
        const { icon, component, raw, ...restListItem } = listItem;

        return { ...restListItem, ...computedListItem, id, icon, component, raw };
      })();

      // Workspace
      const { hasWorkspaceEnabled, hasWorkspaceAccess } = (() => {
        const workspaces = 'workspaces' in listItem ? listItem.workspaces : undefined;

        if (!defaultWorkspaces || !globalWorkspaces) {
          return { hasWorkspaceEnabled: false, hasWorkspaceAccess: true };
        }

        const isInWorkspacesList = globalWorkspaces.includes(workspace);
        const hasAccess = getWorkspacesWithDefaults<T>(
          workspaces,
          defaultWorkspaces,
          contextValues,
        ).includes(workspace);

        return { hasWorkspaceEnabled: true, hasWorkspaceAccess: isInWorkspacesList && hasAccess };
      })();

      if (hasWorkspaceEnabled && !hasWorkspaceAccess) return acc;

      // Roles
      const { hasRoleEnabled, hasRoleAccess } = (() => {
        const roles = 'roles' in listItem ? listItem.roles : undefined;

        if (!defaultRoles || !globalRoles) return { hasRoleEnabled: false, hasRoleAccess: true };

        const hasAccess = getCurrentUserRoles<T>({ currentUser, roles: globalRoles }).some((role) =>
          getRolesWithDefaults<T>(roles, defaultRoles, contextValues).includes(role),
        );

        return { hasRoleEnabled: true, hasRoleAccess: hasAccess };
      })();

      if (hasRoleEnabled && !hasRoleAccess) return acc;

      // Children
      const childrenListItem = (() => {
        const { children } = computedListItem;

        if (children && children.length > 0) {
          return {
            ...listItemObj,
            children: getWorkspaceItem({ id: uniqueId, listItems: children }),
          };
        }

        return { ...listItemObj, children: [] };
      })();

      acc.push(childrenListItem);

      return acc;
    }, []);
  };

  return getWorkspaceItem({ id: constants.UNIQUE_ID_FIRST_VALUE, listItems });
};

import pluralize from 'pluralize-esm';

import { constants } from '@/constants';
import { getCurrentUserRoles } from '@/helpers/getCurrentUserRoles';
import { getRolesWithDefaults } from '@/helpers/getRolesWithDefaults';
import { getWorkspacesWithDefaults } from '@/helpers/getWorkspacesWithDefaults';
import { sanitizeUrl } from '@/utils';

import type { StructureBuilder, StructureResolverContext } from 'sanity/structure';
import type { SetNonNullable } from 'type-fest';

import type { StructureListItemsParams } from '@/structure/structure/structure.types';
import type { StructureToolParams, Workspace } from '@/structure/types/common.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';

export const getListItems = <T extends StructureToolParams>(
  S: StructureBuilder,
  workspace: Workspace<T>,
  context: SetNonNullable<StructureResolverContext, 'currentUser'>,
  id: string,
  params: StructureListItemsParams<T>,
): ListItemExtended<T>[] => {
  const { currentUser } = context;

  const {
    workspaces: globalWorkspaces,
    defaultWorkspaces,
    roles: globalRoles,
    defaultRoles,
    listItems,
  } = params;

  return listItems.reduce<ListItemExtended<T>[]>((acc, listItem, index) => {
    const { children, schemaType, singleton, isPlural, title = '' } = listItem;

    const workspaces = 'workspaces' in listItem ? listItem.workspaces : undefined;
    const roles = 'roles' in listItem ? listItem.roles : undefined;

    const displayTitle = (() => {
      const schemaTitle = schemaType ? S.documentTypeListItem(schemaType).getTitle() : '';
      const isItPlural = title ? false : (isPlural ?? !singleton);
      const mainTitle = title || (schemaTitle ?? '');

      const finalTitle = isItPlural ? pluralize(mainTitle) : mainTitle;
      return finalTitle || '';
    })();

    const uniqueId = [id, index + 1].join(constants.URL_PATH_SEPARATOR);
    const listItemObj = {
      ...listItem,
      id: [uniqueId, ...sanitizeUrl(displayTitle).toLowerCase().split(' ')].join(
        constants.URL_PATH_SEPARATOR,
      ),
      displayTitle,
    };

    const { hasWorkspaceEnabled, hasWorkspaceAccess } = (() => {
      if (!defaultWorkspaces || !globalWorkspaces) {
        return { hasWorkspaceEnabled: false, hasWorkspaceAccess: true };
      }

      const isInWorkspacesList = globalWorkspaces.includes(workspace);
      const hasAccess = getWorkspacesWithDefaults(defaultWorkspaces, workspaces).includes(
        workspace,
      );

      return { hasWorkspaceEnabled: true, hasWorkspaceAccess: isInWorkspacesList && hasAccess };
    })();

    if (hasWorkspaceEnabled && !hasWorkspaceAccess) return acc;

    const { hasRoleEnabled, hasRoleAccess } = (() => {
      if (!defaultRoles || !globalRoles) return { hasRoleEnabled: false, hasRoleAccess: true };

      const hasAccess = getCurrentUserRoles<T>({ currentUser, roles: globalRoles }).some((role) =>
        getRolesWithDefaults(defaultRoles, roles).includes(role),
      );

      return { hasRoleEnabled: true, hasRoleAccess: hasAccess };
    })();

    if (hasRoleEnabled && !hasRoleAccess) return acc;

    if (children && children.length > 0) {
      acc.push({
        ...listItemObj,
        children: getListItems(S, workspace, context, uniqueId, {
          ...params,
          listItems: children,
        }),
      });
    } else {
      acc.push({ ...listItemObj, children: [] });
    }

    return acc;
  }, []);
};

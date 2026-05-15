import { constants } from '@/constants';
import pluralize from 'pluralize-esm';

import { getCurrentUserRoles } from '@/helpers/getCurrentUserRoles';
import { getRolesWithDefaults } from '@/helpers/getRolesWithDefaults';
import { sanitizeUrl } from '@/utils';

import type { CurrentUser } from 'sanity';
import type { StructureBuilder } from 'sanity/structure';

import type { StructureListItemsParams } from '@/structure/structure/structure.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';

export const getListItems = <
  Workspaces extends readonly string[] | undefined,
  DefaultWorkspaces extends readonly string[] | undefined,
  Roles extends readonly string[] | undefined,
  DefaultRoles extends readonly string[] | undefined,
>(
  S: StructureBuilder,
  workspace: Workspaces extends string[] ? Workspaces[number] : string,
  currentUser: CurrentUser,
  id: string,
  params: StructureListItemsParams<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>,
): ListItemExtended<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[] => {
  const { listItems, defaultRoles, roles: globalRoles } = params;

  return listItems.reduce<ListItemExtended<Workspaces, DefaultWorkspaces, Roles, DefaultRoles>[]>(
    (acc, listItem, index) => {
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

      const { isRbac, userHasAccess } = (() => {
        if (!defaultRoles || !globalRoles) return { isRbac: false, userHasAccess: true };

        const hasAccess = getCurrentUserRoles<Roles>({ currentUser, roles: globalRoles }).some(
          (role) => getRolesWithDefaults(defaultRoles, roles).includes(role),
        );

        return { isRbac: true, userHasAccess: hasAccess };
      })();

      if (isRbac && !userHasAccess) return acc;

      if (children && children.length > 0) {
        if (!workspaces || workspaces.includes(workspace)) {
          acc.push({
            ...listItemObj,
            children: getListItems(S, workspace, currentUser, uniqueId, {
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

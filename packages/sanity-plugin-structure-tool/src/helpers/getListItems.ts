import pluralize from 'pluralize-esm';

import { constants } from '@/constants';
import { getCurrentUserRoles } from '@/helpers/getCurrentUserRoles';
import { getRolesWithDefaults } from '@/helpers/getRolesWithDefaults';
import { getValidListItem } from '@/helpers/getValidListItem';
import { getWorkspacesWithDefaults } from '@/helpers/getWorkspacesWithDefaults';
import { sanitizeUrl } from '@/utils';

import type { StructureBuilder } from 'sanity/structure';

import type { StructureListItemsParams } from '@/structure/structure/structure.types';
import type {
  StructureToolParams,
  ValidSanityContext,
  Workspace,
} from '@/structure/types/common.types';
import type { ListItemExtended } from '@/structure/types/listItem.types';

export const getListItems = <T extends StructureToolParams>(
  S: StructureBuilder,
  workspace: Workspace<T>,
  context: ValidSanityContext,
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
    const {
      title: titleFn,
      schemaType: schemaTypeFn,
      singleton: singletonFn,
      children,
      apiVersion: apiVersionFn,
      filter: filterFn,
      filterParams: filterParamsFn,
      hideAddButton: hideAddButtonFn,
      templates: templatesFn,
      isDivider: isDividerFn,
      isPlural: isPluralFn,
      ...restListItem
    } = listItem;

    const workspaces = 'workspaces' in listItem ? listItem.workspaces : undefined;
    const roles = 'roles' in listItem ? listItem.roles : undefined;

    const listItemParams = { workspace, currentUser, context };

    const schemaType = getValidListItem(schemaTypeFn, listItemParams);
    const singleton = getValidListItem(singletonFn, listItemParams);
    const title = getValidListItem(titleFn, listItemParams);
    const apiVersion = getValidListItem(apiVersionFn, listItemParams);
    const filter = getValidListItem(filterFn, listItemParams);
    const filterParams = getValidListItem(filterParamsFn, listItemParams);
    const hideAddButton = getValidListItem(hideAddButtonFn, listItemParams);
    const templates = getValidListItem(templatesFn, listItemParams);
    const isDivider = getValidListItem(isDividerFn, listItemParams);
    const isPlural = getValidListItem(isPluralFn, listItemParams);

    const displayTitle = (() => {
      const schemaTitle = schemaType ? S.documentTypeListItem(schemaType).getTitle() : '';
      const isItPlural = title ? false : (isPlural ?? !singleton);
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      const mainTitle = title || (schemaTitle ?? '');

      const finalTitle = isItPlural ? pluralize(mainTitle) : mainTitle;
      return finalTitle || '';
    })();

    const uniqueId = [id, index + 1].join(constants.URL_PATH_SEPARATOR);
    const listItemObj = {
      ...restListItem,
      id: [uniqueId, ...sanitizeUrl(displayTitle).toLowerCase().split(' ')].join(
        constants.URL_PATH_SEPARATOR,
      ),
      displayTitle,
      children,
      schemaType,
      singleton,
      apiVersion,
      filter,
      filterParams,
      hideAddButton,
      templates,
      isDivider,
      isPlural,
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

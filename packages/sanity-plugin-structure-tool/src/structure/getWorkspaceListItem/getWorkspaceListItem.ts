import pluralize from 'pluralize-esm';

import { constants } from '@/constants';
import { getContextValues } from '@/helpers/getContextValues';
import { getCurrentUserRoles } from '@/helpers/getCurrentUserRoles';
import { getRolesWithDefaults } from '@/helpers/getRolesWithDefaults';
import { getValidListItem } from '@/helpers/getValidListItem';
import { getWorkspacesWithDefaults } from '@/helpers/getWorkspacesWithDefaults';
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
  const { S, context, id, options } = params;
  const {
    workspaces: globalWorkspaces,
    defaultWorkspaces,
    roles: globalRoles,
    defaultRoles,
    listItems,
  } = options;

  const contextValues = getContextValues(context);

  const getWorkspaceItem = (childParams: GetWorkspaceItem<T>): ListItemExtended<T>[] => {
    const { id: itemId, listItems: items } = childParams;

    return items.reduce<ListItemExtended<T>[]>((acc, listItem, index) => {
      const {
        title: titleFn,
        schemaType: schemaTypeFn,
        singleton: singletonFn,
        componentProps: componentPropsFn,
        children: childrenFn,
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

      const { workspace, currentUser } = contextValues;

      const schemaType = getValidListItem(schemaTypeFn, contextValues);
      const singleton = getValidListItem(singletonFn, contextValues);
      const componentProps = getValidListItem(componentPropsFn, contextValues);
      const children = getValidListItem(childrenFn, contextValues);
      const title = getValidListItem(titleFn, contextValues);
      const apiVersion = getValidListItem(apiVersionFn, contextValues);
      const filter = getValidListItem(filterFn, contextValues);
      const filterParams = getValidListItem(filterParamsFn, contextValues);
      const hideAddButton = getValidListItem(hideAddButtonFn, contextValues);
      const templates = getValidListItem(templatesFn, contextValues);
      const isDivider = getValidListItem(isDividerFn, contextValues);
      const isPlural = getValidListItem(isPluralFn, contextValues);

      const displayTitle = (() => {
        const schemaTitle = schemaType ? S.documentTypeListItem(schemaType).getTitle() : '';
        const isItPlural = title ? false : (isPlural ?? !singleton);
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        const mainTitle = title || (schemaTitle ?? '');

        const finalTitle = isItPlural ? pluralize(mainTitle) : mainTitle;
        return finalTitle || '';
      })();

      const uniqueId = [itemId, index + 1].join(constants.URL_PATH_SEPARATOR);
      const listItemObj = {
        ...restListItem,
        id: [uniqueId, ...sanitizeUrl(displayTitle).toLowerCase().split(' ')].join(
          constants.URL_PATH_SEPARATOR,
        ),
        displayTitle,
        children,
        schemaType,
        singleton,
        componentProps,
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
        const hasAccess = getWorkspacesWithDefaults<T>(
          workspaces,
          defaultWorkspaces,
          contextValues,
        ).includes(workspace);

        return { hasWorkspaceEnabled: true, hasWorkspaceAccess: isInWorkspacesList && hasAccess };
      })();

      if (hasWorkspaceEnabled && !hasWorkspaceAccess) return acc;

      const { hasRoleEnabled, hasRoleAccess } = (() => {
        if (!defaultRoles || !globalRoles) return { hasRoleEnabled: false, hasRoleAccess: true };

        const hasAccess = getCurrentUserRoles<T>({ currentUser, roles: globalRoles }).some((role) =>
          getRolesWithDefaults<T>(roles, defaultRoles, contextValues).includes(role),
        );

        return { hasRoleEnabled: true, hasRoleAccess: hasAccess };
      })();

      if (hasRoleEnabled && !hasRoleAccess) return acc;

      if (children && children.length > 0) {
        acc.push({
          ...listItemObj,
          children: getWorkspaceItem({ id: uniqueId, listItems: children }),
        });
      } else {
        acc.push({ ...listItemObj, children: [] });
      }

      return acc;
    }, []);
  };

  return getWorkspaceItem({ id, listItems });
};

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
  const { S, context, id: globalId, options } = params;
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
        id: idFn,
        title: titleFn,
        icon,
        schemaType: schemaTypeFn,
        singleton: singletonFn,
        componentOptions: componentOptionsFn,
        children: childrenFn,
        apiVersion: apiVersionFn,
        filter: filterFn,
        filterParams: filterParamsFn,
        defaultOrdering: defaultOrderingFn,
        defaultLayout: defaultLayoutFn,
        hideAddButton: hideAddButtonFn,
        templates: templatesFn,
        isDivider: isDividerFn,
        isPlural: isPluralFn,
        showIcons: showIconsFn,
        ...restListItem
      } = listItem;

      const workspaces = 'workspaces' in listItem ? listItem.workspaces : undefined;
      const roles = 'roles' in listItem ? listItem.roles : undefined;

      const { workspace, currentUser } = contextValues;

      const title = getValidListItem(titleFn, contextValues);
      const schemaType = getValidListItem(schemaTypeFn, contextValues);
      const singleton = getValidListItem(singletonFn, contextValues);
      const componentOptions = getValidListItem(componentOptionsFn, contextValues);
      const children = getValidListItem(childrenFn, contextValues);
      const apiVersion = getValidListItem(apiVersionFn, contextValues);
      const filter = getValidListItem(filterFn, contextValues);
      const filterParams = getValidListItem(filterParamsFn, contextValues);
      const defaultOrdering = getValidListItem(defaultOrderingFn, contextValues);
      const defaultLayout = getValidListItem(defaultLayoutFn, contextValues);
      const hideAddButton = getValidListItem(hideAddButtonFn, contextValues);
      const templates = getValidListItem(templatesFn, contextValues);
      const isDivider = getValidListItem(isDividerFn, contextValues);
      const isPlural = getValidListItem(isPluralFn, contextValues);
      const showIcons = getValidListItem(showIconsFn, contextValues);
      const showIcon = icon !== false;

      const displayTitle = (() => {
        const schemaTitle = schemaType ? S.documentTypeListItem(schemaType).getTitle() : '';
        const isItPlural = title ? false : (isPlural ?? !singleton);
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        const mainTitle = title || (schemaTitle ?? '');

        const finalTitle = isItPlural ? pluralize(mainTitle) : mainTitle;
        return finalTitle || '';
      })();

      const { uniqueId, id } = (() => {
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

      const listItemObj = {
        ...restListItem,
        id,
        displayTitle,
        schemaType,
        icon,
        singleton,
        componentOptions,
        children,
        apiVersion,
        filter,
        filterParams,
        defaultOrdering,
        defaultLayout,
        hideAddButton,
        templates,
        isDivider,
        isPlural,
        showIcons,
        showIcon,
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

  return getWorkspaceItem({ id: globalId, listItems });
};

import { getContextValues } from '@/helpers/getContextValues';
import { getCurrentUserRoles } from '@/helpers/getCurrentUserRoles';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { SetNonNullable } from 'type-fest';

import type { ListItemKeyParams } from '@/structure/listItems/listItems.types';
import type { StructureCommonParams, StructureToolParams } from '@/structure/types/common.types';
import type { ListItemRoles } from '@/structure/types/listItemDefinitions.types';

/**
 * Helper callback type that resolves the roles access configuration (with default fallbacks) for a user context.
 */
type GetRolesWithDefaults = <T extends StructureToolParams>(
  roles: ListItemRoles<SetNonNullable<T, 'Roles' | 'DefaultRoles'>> | undefined,
  defaultRoles: NonNullable<T['DefaultRoles']>,
  context: StructureCommonParams<T>['context'],
) => string[];

/**
 * Resolves the configuration list of roles permitted to view a list item, applying default fallback roles.
 * Supports evaluating dynamic role resolver callback functions.
 *
 * @param roles - User-specified role rules or resolver callback.
 * @param defaultRoles - Package-level default roles fallback.
 * @param context - Action context from Sanity Studio.
 * @returns Array of unique resolved role names.
 */
const getRolesWithDefaults: GetRolesWithDefaults = (roles, defaultRoles, context) => {
  const contextValues = getContextValues(context);

  if (typeof roles === 'function') {
    const rolesValue = getValidListItem(roles, { ...contextValues, defaultRoles });

    return [...new Set(rolesValue)];
  }

  return [...new Set([...defaultRoles, ...(roles ?? [])])];
};

/**
 * Helper function type that checks if the current user has access to a list item based on role restrictions.
 */
type HasRolesAccess = <T extends StructureToolParams>(params: ListItemKeyParams<T>) => boolean;

/**
 * Evaluates the role visibility rules for a list item to determine if the current user has access.
 *
 * @param params - Render context parameters containing mapping and list parameters.
 * @returns True if the user has access; false otherwise.
 */
export const hasRolesAccess: HasRolesAccess = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { context, pluginParams } = listItemsParams;
  const { currentUser } = context;
  const { roles: globalRoles, defaultRoles } = pluginParams;
  const { listItem } = mappingParams;

  const { hasRoleEnabled, hasRoleAccess } = (() => {
    const roles = 'roles' in listItem ? listItem.roles : undefined;

    if (!defaultRoles || !globalRoles) return { hasRoleEnabled: false, hasRoleAccess: true };

    const hasAccess = getCurrentUserRoles({ currentUser, roles: globalRoles }).some((role) =>
      getRolesWithDefaults(roles, defaultRoles, context).includes(role),
    );

    return { hasRoleEnabled: true, hasRoleAccess: hasAccess };
  })();

  return !(hasRoleEnabled && !hasRoleAccess);
};

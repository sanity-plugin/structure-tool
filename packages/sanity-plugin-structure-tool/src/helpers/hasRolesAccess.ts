import { getContextValues } from '@/helpers/getContextValues';
import { getCurrentUserRoles } from '@/helpers/getCurrentUserRoles';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { SetNonNullable } from 'type-fest';

import type { ListItemKeyParams } from '@/structure/listItems/listItems.types';
import type { StructureCommonParams, StructureToolParams } from '@/structure/types/common.types';
import type { ListItemRoles } from '@/structure/types/listItemDefinitions.types';

type GetRolesWithDefaults = <T extends StructureToolParams>(
  roles: ListItemRoles<SetNonNullable<T, 'Roles' | 'DefaultRoles'>> | undefined,
  defaultRoles: NonNullable<T['DefaultRoles']>,
  context: StructureCommonParams<T>['context'],
) => string[];

const getRolesWithDefaults: GetRolesWithDefaults = (roles, defaultRoles, context) => {
  const contextValues = getContextValues(context);

  if (typeof roles === 'function') {
    const rolesValue = getValidListItem(roles, { ...contextValues, defaultRoles });

    return [...new Set(rolesValue)];
  }

  return [...new Set([...defaultRoles, ...(roles ?? [])])];
};

type HasRolesAccess = <T extends StructureToolParams>(params: ListItemKeyParams<T>) => boolean;

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

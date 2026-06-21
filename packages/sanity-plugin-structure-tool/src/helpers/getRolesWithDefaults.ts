import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { SetNonNullable } from 'type-fest';

import type { StructureCommonParams, StructureToolParams } from '@/structure/types/common.types';
import type { ListItemRoles } from '@/structure/types/listItemDefinitions.types';

type GetRolesWithDefaults = <T extends StructureToolParams>(
  roles: ListItemRoles<SetNonNullable<T, 'Roles' | 'DefaultRoles'>> | undefined,
  defaultRoles: NonNullable<T['DefaultRoles']>,
  context: StructureCommonParams<T>['context'],
) => string[];

export const getRolesWithDefaults: GetRolesWithDefaults = (roles, defaultRoles, context) => {
  const contextValues = getContextValues(context);

  if (typeof roles === 'function') {
    const rolesValue = getValidListItem(roles, { ...contextValues, defaultRoles });

    return [...new Set(rolesValue)];
  }

  return [...new Set([...defaultRoles, ...(roles ?? [])])];
};

import { userRoles } from '@/constants';

import type { StructureToolPluginParams } from '@/structure/types/common.types';
import type { ListItem } from '@/structure/types/listItem.types';

type GetRolesWithDefaults = (
  defaultRoles: StructureToolPluginParams['defaultRoles'],
  roles: ListItem['roles'],
) => string[];

export const getRolesWithDefaults: GetRolesWithDefaults = (defaultRoles, roles) => {
  const defaults = (() => {
    if (!defaultRoles) return null;
    if (Array.isArray(defaultRoles) && defaultRoles.length === 0) return null;
    return defaultRoles;
  })() ?? [userRoles.ADMINISTRATOR];

  return [...defaults, ...(roles ?? [])];
};

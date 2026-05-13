import type { ListItemRoles } from '@/structure/types/listItem.types';

type GetRolesWithDefaults = (
  defaultRoles: readonly string[],
  roles: ListItemRoles<readonly string[], readonly string[]>,
) => string[];

export const getRolesWithDefaults: GetRolesWithDefaults = (defaultRoles, roles) => {
  if (typeof roles === 'function') {
    return [...new Set(roles({ defaultRoles }))];
  }

  return [...new Set([...defaultRoles, ...roles])];
};

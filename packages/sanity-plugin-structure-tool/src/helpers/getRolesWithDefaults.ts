import type { ListItemRoles } from '@/structure/types/listItemCore.types';

type GetRolesWithDefaults = (
  defaultRoles: readonly string[],
  roles: ListItemRoles<readonly string[], readonly string[]> | undefined,
) => string[];

export const getRolesWithDefaults: GetRolesWithDefaults = (defaultRoles, roles) => {
  if (typeof roles === 'function') {
    return [...new Set(roles({ defaultRoles }))];
  }

  return [...new Set([...defaultRoles, ...(roles ?? [])])];
};

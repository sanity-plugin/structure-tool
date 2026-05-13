import { userRoles } from '@/constants';

type GetRolesWithDefaults = (
  defaultRoles: readonly string[] | undefined,
  roles: readonly string[] | undefined,
) => string[];

export const getRolesWithDefaults: GetRolesWithDefaults = (defaultRoles, roles) => {
  const defaults = (() => {
    if (!defaultRoles) return null;
    if (defaultRoles.length === 0) return null;
    return defaultRoles;
  })();

  return [...new Set([...(defaults ?? []), ...(roles ?? []), userRoles.ADMINISTRATOR])];
};

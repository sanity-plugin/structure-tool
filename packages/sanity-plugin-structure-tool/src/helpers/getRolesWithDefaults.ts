import { userRoles } from '@/constants';

type GetRolesWithDefaults = (
  defaultRoles: string[] | undefined,
  roles: string[] | undefined,
) => string[];

export const getRolesWithDefaults: GetRolesWithDefaults = (defaultRoles, roles) => {
  const defaults = (() => {
    if (!defaultRoles) return null;
    if (Array.isArray(defaultRoles) && defaultRoles.length === 0) return null;
    return defaultRoles;
  })();

  return [...new Set([...(defaults ?? []), ...(roles ?? []), userRoles.ADMINISTRATOR])];
};

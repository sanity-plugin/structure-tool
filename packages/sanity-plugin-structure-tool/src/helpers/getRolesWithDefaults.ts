import { userRoles } from '@/constants';

import type { UserRole } from '@/types/constants.types';

type GetRolesWithDefaults = (roles: UserRole[]) => UserRole[];

export const getRolesWithDefaults: GetRolesWithDefaults = (roles) => [
  ...roles,
  userRoles.ADMINISTRATOR,
];

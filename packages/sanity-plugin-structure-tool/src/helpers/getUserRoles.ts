import { userRoles } from '@/constants';

import type { CurrentUser, DocumentActionsContext } from 'sanity';

import type { UserRole } from '@/types/constants.types';

type GetUserRoles = (
  context:
    | Pick<DocumentActionsContext, 'currentUser'>
    | Record<'currentUser', Omit<CurrentUser, 'role'> | null>,
) => string[];

export const getUserRoles: GetUserRoles = (context) => {
  const { currentUser } = context;

  if (!currentUser) return [];

  return currentUser.roles.reduce<UserRole[]>((acc, role) => {
    const { name } = role || {};
    const roleName = name as UserRole;

    if (Object.values(userRoles).includes(roleName)) acc.push(roleName);

    return acc;
  }, []);
};

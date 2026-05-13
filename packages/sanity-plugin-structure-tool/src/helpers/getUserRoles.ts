import { userRoles } from '@/constants';

import type { CurrentUser, DocumentActionsContext } from 'sanity';

import type { UserRole } from '@/types/constants.types';

type GetUserRoles = (
  context:
    | Pick<DocumentActionsContext, 'currentUser'>
    | Record<'currentUser', Omit<CurrentUser, 'role'> | null>,
) => UserRole[];

export const getUserRoles: GetUserRoles = (context) => {
  const { currentUser } = context;

  if (!currentUser) return [];

  const defaultRoles =
    'projectId' in context && currentUser.id === context.projectId ? [userRoles.ADMINISTRATOR] : [];

  return currentUser.roles.reduce<UserRole[]>((acc, role) => {
    const { name } = role || {};
    const roleName = name as UserRole;

    if (Object.values(userRoles).includes(roleName)) acc.push(roleName);

    return acc;
  }, defaultRoles);
};

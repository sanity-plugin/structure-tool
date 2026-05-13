import type { CurrentUser, DocumentActionsContext } from 'sanity';

type GetUserRoles = (
  context:
    | Pick<DocumentActionsContext, 'currentUser'>
    | Record<'currentUser', Omit<CurrentUser, 'role'> | null>,
) => string[];

export const getCurrentUserRoles: GetUserRoles = (context) => {
  const { currentUser } = context;

  return currentUser ? currentUser.roles.map((role) => role.name) : [];
};

import type { DocumentActionsContext } from 'sanity';

interface GetUserRolesParams<Roles extends readonly string[] | undefined> extends Pick<
  DocumentActionsContext,
  'currentUser'
> {
  roles: Roles;
}

type GetCurrentUserRoles = <Roles extends readonly string[] | undefined>(
  params: GetUserRolesParams<Roles>,
) => string[];

export const getCurrentUserRoles: GetCurrentUserRoles = (params) => {
  const { currentUser, roles } = params;

  if (!currentUser) return [];

  return currentUser.roles.reduce<string[]>((acc, role) => {
    const { name } = role;

    if (roles?.includes(name)) acc.push(name);

    return acc;
  }, []);
};

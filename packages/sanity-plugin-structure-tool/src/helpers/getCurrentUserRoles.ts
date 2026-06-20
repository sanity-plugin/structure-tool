import type { DocumentActionsContext } from 'sanity';

import type { StructureToolParams } from '@/structure/types/common.types';

interface GetUserRolesParams<T extends StructureToolParams> extends Pick<
  DocumentActionsContext,
  'currentUser'
> {
  roles: T['Roles'];
}

type GetCurrentUserRoles = <T extends StructureToolParams>(
  params: GetUserRolesParams<T>,
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

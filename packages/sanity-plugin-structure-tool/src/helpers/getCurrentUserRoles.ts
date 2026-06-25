import type { StructureToolParams, ValidSanityContext } from '@/structure/types/common.types';

/**
 * Parameters for the getCurrentUserRoles helper.
 *
 * @template T - The structure tool configuration parameters schema.
 */
interface GetUserRolesParams<T extends StructureToolParams> extends Pick<
  ValidSanityContext,
  'currentUser'
> {
  roles: T['Roles'];
}

/**
 * Helper function type that retrieves the roles assigned to the current user which are also configured in the schema parameters.
 */
type GetCurrentUserRoles = <T extends StructureToolParams>(
  params: GetUserRolesParams<T>,
) => string[];

/**
 * Resolves the roles assigned to the current user that exist in the defined roles set.
 *
 * @param params - Parameters containing the currentUser and target roles list.
 * @returns An array of matching role names.
 */
export const getCurrentUserRoles: GetCurrentUserRoles = (params) => {
  const { currentUser, roles } = params;

  return currentUser.roles.reduce<string[]>((acc, role) => {
    const { name } = role;

    if (roles?.includes(name)) acc.push(name);

    return acc;
  }, []);
};

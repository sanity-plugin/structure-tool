import type { SetNonNullable } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemRoles } from '@/structure/types/listItemCore.types';

type GetRolesWithDefaults = (
  defaultRoles: NonNullable<StructureToolParams['DefaultRoles']>,
  roles:
    | ListItemRoles<Pick<SetNonNullable<StructureToolParams>, 'Roles' | 'DefaultRoles'>>
    | undefined,
) => string[];

export const getRolesWithDefaults: GetRolesWithDefaults = (defaultRoles, roles) => {
  if (typeof roles === 'function') {
    return [...new Set(roles({ defaultRoles }))];
  }

  return [...new Set([...defaultRoles, ...(roles ?? [])])];
};

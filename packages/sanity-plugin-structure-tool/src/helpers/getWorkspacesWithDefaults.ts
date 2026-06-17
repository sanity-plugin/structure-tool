import type { SetNonNullable } from 'type-fest';

import type { StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWorkspaces } from '@/structure/types/listItemCore.types';

type GetWorkspacesWithDefaults = (
  defaultWorkspaces: NonNullable<StructureToolParams['DefaultWorkspaces']>,
  workspaces:
    | ListItemWorkspaces<
        Pick<SetNonNullable<StructureToolParams>, 'Workspaces' | 'DefaultWorkspaces'>
      >
    | undefined,
) => string[];

export const getWorkspacesWithDefaults: GetWorkspacesWithDefaults = (
  defaultWorkspaces,
  workspaces,
) => {
  if (typeof workspaces === 'function') {
    return [...new Set(workspaces({ defaultWorkspaces }))];
  }

  return [...new Set([...defaultWorkspaces, ...(workspaces ?? [])])];
};

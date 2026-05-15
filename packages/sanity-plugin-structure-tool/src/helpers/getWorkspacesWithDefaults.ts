import type { ListItemWorkspaces } from '@/structure/types/listItemCore.types';

type GetWorkspacesWithDefaults = (
  defaultWorkspaces: readonly string[],
  workspaces: ListItemWorkspaces<readonly string[], readonly string[]> | undefined,
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

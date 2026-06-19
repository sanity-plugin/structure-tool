import { getValidListItem } from '@/helpers/getValidListItem';

import type { SetNonNullable } from 'type-fest';

import type {
  StructureToolCallbackParams,
  StructureToolParams,
} from '@/structure/types/common.types';
import type { ListItemWorkspaces } from '@/structure/types/listItemCore.types';

type GetWorkspacesWithDefaults = <T extends StructureToolParams>(
  workspaces: ListItemWorkspaces<SetNonNullable<T, 'Workspaces' | 'DefaultWorkspaces'>> | undefined,
  defaultWorkspaces: NonNullable<T['DefaultWorkspaces']>,
  contextValues: StructureToolCallbackParams<T>,
) => string[];

export const getWorkspacesWithDefaults: GetWorkspacesWithDefaults = (
  workspaces,
  defaultWorkspaces,
  contextValues,
) => {
  if (typeof workspaces === 'function') {
    const workspacesValue = getValidListItem(workspaces, { ...contextValues, defaultWorkspaces });

    return [...new Set(workspacesValue)];
  }

  return [...new Set([...defaultWorkspaces, ...(workspaces ?? [])])];
};

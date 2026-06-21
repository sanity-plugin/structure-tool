import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { SetNonNullable } from 'type-fest';

import type { StructureCommonParams, StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWorkspaces } from '@/structure/types/listItemDefinitions.types';

type GetWorkspacesWithDefaults = <T extends StructureToolParams>(
  workspaces: ListItemWorkspaces<SetNonNullable<T, 'Workspaces' | 'DefaultWorkspaces'>> | undefined,
  defaultWorkspaces: NonNullable<T['DefaultWorkspaces']>,
  context: StructureCommonParams<T>['context'],
) => string[];

export const getWorkspacesWithDefaults: GetWorkspacesWithDefaults = (
  workspaces,
  defaultWorkspaces,
  context,
) => {
  const contextValues = getContextValues(context);

  if (typeof workspaces === 'function') {
    const workspacesValue = getValidListItem(workspaces, { ...contextValues, defaultWorkspaces });

    return [...new Set(workspacesValue)];
  }

  return [...new Set([...defaultWorkspaces, ...(workspaces ?? [])])];
};

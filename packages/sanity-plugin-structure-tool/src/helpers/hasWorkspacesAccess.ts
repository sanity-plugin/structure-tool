import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { SetNonNullable } from 'type-fest';

import type { ListItemKeyParams } from '@/structure/listItems/listItems.types';
import type { StructureCommonParams, StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWorkspaces } from '@/structure/types/listItemDefinitions.types';

type GetWorkspacesWithDefaults = <T extends StructureToolParams>(
  workspaces: ListItemWorkspaces<SetNonNullable<T, 'Workspaces' | 'DefaultWorkspaces'>> | undefined,
  defaultWorkspaces: NonNullable<T['DefaultWorkspaces']>,
  context: StructureCommonParams<T>['context'],
) => string[];

const getWorkspacesWithDefaults: GetWorkspacesWithDefaults = (
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

type HasWorkspacesAccess = <T extends StructureToolParams>(params: ListItemKeyParams<T>) => boolean;

export const hasWorkspacesAccess: HasWorkspacesAccess = (params) => {
  const { listItemsParams, mappingParams } = params;
  const { context, workspace, pluginParams } = listItemsParams;
  const { workspaces: globalWorkspaces, defaultWorkspaces } = pluginParams;
  const { listItem } = mappingParams;

  const { hasWorkspaceEnabled, hasWorkspaceAccess } = (() => {
    const workspaces = 'workspaces' in listItem ? listItem.workspaces : undefined;

    if (!defaultWorkspaces || !globalWorkspaces) {
      return { hasWorkspaceEnabled: false, hasWorkspaceAccess: true };
    }

    const isInWorkspacesList = globalWorkspaces.includes(workspace);
    const hasAccess = getWorkspacesWithDefaults(workspaces, defaultWorkspaces, context).includes(
      workspace,
    );

    return { hasWorkspaceEnabled: true, hasWorkspaceAccess: isInWorkspacesList && hasAccess };
  })();

  return !(hasWorkspaceEnabled && !hasWorkspaceAccess);
};

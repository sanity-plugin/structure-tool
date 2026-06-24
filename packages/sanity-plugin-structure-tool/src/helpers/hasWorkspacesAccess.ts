import { getContextValues } from '@/helpers/getContextValues';
import { getValidListItem } from '@/helpers/getValidListItem';

import type { SetNonNullable } from 'type-fest';

import type { ListItemKeyParams } from '@/structure/listItems/listItems.types';
import type { StructureCommonParams, StructureToolParams } from '@/structure/types/common.types';
import type { ListItemWorkspaces } from '@/structure/types/listItemDefinitions.types';

/**
 * Helper callback type that resolves the workspaces access configuration (with default fallbacks) for a user context.
 */
type GetWorkspacesWithDefaults = <T extends StructureToolParams>(
  workspaces: ListItemWorkspaces<SetNonNullable<T, 'Workspaces' | 'DefaultWorkspaces'>> | undefined,
  defaultWorkspaces: NonNullable<T['DefaultWorkspaces']>,
  context: StructureCommonParams<T>['context'],
) => string[];

/**
 * Resolves the configuration list of workspaces permitted to view a list item, applying default fallback workspaces.
 * Supports evaluating dynamic workspace resolver callback functions.
 *
 * @param workspaces - User-specified workspace rules or resolver callback.
 * @param defaultWorkspaces - Package-level default workspaces fallback.
 * @param context - Action context from Sanity Studio.
 * @returns Array of unique resolved workspace names.
 */
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

/**
 * Helper function type that checks if the current user has access to a list item based on workspace restrictions.
 */
type HasWorkspacesAccess = <T extends StructureToolParams>(params: ListItemKeyParams<T>) => boolean;

/**
 * Evaluates the workspace visibility rules for a list item to determine if it should be displayed in the active workspace.
 *
 * @param params - Render context parameters containing mapping and list parameters.
 * @returns True if the item is permitted in the active workspace; false otherwise.
 */
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

import { getWorkspaceListItems } from '@/helpers/getWorkspaceListItems';
import { renderListItem } from '@/structure/renderListItem';

import type { Structure } from '@/structure/types/common.types';
import type { WorkspaceType } from '@/types/constants.types';

export const structure: Structure = (params) => (S, context) => {
  const { title, emptyListTitle, ...restParams } = params;

  const { currentUser, schema } = context;
  const { _original: original } = schema;
  const workspace = original?.name as WorkspaceType;

  if (!workspace || !currentUser) return S.list().title(title).items([]);

  const workspaceListItems = getWorkspaceListItems(workspace, currentUser, restParams);

  if (!workspaceListItems || workspaceListItems.length === 0) {
    return S.list().title(emptyListTitle ?? `${title} Not Configured`);
  }

  return S.list()
    .title(title)
    .items(
      workspaceListItems
        .map((listItem) => renderListItem(S, { ...context, currentUser }, listItem))
        .filter((item) => item !== null),
    );
};

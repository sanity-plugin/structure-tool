import { getWorkspaceContentTypes } from '@/helpers/getWorkspaceContentTypes';
import renderContentType from '@/structure/renderContentType';

import type { Structure } from '@/structure/types/common.types';
import type { WorkspaceType } from '@/types/constants.types';

export const structure: Structure = (contentTypes) => (S, context) => {
  const { currentUser, schema } = context;
  const { _original: original } = schema;
  const workspace = original?.name as WorkspaceType;

  if (!workspace || !currentUser) return S.list().title('Content').items([]);

  const workspaceContentTypes = getWorkspaceContentTypes(workspace, contentTypes, currentUser);

  if (!workspaceContentTypes || workspaceContentTypes.length === 0) {
    return S.list().title('Content Types Not Configured');
  }

  return S.list()
    .title('Content Types')
    .items(
      workspaceContentTypes
        .map((contentType) => renderContentType(S, { ...context, currentUser }, contentType))
        .filter((item) => item !== null),
    );
};

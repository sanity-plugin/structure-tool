import { getContentTypes } from '@/helpers/getContentTypes';

import type { CurrentUser } from 'sanity';

import type { ContentTypes, ContentTypesExtended } from '@/structure/types/contentTypes.types';
import type { WorkspaceType } from '@/types/constants.types';

export type GetWorkspaceContentTypes = (
  workspace: WorkspaceType,
  contentTypes: ContentTypes[],
  currentUser: CurrentUser,
) => ContentTypesExtended[];

export const getWorkspaceContentTypes: GetWorkspaceContentTypes = (
  workspace,
  contentTypes,
  currentUser,
) => getContentTypes(workspace, contentTypes, currentUser, '1');

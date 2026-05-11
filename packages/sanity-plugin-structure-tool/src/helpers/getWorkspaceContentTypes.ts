import { getContentTypes } from '@/helpers/getContentTypes';

import type { CurrentUser } from 'sanity';

import type { StructureToolPluginParams } from '@/structure/types/common.types';
import type { ContentTypesExtended } from '@/structure/types/contentTypes.types';
import type { WorkspaceType } from '@/types/constants.types';

export type GetWorkspaceContentTypes = (
  workspace: WorkspaceType,
  currentUser: CurrentUser,
  params: StructureToolPluginParams,
) => ContentTypesExtended[];

export const getWorkspaceContentTypes: GetWorkspaceContentTypes = (
  workspace,
  currentUser,
  params,
) => getContentTypes(workspace, currentUser, '1', params);

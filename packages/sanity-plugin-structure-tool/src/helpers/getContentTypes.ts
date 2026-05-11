import { getRolesWithDefaults } from '@/helpers/getRolesWithDefaults';
import { getUserRoles } from '@/structure/userRoles';

import type { CurrentUser } from 'sanity';

import type { StructureToolPluginParams } from '@/structure/types/common.types';
import type { ContentTypesExtended } from '@/structure/types/contentTypes.types';
import type { WorkspaceType } from '@/types/constants.types';

export type GetContentTypes = (
  workspace: WorkspaceType,
  currentUser: CurrentUser,
  id: string,
  params: StructureToolPluginParams,
) => ContentTypesExtended[];

export const getContentTypes: GetContentTypes = (workspace, currentUser, id, params) => {
  const { contentTypes, defaultRoles } = params;

  return contentTypes.reduce<ReturnType<GetContentTypes>>((acc, contentType, index) => {
    const { workspaces: contentTypeWorkspaces, roles, children } = contentType;

    const contentTypeObj = {
      ...contentType,
      id: [...id.split('.'), index + 1].join('.'),
    };

    const userHasAccess = getUserRoles({ currentUser }).some((role) =>
      getRolesWithDefaults(defaultRoles, roles).includes(role),
    );

    if (!userHasAccess) return acc;

    if (children && children.length > 0) {
      if ((contentTypeWorkspaces as string[]).includes(workspace)) {
        acc.push({
          ...contentTypeObj,
          children: getContentTypes(workspace, currentUser, contentTypeObj.id, {
            ...params,
            contentTypes: children,
          }),
        });
      }

      return acc;
    }

    if ((contentTypeWorkspaces as string[]).includes(workspace)) {
      acc.push({ ...contentTypeObj, children: [] });
    }

    return acc;
  }, []);
};

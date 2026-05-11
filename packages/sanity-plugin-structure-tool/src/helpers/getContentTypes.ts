import { getRolesWithDefaults } from '@/helpers/getRolesWithDefaults';
import { getUserRoles } from '@/structure/userRoles';

import type { CurrentUser } from 'sanity';

import type { ContentTypes, ContentTypesExtended } from '@/structure/types/contentTypes.types';
import type { WorkspaceType } from '@/types/constants.types';

export type GetContentTypes = (
  workspace: WorkspaceType,
  contentTypes: ContentTypes[],
  currentUser: CurrentUser,
  id: string,
) => ContentTypesExtended[];

export const getContentTypes: GetContentTypes = (workspace, types, currentUser, id) =>
  types.reduce<ReturnType<GetContentTypes>>((acc, contentType, index) => {
    const { workspaces: contentTypeWorkspaces, roles, children } = contentType;

    const contentTypeObj = {
      ...contentType,
      id: [...id.split('.'), index + 1].join('.'),
    };

    const userHasAccess = getUserRoles({ currentUser }).some((role) =>
      getRolesWithDefaults(roles).includes(role),
    );

    if (!userHasAccess) return acc;

    if (children && children.length > 0) {
      if ((contentTypeWorkspaces as string[]).includes(workspace)) {
        acc.push({
          ...contentTypeObj,
          children: getContentTypes(workspace, children, currentUser, contentTypeObj.id),
        });
      }

      return acc;
    }

    if ((contentTypeWorkspaces as string[]).includes(workspace)) {
      acc.push({ ...contentTypeObj, children: [] });
    }

    return acc;
  }, []);

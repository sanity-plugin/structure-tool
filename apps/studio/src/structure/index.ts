import { structureToolPlugin } from 'sanity-plugin-structure-tool';

import { userRoles, workspaceTypes } from '@/constants/common';
import workspaces from '@/workspace/workspaces';

export const { structure, templates, defineListItems } = structureToolPlugin({
  title: ({ workspace }) => workspaces.find((item) => item.name === workspace)?.title ?? '',
  roles: Object.values(userRoles),
  defaultRoles: [userRoles.ADMINISTRATOR],
  workspaces: Object.values(workspaceTypes),
  defaultWorkspaces: [workspaceTypes.SANITY_STRUCTURE_TOOL],
});

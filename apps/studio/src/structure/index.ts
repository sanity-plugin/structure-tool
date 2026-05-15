import { structureToolPlugin } from 'sanity-plugin-structure-tool';

import { userRoles, workspaceTypes } from '@/constants/common';

export const { structure, templates, defineListItems } = structureToolPlugin({
  title: 'Sanity Structure Tool Title',
  roles: Object.values(userRoles),
  defaultRoles: [userRoles.ADMINISTRATOR],
  workspaces: Object.values(workspaceTypes),
  defaultWorkspaces: [workspaceTypes.SANITY_STRUCTURE_TOOL],
});

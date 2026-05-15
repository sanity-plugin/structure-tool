import { structureToolPlugin } from 'sanity-plugin-structure-tool';

import { userRoles, workspaceTypes } from '@/constants/common';

export const { structure, templates, defineListItems } = structureToolPlugin({
  title: 'Sanity Structure Tool Title',
  defaultRoles: [userRoles.ADMINISTRATOR],
  roles: Object.values(userRoles),
  workspaces: Object.values(workspaceTypes),
});

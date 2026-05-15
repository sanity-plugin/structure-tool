import { structureToolPlugin } from 'sanity-plugin-structure-tool';

import { userRoles } from '@/constants/common';

export const { structure, templates, defineListItems } = structureToolPlugin({
  title: 'Sanity Plugin Structure Tool Title',
  defaultRoles: [userRoles.ADMINISTRATOR],
  roles: Object.values(userRoles),
});

import { structureToolPlugin } from 'sanity-plugin-structure-tool';

import { userRoles, workspaceTypes } from '@/constants/common';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import workspaces from '@/workspace/workspaces';

export const { structure, templates, defineListItems } = structureToolPlugin({
  title: ({ workspace }) => workspaces.find((item) => item.name === workspace)?.title ?? '',
  workspaces: Object.values(workspaceTypes),
  defaultWorkspaces: [workspaceTypes.SANITY_STRUCTURE_TOOL],
  roles: Object.values(userRoles),
  defaultRoles: [userRoles.ADMINISTRATOR],
  i18n: {
    'en-US': {
      resources: en,
    },
    'es-ES': {
      resources: es,
    },
  },
});

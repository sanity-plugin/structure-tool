import { structureToolPlugin } from 'sanity-plugin-structure-tool';

import listItems from '@/sanity/listItems';

export const { structure, templates, defineListItem } = structureToolPlugin({
  title: 'Sanity Plugin Structure Tool Title',
  listItems,
  defaultRoles: ['admin', 'editor'],
  roles: ['administrator', 'admin', 'editor', 'viewer'],
});

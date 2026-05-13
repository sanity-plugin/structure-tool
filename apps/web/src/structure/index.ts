import { structureToolPlugin } from 'sanity-plugin-structure-tool';

export const { structure, templates, defineListItems } = structureToolPlugin({
  title: 'Sanity Plugin Structure Tool Title',
  defaultRoles: ['administrator', 'editor'],
  roles: ['administrator', 'editor', 'viewer'],
});

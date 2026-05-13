import { structureToolPlugin } from 'sanity-plugin-structure-tool';

// const defaultRoles = ['administrator', 'editor'] as const;

// const roles = ['administrator', 'editor', 'viewer'] as const;

export const { structure, templates, defineListItems } = structureToolPlugin({
  title: 'Sanity Plugin Structure Tool Title',
  // defaultRoles,
  // roles,
});

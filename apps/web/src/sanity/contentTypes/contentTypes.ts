import { ComponentIcon } from '@sanity/icons';

import { authorType } from '@/sanity/schemas/documents/authorType';

import type { ContentTypes } from 'sanity-plugin-structure-tool';

const contentTypes = [
  {
    schemaType: authorType.name,
    roles: [],
    workspaces: [],
  },
  {
    title: 'Drawer Example',
    icon: ComponentIcon,
    roles: [],
    workspaces: [],
    children: [
      {
        schemaType: authorType.name,
        roles: [],
        workspaces: [],
      },
    ],
  },
] satisfies ContentTypes[];

export default contentTypes;

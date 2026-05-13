import { defineListItems } from '@/structure';
import { ComponentIcon } from '@sanity/icons';

import { authorType } from '@/sanity/schemas/documents/authorType';

const listItems = defineListItems([
  {
    schemaType: authorType.name,
    roles: ({ defaultRoles }) => [],
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
]);

export default listItems;

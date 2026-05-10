import { ComponentIcon } from '@sanity/icons';

import { authorType } from '@/sanity/schemas/documents/authorType';

const contentTypes = [
  {
    title: authorType.title,
    schemaType: authorType.name,
    icon: authorType.icon,
  },
  {
    title: 'Drawer Example',
    icon: ComponentIcon,
    children: [
      {
        title: authorType.title,
        schemaType: authorType.name,
        icon: authorType.icon,
      },
    ],
  },
];

export default contentTypes;

import { defineListItems } from '@/structure';
import { ComponentIcon } from '@sanity/icons';

import { authorType } from '@/sanity/schemas/documents/authorType';

const listItems = defineListItems([
  {
    schemaType: authorType.name,
  },
  {
    title: 'Drawer Example',
    icon: ComponentIcon,
    children: [
      {
        schemaType: authorType.name,
      },
    ],
  },
]);

export default listItems;

import { defineField } from 'sanity';

import type { FieldDefinition } from 'sanity';

// Reason behind globalize it is, https://github.com/portabletext/portabletext/issues/41
type CreatePortableTextField = () => FieldDefinition;

const createPortableTextField: CreatePortableTextField = () =>
  defineField({
    title: 'Description',
    name: 'description',
    type: 'array',
    of: [
      {
        type: 'block',
      },
    ],
  });

export const portableTextBlockField = createPortableTextField();

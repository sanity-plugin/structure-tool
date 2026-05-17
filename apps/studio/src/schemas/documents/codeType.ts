import { CodeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { schemaNames } from '@/constants/schemaNames';

export const codeType = defineType({
  title: 'Code',
  name: schemaNames.CODE,
  type: 'document',
  icon: CodeIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
});

import { UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { customImageType } from '@/sanity/schemas/objects/customImageType';

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'avatar',
    },
  },
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
    }),
    defineField({
      title: 'Avatar',
      name: 'avatar',
      type: customImageType.name,
      validation: (rule) => rule.required(),
    }),
  ],
});

import { UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { schemaNames } from '@/constants/schemaNames';
import { customImageType } from '@/schemas/objects/customImageType';

export const authorType = defineType({
  title: 'Author',
  name: schemaNames.AUTHOR,
  type: 'document',
  icon: UserIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'avatar.image',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Avatar',
      name: 'avatar',
      type: customImageType.name,
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Active',
      name: 'isActive',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
  ],
});

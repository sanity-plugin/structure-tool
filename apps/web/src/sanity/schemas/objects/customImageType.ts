import { defineField, defineType } from 'sanity';

export const customImageType = defineType({
  title: 'Image',
  name: 'customImage',
  type: 'object',
  fields: [
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Alt',
      name: 'alt',
      type: 'string',
      description: 'Alternative text for screen readers and SEO',
      validation: (rule) => rule.required(),
    }),
  ],
});

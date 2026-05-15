import { CogIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { schemaNames } from '@/constants/schemaNames';
import { customImageType } from '@/schemas/objects/customImageType';

export const settingType = defineType({
  title: 'Setting',
  name: schemaNames.SETTING,
  type: 'document',
  icon: CogIcon,
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'avatar.image',
    },
  },
  fields: [
    defineField({
      title: 'Company Name',
      name: 'companyName',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Company Logo',
      name: 'companyLogo',
      type: customImageType.name,
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Maintenance Mode',
      name: 'maintenanceMode',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
  ],
});

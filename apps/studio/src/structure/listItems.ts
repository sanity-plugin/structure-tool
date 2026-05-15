import { AddUserIcon, ComponentIcon } from '@sanity/icons';

import { userRoles, workspaceTypes } from '@/constants/common';
import { schemaNames } from '@/constants/schemaNames';
import { defineListItems } from '@/structure';

const listItems = defineListItems([
  {
    title: 'Examples',
    isDivider: true,
  },
  {
    title: 'General',
    children: [
      {
        title: 'Default Listing',
        isDivider: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
      },
      {
        schemaType: schemaNames.AUTHOR,
        isPlural: false,
      },
      {
        schemaType: schemaNames.SETTING,
        singleton: true,
      },
      {
        title: 'Custom Author Title + Icon',
        icon: AddUserIcon,
        schemaType: schemaNames.AUTHOR,
      },
    ],
  },
  {
    title: 'Drawer',
    icon: ComponentIcon,
    children: [
      {
        schemaType: schemaNames.SETTING,
        singleton: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
      },
      {
        title: 'Author 2',
        icon: AddUserIcon,
        schemaType: schemaNames.AUTHOR,
      },
    ],
  },
  {
    title: 'Feature Examples',
    isDivider: true,
  },
  {
    title: 'Filters',
    children: [
      {
        title: 'Authors',
        children: [
          {
            title: 'Active',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive == true',
          },
          {
            title: 'Inactive',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive != true',
            hideAddButton: true,
          },
        ],
      },
      {
        title: 'Authors from GROQ',
        icon: AddUserIcon,
        filter: '_type == $author',
        filterParams: {
          author: schemaNames.AUTHOR,
        },
      },
      {
        title: 'Authors + Homepage from GROQ',
        icon: AddUserIcon,
        filter: '_type ==  $author || _type == $homepage',
        filterParams: {
          author: schemaNames.AUTHOR,
          homepage: schemaNames.SETTING,
        },
      },
    ],
  },
  {
    title: 'Workspaces',
    children: [
      {
        title: 'Custom Structure Builder Workspace Only',
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        singleton: true,
      },
      {
        title: 'Tools Workspace Only',
        isDivider: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
      },
    ],
  },
  {
    title: 'Roles',
    roles: [userRoles.VIEWER],
    workspaces: [workspaceTypes.TESTING],
    children: [
      {
        title: 'Admin Only',
        roles: () => [userRoles.ADMINISTRATOR],
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        roles: () => [userRoles.ADMINISTRATOR],
        singleton: true,
      },
      {
        title: 'Admin + Viewer',
        roles: [userRoles.VIEWER],
        isDivider: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
        roles: [userRoles.VIEWER],
      },
      {
        title: 'Viewer Only',
        roles: () => [userRoles.VIEWER],
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        roles: () => [userRoles.VIEWER],
        singleton: true,
      },
      {
        title: 'Tools Workspace Only',
        workspaces: [workspaceTypes.TESTING],
        isDivider: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
        workspaces: [workspaceTypes.TESTING],
      },
    ],
  },
  {
    title: 'Templates',
    children: [
      {
        title: 'Authors',
        children: [
          {
            title: 'Active',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive == true',
            templates: {
              isActive: true,
            },
          },
          {
            title: 'Inactive',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive != true',
            templates: {
              isActive: false,
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Raw',
    children: [
      {
        raw: (S) => S.divider().title('General'),
      },
      {
        raw: (S) =>
          S.listItem()
            .title('Homepage')
            .schemaType(schemaNames.SETTING)
            .child(
              S.editor().schemaType(schemaNames.SETTING).documentId(
                [
                  schemaNames.SETTING,
                  // constants.SINGLETON_KEY
                ].join('-'),
              ),
            ),
      },
      {
        raw: (S) =>
          S.listItem()
            .title('Authors')
            .schemaType(schemaNames.AUTHOR)
            .child(S.documentTypeList(schemaNames.AUTHOR).title('Authors')),
      },
      {
        raw: (S) =>
          S.listItem()
            .title('Author 2')
            .icon(AddUserIcon)
            .schemaType(schemaNames.AUTHOR)
            .child(S.documentTypeList(schemaNames.AUTHOR).title('Author 2')),
      },
      {
        raw: (S) => S.divider().title('Drawer Example'),
      },
      {
        raw: (S) =>
          S.listItem()
            .title('Drawer')
            .icon(ComponentIcon)
            .child(
              S.list()
                .title('Drawer')
                .items([
                  // Author
                  S.listItem()
                    .title('Authors')
                    .schemaType(schemaNames.AUTHOR)
                    .child(S.documentTypeList(schemaNames.AUTHOR).title('Authors')), // Author 2
                  S.listItem()
                    .title('Author 2')
                    .icon(AddUserIcon)
                    .schemaType(schemaNames.AUTHOR)
                    .child(S.documentTypeList(schemaNames.AUTHOR).title('Author 2')),
                ]),
            ),
      },
    ],
  },
]);

export default listItems;

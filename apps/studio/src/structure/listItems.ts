import { AddUserIcon, ComponentIcon } from '@sanity/icons';
import { constants } from 'sanity-plugin-structure-tool';

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
        title: 'Standard Listing',
        isDivider: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
      },
      {
        title: 'Standard Listing + isPlural: false',
        isDivider: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
        isPlural: false,
      },
      {
        title: 'Singleton View',
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        singleton: true,
      },
      {
        title: 'Custom Title + Icon',
        isDivider: true,
      },
      {
        title: 'Contributors',
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
        title: 'Level 1 Depth',
        isDivider: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
      },
      {
        title: 'Next Level',
        isDivider: true,
      },
      {
        title: 'Nested Drawer',
        children: [
          {
            title: 'Level 2 Depth',
            isDivider: true,
          },
          {
            schemaType: schemaNames.AUTHOR,
          },
          {
            title: 'Next Level',
            isDivider: true,
          },
          {
            title: 'Nested Drawer',
            children: [
              {
                title: 'Level 3 Depth',
                isDivider: true,
              },
              {
                schemaType: schemaNames.AUTHOR,
              },
              {
                title: 'Next Level',
                isDivider: true,
              },
              {
                title: 'Nested Drawer',
                children: [
                  {
                    title: 'Deeply Nested Navigation',
                    isDivider: true,
                  },
                  {
                    schemaType: schemaNames.AUTHOR,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Feature Demonstrations',
    isDivider: true,
  },
  {
    title: 'Filters',
    children: [
      {
        title: 'Filtering by Active Status',
        isDivider: true,
      },
      {
        title: 'Authors',
        children: [
          {
            title: 'Filtered: Active Only',
            isDivider: true,
          },
          {
            title: 'Active',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive == true',
          },
          {
            title: 'Filtered: Inactive (Add Disabled)',
            isDivider: true,
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
        title: 'Dynamic GROQ Queries',
        isDivider: true,
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
        title: 'Authors + Setting from GROQ',
        icon: AddUserIcon,
        filter: '_type ==  $author || _type == $setting',
        filterParams: {
          author: schemaNames.AUTHOR,
          setting: schemaNames.SETTING,
        },
      },
    ],
  },
  {
    title: 'Workspaces',
    workspaces: [workspaceTypes.TESTING],
    children: [
      {
        title: 'Default',
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        singleton: true,
      },
      {
        title: 'Sanity Structure Tool Only',
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
        isDivider: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
        singleton: true,
      },
      {
        title: 'Sanity Structure Tool + Testing Workspace',
        workspaces: [workspaceTypes.TESTING],
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        workspaces: [workspaceTypes.TESTING],
        singleton: true,
      },
      {
        title: 'Testing Workspace Only',
        workspaces: () => [workspaceTypes.TESTING],
        isDivider: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
        workspaces: () => [workspaceTypes.TESTING],
      },
    ],
  },
  {
    title: 'Roles',
    roles: [userRoles.VIEWER],
    children: [
      {
        title: 'Default',
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        singleton: true,
      },
      {
        title: 'Admin Only',
        roles: () => [userRoles.ADMINISTRATOR],
        isDivider: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
        roles: () => [userRoles.ADMINISTRATOR],
      },
      {
        title: 'Admin + Viewer',
        roles: [userRoles.VIEWER],
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        roles: [userRoles.VIEWER],
        singleton: true,
      },
      {
        title: 'Viewer Only',
        roles: () => [userRoles.VIEWER],
        isDivider: true,
      },
      {
        schemaType: schemaNames.AUTHOR,
        roles: () => [userRoles.VIEWER],
      },
    ],
  },
  {
    title: 'Workspaces + Roles',
    roles: [userRoles.VIEWER],
    workspaces: [workspaceTypes.TESTING],
    children: [
      {
        title: 'Default',
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        singleton: true,
      },
      {
        title: 'Admin Only + Default Workspace',
        roles: () => [userRoles.ADMINISTRATOR],
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        roles: () => [userRoles.ADMINISTRATOR],
        singleton: true,
      },
      {
        title: 'Default Role + Sanity Structure Tool Only',
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
        singleton: true,
      },
      {
        title: 'Admin Role Only + Sanity Structure Tool Only',
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
        roles: () => [userRoles.ADMINISTRATOR],
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
        roles: () => [userRoles.ADMINISTRATOR],
        singleton: true,
      },
      {
        title: 'Viewer Only + Default Workspace',
        roles: () => [userRoles.VIEWER],
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        roles: () => [userRoles.VIEWER],
        singleton: true,
      },
      {
        title: 'Default Role + Testing Workspace Only',
        workspaces: () => [workspaceTypes.TESTING],
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        workspaces: () => [workspaceTypes.TESTING],
        singleton: true,
      },
      {
        title: 'Viewer Role Only + Testing Workspace Only',
        workspaces: () => [workspaceTypes.TESTING],
        roles: () => [userRoles.VIEWER],
        isDivider: true,
      },
      {
        schemaType: schemaNames.SETTING,
        workspaces: () => [workspaceTypes.TESTING],
        roles: () => [userRoles.VIEWER],
        singleton: true,
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
            title: 'Restricted To: Active State',
            isDivider: true,
          },
          {
            title: 'Active',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive == true',
            templates: {
              isActive: true,
            },
          },
          {
            title: 'Restricted To: Inactive State',
            isDivider: true,
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
        raw: (S) => S.divider().title('Standard Listing'),
      },
      {
        raw: (S) =>
          S.listItem()
            .title('Authors')
            .schemaType(schemaNames.AUTHOR)
            .child(S.documentTypeList(schemaNames.AUTHOR).title('Authors')),
      },
      {
        raw: (S) => S.divider().title('Singleton View'),
      },
      {
        raw: (S) =>
          S.listItem()
            .title('Setting')
            .schemaType(schemaNames.SETTING)
            .child(
              S.editor()
                .schemaType(schemaNames.SETTING)
                .documentId([schemaNames.SETTING, constants.SINGLETON_KEY].join('-')),
            ),
      },
      {
        raw: (S) => S.divider().title('Custom Title + Icon'),
      },
      {
        raw: (S) =>
          S.listItem()
            .title('Contributors')
            .icon(AddUserIcon)
            .schemaType(schemaNames.AUTHOR)
            .child(S.documentTypeList(schemaNames.AUTHOR).title('Author 2')),
      },
      {
        raw: (S) => S.divider().title('Drawer'),
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
                  S.divider().title('Level 1 Depth'),
                  S.listItem()
                    .title('Authors')
                    .schemaType(schemaNames.AUTHOR)
                    .child(S.documentTypeList(schemaNames.AUTHOR).title('Authors')),
                  S.divider().title('Next Level'),
                  S.listItem()
                    .title('Nested Drawer')
                    .icon(ComponentIcon)
                    .child(
                      S.list()
                        .title('Drawer')
                        .items([
                          S.divider().title('Level 2 Depth'),
                          S.listItem()
                            .title('Authors')
                            .schemaType(schemaNames.AUTHOR)
                            .child(S.documentTypeList(schemaNames.AUTHOR).title('Authors')),
                          S.divider().title(
                            'Drawer code reached a point where even the compiler said “bro enough”',
                          ),
                        ]),
                    ),
                ]),
            ),
      },
    ],
  },
]);

export default listItems;

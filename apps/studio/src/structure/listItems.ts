import { AddUserIcon, BookIcon, ComponentIcon, LogoTsIcon } from '@sanity/icons';
import { constants } from 'sanity-plugin-structure-tool';

import { Documentation, TypeScriptDocumentation } from '@/components/Components';
import { userRoles, workspaceTypes } from '@/constants/common';
import { schemaNames } from '@/constants/schemaNames';
import { defineListItems, helpers } from '@/structure';

const listItems = defineListItems([
  helpers.divider({
    title: 'Examples',
  }),
  {
    title: 'General',
    children: [
      helpers.divider({
        title: 'Standard Listing',
      }),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
      }),
      helpers.divider({
        title: 'Standard Listing + isPlural: false',
      }),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
        isPlural: false,
      }),
      helpers.divider({
        title: 'Singleton View',
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
      }),
      helpers.divider({
        title: 'Custom Title + Icon',
      }),
      helpers.listing({
        title: 'Contributors',
        icon: AddUserIcon,
        schemaType: schemaNames.AUTHOR,
      }),
    ],
  },
  {
    title: 'Drawer',
    icon: ComponentIcon,
    children: [
      helpers.divider({
        title: 'Level 1 Depth',
      }),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
      }),
      helpers.divider({
        title: 'Next Level',
      }),
      {
        title: 'Nested Drawer',
        children: [
          helpers.divider({
            title: 'Level 2 Depth',
          }),
          helpers.listing({
            schemaType: schemaNames.AUTHOR,
          }),
          helpers.divider({
            title: 'Next Level',
          }),
          {
            title: 'Nested Drawer',
            children: [
              helpers.divider({
                title: 'Level 3 Depth',
              }),
              helpers.listing({
                schemaType: schemaNames.AUTHOR,
              }),
              helpers.divider({
                title: 'Next Level',
              }),
              {
                title: 'Nested Drawer',
                children: [
                  helpers.divider({
                    title: 'Deeply Nested Navigation',
                  }),
                  helpers.listing({
                    schemaType: schemaNames.AUTHOR,
                  }),
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  helpers.divider({
    title: 'Feature Demonstrations',
  }),
  {
    title: 'Components',
    children: [
      helpers.divider({
        title: 'Documentation ( iframe )',
      }),
      {
        title: 'Documentation',
        icon: BookIcon,
        component: Documentation,
      },
      helpers.divider({
        title: 'TypeScript Documentation ( iframe )',
      }),
      {
        title: 'TypeScript Documentation',
        icon: LogoTsIcon,
        component: TypeScriptDocumentation,
      },
    ],
  },
  {
    title: 'Filters',
    children: [
      helpers.divider({
        title: 'Filtering by Active Status',
      }),
      {
        title: 'Authors',
        children: [
          helpers.divider({
            title: 'Filtered: Active Only',
          }),
          helpers.listing({
            title: 'Active',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive == true',
          }),
          helpers.divider({
            title: 'Filtered: Inactive (Add Disabled)',
          }),
          helpers.listing({
            title: 'Inactive',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive != true',
            hideAddButton: true,
          }),
        ],
      },
      helpers.divider({
        title: 'Dynamic GROQ Queries',
      }),
      helpers.listing({
        title: 'Authors from GROQ',
        icon: AddUserIcon,
        filter: '_type == $author',
        filterParams: {
          author: schemaNames.AUTHOR,
        },
      }),
      helpers.listing({
        title: 'Authors + Setting from GROQ',
        icon: AddUserIcon,
        filter: '_type ==  $author || _type == $setting',
        filterParams: {
          author: schemaNames.AUTHOR,
          setting: schemaNames.SETTING,
        },
      }),
    ],
  },
  {
    title: 'Workspaces',
    workspaces: [workspaceTypes.TESTING],
    children: [
      helpers.divider({
        title: 'Default',
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
      }),
      helpers.divider({
        title: 'Sanity Structure Tool Only',
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
      }),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
      }),
      helpers.divider({
        title: 'Sanity Structure Tool + Testing Workspace',
        workspaces: [workspaceTypes.TESTING],
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
        workspaces: [workspaceTypes.TESTING],
      }),
      helpers.divider({
        title: 'Testing Workspace Only',
        workspaces: () => [workspaceTypes.TESTING],
      }),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
        workspaces: () => [workspaceTypes.TESTING],
      }),
    ],
  },
  {
    title: 'Roles',
    roles: [userRoles.VIEWER],
    children: [
      helpers.divider({
        title: 'Default',
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
      }),
      helpers.divider({
        title: 'Admin Only',
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.divider({
        title: 'Admin + Viewer',
        roles: [userRoles.VIEWER],
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
        roles: [userRoles.VIEWER],
      }),
      helpers.divider({
        title: 'Viewer Only',
        roles: () => [userRoles.VIEWER],
      }),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
        roles: () => [userRoles.VIEWER],
      }),
    ],
  },
  {
    title: 'Workspaces + Roles',
    roles: [userRoles.VIEWER],
    workspaces: [workspaceTypes.TESTING],
    children: [
      helpers.divider({
        title: 'Default',
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
      }),
      helpers.divider({
        title: 'Admin Only + Default Workspace',
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.divider({
        title: 'Default Role + Sanity Structure Tool Only',
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
      }),
      helpers.divider({
        title: 'Admin Role Only + Sanity Structure Tool Only',
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.divider({
        title: 'Viewer Only + Default Workspace',
        roles: () => [userRoles.VIEWER],
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
        roles: () => [userRoles.VIEWER],
      }),
      helpers.divider({
        title: 'Default Role + Testing Workspace Only',
        workspaces: () => [workspaceTypes.TESTING],
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
        workspaces: () => [workspaceTypes.TESTING],
      }),
      helpers.divider({
        title: 'Viewer Role Only + Testing Workspace Only',
        workspaces: () => [workspaceTypes.TESTING],
        roles: () => [userRoles.VIEWER],
      }),
      helpers.singleton({
        schemaType: schemaNames.SETTING,
        workspaces: () => [workspaceTypes.TESTING],
        roles: () => [userRoles.VIEWER],
      }),
    ],
  },
  {
    title: 'Templates',
    children: [
      {
        title: 'Authors',
        children: [
          helpers.divider({
            title: 'Restricted To: Active State',
          }),
          helpers.listing({
            title: 'Active',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive == true',
            templates: {
              isActive: true,
            },
          }),
          helpers.divider({
            title: 'Restricted To: Inactive State',
          }),
          helpers.listing({
            title: 'Inactive',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive != true',
            templates: {
              isActive: false,
            },
          }),
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
            .child(S.documentTypeList(schemaNames.AUTHOR).title('Contributors')),
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
  helpers.divider({
    title: 'Code',
  }),
  helpers.singleton({
    title: 'Code',
    schemaType: schemaNames.CODE,
  }),
]);

export default listItems;

import { userRoles, workspaceTypes } from '@/constants/common';
import { defineListItems, helpers } from '@/structure';
import { AddUserIcon, BookIcon, ComponentIcon, LogoTsIcon } from '@sanity/icons';
import { constants } from 'sanity-plugin-structure-tool';

import { Documentation, TypeScriptDocumentation } from '@/components/Components';
import { schemaNames } from '@/constants/schemaNames';

const listItems = defineListItems([
  helpers.divider('Examples'),
  {
    title: 'General',
    children: [
      helpers.divider('Standard Listing'),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
      }),
      helpers.divider('Standard Listing + isPlural: false'),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
        isPlural: false,
      }),
      helpers.divider('Singleton View'),
      helpers.singleton(schemaNames.SETTING),
      helpers.divider('Custom Title + Icon'),
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
      helpers.divider('Level 1 Depth'),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
      }),
      helpers.divider('Next Level'),
      {
        title: 'Nested Drawer',
        children: [
          helpers.divider('Level 2 Depth'),
          helpers.listing({
            schemaType: schemaNames.AUTHOR,
          }),
          helpers.divider('Next Level'),
          {
            title: 'Nested Drawer',
            children: [
              helpers.divider('Level 3 Depth'),
              helpers.listing({
                schemaType: schemaNames.AUTHOR,
              }),
              helpers.divider('Next Level'),
              {
                title: 'Nested Drawer',
                children: [
                  helpers.divider('Deeply Nested Navigation'),
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
  helpers.divider('Feature Demonstrations'),
  {
    title: 'Components',
    children: [
      helpers.divider('Documentation ( iframe )'),
      {
        title: 'Documentation',
        icon: BookIcon,
        component: Documentation,
      },
      helpers.divider('TypeScript Documentation ( iframe )'),
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
      helpers.divider('Filtering by Active Status'),
      {
        title: 'Authors',
        children: [
          helpers.divider('Filtered: Active Only'),
          helpers.listing({
            title: 'Active',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive == true',
          }),
          helpers.divider('Filtered: Inactive (Add Disabled)'),
          helpers.listing({
            title: 'Inactive',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive != true',
            hideAddButton: true,
          }),
        ],
      },
      helpers.divider('Dynamic GROQ Queries'),
      helpers.filters({
        title: 'Authors from GROQ',
        icon: AddUserIcon,
        filter: '_type == $author',
        filterParams: {
          author: schemaNames.AUTHOR,
        },
      }),
      helpers.filters({
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
      helpers.divider('Default'),
      helpers.singleton(schemaNames.SETTING),
      helpers.divider('Sanity Structure Tool Only', {
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
      }),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
      }),
      helpers.divider('Sanity Structure Tool + Testing Workspace', {
        workspaces: [workspaceTypes.TESTING],
      }),
      helpers.singleton(schemaNames.SETTING, {
        workspaces: [workspaceTypes.TESTING],
      }),
      helpers.divider('Testing Workspace Only', {
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
      helpers.divider('Default'),
      helpers.singleton(schemaNames.SETTING),
      helpers.divider('Admin Only', {
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.listing({
        schemaType: schemaNames.AUTHOR,
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.divider('Admin + Viewer', {
        roles: [userRoles.VIEWER],
      }),
      helpers.singleton(schemaNames.SETTING, {
        roles: [userRoles.VIEWER],
      }),
      helpers.divider('Viewer Only', {
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
      helpers.divider('Default'),
      helpers.singleton(schemaNames.SETTING),
      helpers.divider('Admin Only + Default Workspace', {
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.singleton(schemaNames.SETTING, {
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.divider('Default Role + Sanity Structure Tool Only', {
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
      }),
      helpers.singleton(schemaNames.SETTING, {
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
      }),
      helpers.divider('Admin Role Only + Sanity Structure Tool Only', {
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.singleton(schemaNames.SETTING, {
        workspaces: () => [workspaceTypes.SANITY_STRUCTURE_TOOL],
        roles: () => [userRoles.ADMINISTRATOR],
      }),
      helpers.divider('Viewer Only + Default Workspace', {
        roles: () => [userRoles.VIEWER],
      }),
      helpers.singleton(schemaNames.SETTING, {
        roles: () => [userRoles.VIEWER],
      }),
      helpers.divider('Default Role + Testing Workspace Only', {
        workspaces: () => [workspaceTypes.TESTING],
      }),
      helpers.singleton(schemaNames.SETTING, {
        workspaces: () => [workspaceTypes.TESTING],
      }),
      helpers.divider('Viewer Role Only + Testing Workspace Only', {
        workspaces: () => [workspaceTypes.TESTING],
        roles: () => [userRoles.VIEWER],
      }),
      helpers.singleton(schemaNames.SETTING, {
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
          helpers.divider('Restricted To: Active State'),
          helpers.listing({
            title: 'Active',
            schemaType: schemaNames.AUTHOR,
            filter: 'isActive == true',
            templates: {
              isActive: true,
            },
          }),
          helpers.divider('Restricted To: Inactive State'),
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
  helpers.divider('Code'),
  helpers.singleton(schemaNames.CODE),
]);

export default listItems;

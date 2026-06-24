import { AddUserIcon, BookIcon, ComponentIcon, LogoTsIcon } from '@sanity/icons';
import { constants } from 'sanity-plugin-structure-tool';

import { IframeComponent } from '@/components/Components';
import { userRoles, workspaceTypes } from '@/constants/common';
import { schemaNames } from '@/constants/schemaNames';
import { defineListItems } from '@/structure';

const listItems = defineListItems(({ helpers }) => [
  helpers.divider('Examples'),
  {
    title: 'General',
    children: [
      helpers.divider('Standard Listing'),
      helpers.listing(schemaNames.AUTHOR),
      helpers.divider('Standard Listing + isPlural: false'),
      helpers.listing(schemaNames.AUTHOR, {
        isPlural: false,
      }),
      helpers.divider('Different title for Parent/Child'),
      helpers.listing(schemaNames.AUTHOR, {
        title: {
          parent: 'Parent Title',
          child: 'Child Title',
        },
      }),
      helpers.divider('Singleton View'),
      helpers.singleton(schemaNames.SETTING),
      helpers.divider('Custom Id (id: custom-static-id)'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Authors with Custom Id',
        id: 'custom-static-id',
      }),
      helpers.divider('API Version (2025-02-19)'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Authors',
        apiVersion: '2025-02-19',
      }),
    ],
  },
  {
    title: 'Icons',
    children: [
      helpers.divider('Custom Title + Icon'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Contributors',
        icon: AddUserIcon,
      }),
      helpers.divider('No Icon for List Item (icon: false)'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Author Listing (Hidden Icon)',
        icon: false,
      }),
      helpers.divider('No Icons for Child List (showIcons: false)'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Authors (No Icons)',
        showIcons: false,
      }),
    ],
  },
  {
    title: 'Drawer',
    children: [
      helpers.divider('Level 1 Depth'),
      helpers.listing(schemaNames.AUTHOR),
      helpers.divider('Next Level'),
      {
        title: 'Nested Drawer',
        children: [
          helpers.divider('Level 2 Depth'),
          helpers.listing(schemaNames.AUTHOR),
          helpers.divider('Next Level'),
          {
            title: 'Nested Drawer',
            children: [
              helpers.divider('Level 3 Depth'),
              helpers.listing(schemaNames.AUTHOR),
              helpers.divider('Next Level'),
              {
                title: 'Nested Drawer',
                children: [
                  helpers.divider('Deeply Nested Navigation'),
                  helpers.listing(schemaNames.AUTHOR),
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
      helpers.divider('Documentation'),
      helpers.component('Documentation', IframeComponent, {
        icon: BookIcon,
        componentOptions: {
          url: 'https://sanity-structure-tool.nishargshah.dev',
        },
      }),
      helpers.divider('Documentation Without Child Title'),
      helpers.component({
        title: {
          parent: 'Documentation',
          child: '',
        },
        component: IframeComponent,
        icon: BookIcon,
        componentOptions: {
          url: 'https://sanity-structure-tool.nishargshah.dev',
        },
      }),
      helpers.divider('TypeScript Documentation'),
      helpers.component('TypeScript Documentation', IframeComponent, {
        icon: LogoTsIcon,
        componentOptions: {
          url: 'https://www.typescriptlang.org',
        },
      }),
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
          helpers.listing(schemaNames.AUTHOR, {
            title: 'Active',
            filter: 'isActive == true',
          }),
          helpers.divider('Filtered: Inactive (Add Disabled)'),
          helpers.listing(schemaNames.AUTHOR, {
            title: 'Inactive',
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
    title: 'Default Ordering',
    children: [
      helpers.divider('Sorting: Author by Name'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Sort by Name (Asc)',
        defaultOrdering: {
          name: 'asc',
        },
      }),
      helpers.divider('Sorting: Author by Updated At'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Sort by Updated At (desc)',
        defaultOrdering: {
          _updatedAt: 'desc',
        },
      }),
    ],
  },
  {
    title: 'Default Layout',
    children: [
      helpers.divider('Default Layout'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Default Layout',
        defaultLayout: 'default',
      }),
      helpers.divider('Block Layout'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Block Layout',
        defaultLayout: 'block',
      }),
      helpers.divider('Detail Layout'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Detail Layout',
        defaultLayout: 'detail',
      }),
      helpers.divider('Media Layout'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Media Layout',
        defaultLayout: 'media',
      }),
    ],
  },
  {
    title: 'Menu Items',
    children: [
      helpers.divider('Grouped Menu Actions (menuItemGroups)'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Authors with Grouped Actions',
        menuItemGroups: [
          {
            id: 'export-group',
            title: 'Export Options',
          },
        ],
        menuItems: [
          {
            title: 'Export to CSV',
            action: 'export-csv',
            group: 'export-group',
          },
          {
            title: 'Export to JSON',
            action: 'export-json',
            group: 'export-group',
          },
        ],
      }),
      helpers.divider('Menu Action (menuItems)'),
      helpers.listing(schemaNames.AUTHOR, {
        title: 'Authors with Menu Action',
        menuItems: [
          {
            title: 'Export to CSV',
            id: 'export-csv',
            action: 'export-csv',
          },
        ],
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
      helpers.listing(schemaNames.AUTHOR, {
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
      helpers.listing(schemaNames.AUTHOR, {
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
      helpers.listing(schemaNames.AUTHOR, {
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
      helpers.listing(schemaNames.AUTHOR, {
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
          helpers.listing(schemaNames.AUTHOR, {
            title: 'Active',
            filter: 'isActive == true',
            templates: {
              isActive: true,
            },
          }),
          helpers.divider('Restricted To: Inactive State'),
          helpers.listing(schemaNames.AUTHOR, {
            title: 'Inactive',
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
      helpers.raw((S) => S.divider().title('Standard Listing')),
      helpers.raw((S) =>
        S.listItem()
          .title('Authors')
          .schemaType(schemaNames.AUTHOR)
          .child(S.documentTypeList(schemaNames.AUTHOR).title('Authors')),
      ),
      helpers.raw((S) => S.divider().title('Singleton View')),
      helpers.raw((S) =>
        S.listItem()
          .title('Setting')
          .schemaType(schemaNames.SETTING)
          .child(
            S.editor()
              .schemaType(schemaNames.SETTING)
              .documentId([schemaNames.SETTING, constants.SINGLETON_KEY].join('-')),
          ),
      ),
      helpers.raw((S) => S.divider().title('Custom Title + Icon')),
      helpers.raw((S) =>
        S.listItem()
          .title('Contributors')
          .icon(AddUserIcon)
          .schemaType(schemaNames.AUTHOR)
          .child(S.documentTypeList(schemaNames.AUTHOR).title('Contributors')),
      ),
      helpers.raw((S) => S.divider().title('Drawer')),
      helpers.raw((S) =>
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
      ),
    ],
  },
  helpers.divider('Code'),
  helpers.singleton(schemaNames.CODE),
]);

export default listItems;

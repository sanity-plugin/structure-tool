# `menuItemGroups` {#menu-item-groups}

- **Type**: `MenuItemGroup[] | ((params: CallbackParams) => MenuItemGroup[])`
- **Optional**: Yes

The `menuItemGroups` property allows you to group multiple custom menu items under collapsible sections or specific categories in the pane header menu.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
import { DownloadIcon, TrashIcon } from '@sanity/icons';

{
  title: 'Articles',
  schemaType: 'article',
  menuItemGroups: [
    {
      id: 'actions-group',
      title: 'Database Actions',
    },
  ],
  menuItems: [
    {
      title: 'Export to CSV',
      icon: DownloadIcon,
      action: 'export-csv',
      group: 'actions-group',
    },
    {
      title: 'Purge Records',
      icon: TrashIcon,
      action: 'purge',
      group: 'actions-group',
    },
  ],
}
```

```ts [Helpers]
import { DownloadIcon, TrashIcon } from '@sanity/icons';

helpers.listing('article', {
  title: 'Articles',
  menuItemGroups: [
    {
      id: 'actions-group',
      title: 'Database Actions',
    },
  ],
  menuItems: [
    {
      title: 'Export to CSV',
      icon: DownloadIcon,
      action: 'export-csv',
      group: 'actions-group',
    },
    {
      title: 'Purge Records',
      icon: TrashIcon,
      action: 'purge',
      group: 'actions-group',
    },
  ],
});
```

:::

## Dynamic Menu Groups (Callback) {#dynamic-menu-groups}

You can dynamically configure the menu groups using a callback function based on the active desk context.

::: code-group

```ts [JSON]
{
  title: 'Articles',
  schemaType: 'article',
  menuItemGroups: ({ workspace }) => [
    {
      id: 'actions-group',
      title: `${workspace === 'production' ? 'Live' : 'Staging'} Actions`,
    },
  ],
}
```

```ts [Helpers]
helpers.listing('article', {
  title: 'Articles',
  menuItemGroups: ({ workspace }) => [
    {
      id: 'actions-group',
      title: `${workspace === 'production' ? 'Live' : 'Staging'} Actions`,
    },
  ],
});
```

:::

For defining menu items, see the **[menuItems](./menu-items)** page.

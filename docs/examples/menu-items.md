# `menuItems` {#menu-items}

- **Type**: `MenuItem[] | ((params: CallbackParams) => MenuItem[])`
- **Optional**: Yes

The `menuItems` property allows you to define custom actions in the pane header menu of document lists, custom components, or standard lists.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
import { DownloadIcon } from '@sanity/icons';

{
  title: 'Articles',
  schemaType: 'article',
  menuItems: [
    {
      title: 'Export to CSV',
      icon: DownloadIcon,
      action: 'export-csv',
      showAsAction: true,
    },
  ],
}
```

```ts [Helpers]
import { DownloadIcon } from '@sanity/icons';

helpers.listing('article', {
  title: 'Articles',
  menuItems: [
    {
      title: 'Export to CSV',
      icon: DownloadIcon,
      action: 'export-csv',
      showAsAction: true,
    },
  ],
});
```

:::

## Dynamic Menu Items (Callback) {#dynamic-menu-items}

You can dynamically show or hide menu items using a callback function based on the active desk context.

::: code-group

```ts [JSON]
import { DownloadIcon, TrashIcon } from '@sanity/icons';

{
  title: 'Articles',
  schemaType: 'article',
  menuItems: ({ currentUser }) => {
    const items = [
      {
        title: 'Export',
        icon: DownloadIcon,
        action: 'export',
        showAsAction: true,
      },
    ];

    if (currentUser.roles.some((role) => role.name === 'administrator')) {
      items.push({
        title: 'Purge Deleted',
        icon: TrashIcon,
        action: 'purge',
        showAsAction: false,
      });
    }

    return items;
  },
}
```

```ts [Helpers]
import { DownloadIcon, TrashIcon } from '@sanity/icons';

helpers.listing('article', {
  title: 'Articles',
  menuItems: ({ currentUser }) => {
    const items = [
      {
        title: 'Export',
        icon: DownloadIcon,
        action: 'export',
        showAsAction: true,
      },
    ];

    if (currentUser.roles.some((role) => role.name === 'administrator')) {
      items.push({
        title: 'Purge Deleted',
        icon: TrashIcon,
        action: 'purge',
        showAsAction: false,
      });
    }

    return items;
  },
});
```

:::

For grouping menu items, see the **[menuItemGroups](./menu-item-groups)** page.

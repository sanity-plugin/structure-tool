# `menuItemGroups` {#menu-item-groups}

- **Type**: `MenuItemGroup[] | ((params: CallbackParams & { prev: MenuItemGroup[]; childOptions: ChildResolverOptions }) => MenuItemGroup[])`
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

## Working with Existing Groups (`prev`) {#working-with-prev}

When using a callback function, the callback parameters object includes a `prev` property containing the default menu item groups from Sanity Studio. You can use this to append, prepend, or filter existing groups.

::: code-group

```ts [JSON]
{
  title: 'Articles',
  schemaType: 'article',
  menuItemGroups: ({ prev }) => [
    ...prev,
    {
      id: 'custom-group',
      title: 'Custom Actions',
    },
  ],
}
```

```ts [Helpers]
helpers.listing('article', {
  title: 'Articles',
  menuItemGroups: ({ prev }) => [
    ...prev,
    {
      id: 'custom-group',
      title: 'Custom Actions',
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

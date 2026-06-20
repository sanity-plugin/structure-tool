# Define List Items {#define-list-items}

Once you have [configured the structure](./configuration), you can build your studio's desk hierarchy. The plugin provides both a set of type-safe `helpers` and standard `define` utilities for raw objects.

You should keep your list items in a separate file (e.g., `src/structure/listItems.ts`).

## Defining Items {#defining-items}

You can define your structure using either `helpers` for a cleaner syntax and better type intelligence, or raw objects using `defineListItems`. Both approaches are fully type-safe.

For a detailed reference of all helper methods like `helpers.listing`, `helpers.singleton`, and `helpers.divider`, check the [Type-Safe Helpers Guide](../helpers).

If you prefer not to import the generated `helpers` object in every structure file, `defineListItems` accepts a callback function that passes `{ helpers }` directly.

::: code-group

```ts [JSON]
import { defineListItems } from './index';

const listItems = defineListItems([
  {
    title: 'General',
    isDivider: true,
  },
  {
    schemaType: 'author',
  },
  {
    title: 'Settings',
    schemaType: 'settings',
    singleton: true,
  },
  {
    title: 'System',
    isDivider: true,
  },
  {
    title: 'Config',
    children: [
      {
        schemaType: 'apiSettings',
        singleton: true,
      },
      {
        schemaType: 'siteBranding',
        singleton: true,
      },
    ],
  },
]);

export default listItems;
```

```ts [Helpers (Import)]
import { defineListItems, helpers } from './index';

const listItems = defineListItems([
  helpers.divider('General'),
  helpers.listing('author'),
  helpers.singleton('settings'),
  helpers.divider('System'),
  helpers.children('Config', [helpers.singleton('apiSettings'), helpers.singleton('siteBranding')]),
]);

export default listItems;
```

```ts [Helpers (Callback)]
import { defineListItems } from './index';

const listItems = defineListItems(({ helpers }) => [
  helpers.divider('General'),
  helpers.listing('author'),
  helpers.singleton('settings'),
  helpers.divider('System'),
  helpers.children('Config', [helpers.singleton('apiSettings'), helpers.singleton('siteBranding')]),
]);

export default listItems;
```

:::

## Why use `defineListItems`? {#why-use-define-list-items}

While you could define your structure as a plain array, using `defineListItems` (or the generated `helpers`) offers several key advantages:

1.  **Type Safety**: Ensures every item follows the `ListItem` schema.
2.  **Contextual IntelliSense**: If you configured `roles` or `workspaces` in your [setup](./configuration), they will be available as autocomplete options within your list items.
3.  **Validation**: Catches common mistakes, like missing a `title` when an item has `children`.

You can also use the generated `helpers` directly for a cleaner syntax and better autocomplete. Learn more in the [Type-Safe Helpers Guide](../helpers).

## Individual Items {#individual-items}

If you need to define and export a single item (for example, to reuse it across different lists), use the [`defineListItem`](./configuration#return-define-list-item) utility. Alternatively, you can use the generated `helpers` (like `helpers.listing` or `helpers.singleton`) directly for better type safety, autocomplete, and cleaner syntax.

Just like `defineListItems`, the `defineListItem` utility also supports a callback function that passes the `helpers` context, so you don't have to import it locally:

::: code-group

```ts [JSON]
import { defineListItem } from './index';

export const blogSection = defineListItem({
  title: 'Blog',
  schemaType: 'post',
});
```

```ts [Helpers (Import)]
import { helpers } from './index';

export const blogSection = helpers.listing('post', {
  title: 'Blog',
});
```

```ts [Helpers (Callback)]
import { defineListItem } from './index';

export const blogSection = defineListItem(({ helpers }) =>
  helpers.listing('post', {
    title: 'Blog',
  }),
);
```

:::

## Key Item Properties {#key-item-properties}

The `ListItem` configuration supports a wide range of properties. For a full list of available fields and their usage, see the **[List Items Guide](../list-items)**.

## Important Note on Workspaces & Roles {#important-note-on-workspaces-roles}

The availability of `workspaces` and `roles` properties on your list items depends entirely on your initial [configuration](./configuration).

- **Workspace Protection**: The `workspaces` property will only be available if they were explicitly configured at the plugin level.
- **Role Protection**: Similarly, if `roles` were not defined during setup, the `roles` property will be hidden from types, preventing you from using the roles.

This strict coupling ensures that your access control logic remains consistent and type-safe throughout your project.

# Define List Items {#define-list-items}

Once you have [configured the structure](./configuration), you can use the generated `defineListItems` helper to build your studio's desk hierarchy. This utility provides comprehensive **type safety** and **IntelliSense** tailored to your project's specific configuration.

We recommend keeping your list items in a separate file (e.g., `src/structure/listItems.ts`).

::: code-group

```ts [src/structure/listItems.ts]
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
]);

export default listItems;
```

:::

## Why use `defineListItems`? {#why-use-define-list-items}

While you could define your structure as a plain array, using `defineListItems` offers several key advantages:

1.  **Type Safety**: Ensures every item follows the `ListItem` schema.
2.  **Contextual IntelliSense**: If you configured `roles` or `workspaces` in your [setup](./configuration), they will be available as autocomplete options within your list items.
3.  **Validation**: Catches common mistakes, like missing a `title` when an item has `children`.

## Individual Items {#individual-items}

If you need to define and export a single item (for example, to reuse it across different lists), use the [`defineListItem`](./configuration#return-define-list-item) utility:

```ts
import { defineListItem } from './index';

export const blogSection = defineListItem({
  title: 'Blog',
  schemaType: 'post',
});
```

## Key Item Properties {#key-item-properties}

The `ListItem` configuration supports a wide range of properties. For a full list of available fields and their usage, see the **[List Items Guide](../list-items)**.

## Important Note on Workspaces & Roles {#important-note-on-workspaces-roles}

The availability of `workspaces` and `roles` properties on your list items depends entirely on your initial [configuration](./configuration).

- **Workspace Protection**: The `workspaces` property will only be available if they were explicitly configured at the plugin level.
- **Role Protection**: Similarly, if `roles` were not defined during setup, the `roles` property will be hidden from types, preventing you from using the roles.

This strict coupling ensures that your access control logic remains consistent and type-safe throughout your project.

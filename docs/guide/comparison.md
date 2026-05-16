# Comparison: Plugin vs Native {#comparison-plugin-vs-native}

**Sanity Structure Tool** is designed to eliminate the repetitive boilerplate required by the native Sanity Structure Builder. This guide demonstrates the code reduction and clarity gained by switching to a declarative approach.

## Standard Desk Hierarchy {#standard-desk}

In a typical studio, you often need to handle singletons (like "Settings"), dividers, and standard document lists.

::: code-group
```ts [Sanity Structure Tool]
import { defineListItems } from './index';

const listItems = defineListItems([
  {
    title: 'Site Settings',
    schemaType: 'settings',
    singleton: true, // Automatically handles id and editor view
  },
  { 
    isDivider: true,
  },
  {
    schemaType: 'post', // Automatically pluralizes title and adds icon
  },
]);
```

```ts [Native Structure Builder]
export const structure = (S) =>
  S.list()
    .title('Desk')
    .items([
      // 1. Singletons require manual id and child definition
      S.listItem()
        .title('Site Settings')
        .id('settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      
      S.divider(),

      // 2. Standard items require explicit list item calls
      S.documentTypeListItem('post').title('Posts'),
    ]);
```
:::

## Access Control (Workspaces & Roles) {#access-control-workspaces-roles}

Managing visibility based on user roles or workspaces is where the native API becomes extremely repetitive.

::: code-group
```ts [Sanity Structure Tool]
// Automatically handles logic for both roles and workspaces
const listItems = defineListItems([
  {
    schemaType: 'revenue',
    workspaces: ['staging'],
    roles: ['administrator'],
  },
]);
```

```ts [Native Structure Builder]
export const structure = (S, context) => {
  const { currentUser, dataset } = context;
  const isAdmin = currentUser.roles.some(r => r.name === 'administrator');
  const items = [];

  // Manual filtering logic for every protected item
  if (isAdmin && dataset === 'staging') {
    items.push(S.documentTypeListItem('revenue'));
  }

  return S.list().title('Desk').items(items);
};
```
:::

## Key Advantages {#key-advantages}

| Feature | Sanity Structure Tool | Native Builder |
| :--- | :--- | :--- |
| **Syntax** | **Declarative (JSON like)** | Imperative (Method Chaining) |
| **Singletons** | **One property (`singleton: true`)** | Manual setup (id, view, actions) |
| **Type Safety** | **Contextual & Typed** | Generic |
| **Boilerplate** | **Minimal** | High (repeats for every item) |
| **Roles/Workspaces**| **Built-in protection** | Manual `if/else` logic |

## Summary {#summary}

By using the **Sanity Structure Tool**, you trade complex method chaining for a clean, typed configuration. This not only reduces the amount of code you write but also makes your structure easier to read, maintain, and protect.

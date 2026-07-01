# Upcoming Features {#upcoming-features}

We are constantly working to expand the capabilities of **Sanity Structure Tool** to make it the most powerful and flexible way to define your Sanity Studio structure via JSON.

Here is a glimpse of what's coming in future releases:

## Planned Features {#planned-features}

### 1. Bulk Actions (Delete All) {#delete-all}

Support for automatic bulk deletion. When enabled via the `deleteAll` property, the plugin will automatically handle both rendering a delete trigger in the UI and executing the document deletion queries for all matching items in the listing.

::: code-group

```ts [JSON]
{
  schemaType: 'draftPost',
  deleteAll: ({ currentUser }) =>
    currentUser.roles.some((role) => role.name === 'administrator'),
}
```

```ts [Helpers]
helpers.listing('draftPost', {
  deleteAll: ({ currentUser }) => currentUser.roles.some((role) => role.name === 'administrator'),
});
```

:::

### 2. Custom List Item Badges {#item-badges}

Support for adding custom status badges or counters next to list items to highlight specific states (e.g. showing the count of pending documents or warning tags).

::: code-group

```ts [JSON]
{
  schemaType: 'post',
  badge: {
    title: 'Draft',
    color: 'warning',
    query: '_id in path("drafts.**")',
  },
}
```

```ts [Helpers]
helpers.listing('post', {
  badge: {
    title: 'Draft',
    color: 'warning',
    query: '_id in path("drafts.**")',
  },
});
```

:::

### 3. Dynamic Icon Callbacks {#dynamic-icons}

Support for resolving list item icons dynamically using callback functions. This will allow rendering different icons based on active workspaces, current user roles, or custom metadata values.

::: code-group

```ts [JSON]
{
  schemaType: 'post',
  icon: ({ workspace }) => (workspace === 'canary' ? StarIcon : DocumentIcon),
}
```

```ts [Helpers]
helpers.listing('post', {
  icon: ({ workspace }) => (workspace === 'canary' ? StarIcon : DocumentIcon),
});
```

:::

---

::: info Have a Suggestion?
Is there something else you'd like to see before we hit v2.0.0? We'd love to hear your feedback! Feel free to open an issue or start a discussion on our [GitHub repository](https://github.com/sanity-plugin/structure-tool/discussions/new/choose).
:::

# `defaultOrdering` {#default-ordering}

- **Type**: `Record<string, 'asc' | 'desc' | Omit<SortOrderingItem, 'field'>> | ((params: CallbackParams & { childOptions: ChildResolverOptions }) => Record<string, 'asc' | 'desc' | Omit<SortOrderingItem, 'field'>>)`
- **Optional**: Yes

The `defaultOrdering` property sets the default sorting order for document lists. You can specify one or more fields to sort by, in ascending or descending order.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
{
  title: 'Recent Articles',
  schemaType: 'article',
  defaultOrdering: {
    publishedAt: 'desc',
    title: 'asc',
  },
}
```

```ts [Helpers]
helpers.listing('article', {
  title: 'Recent Articles',
  defaultOrdering: {
    publishedAt: 'desc',
    title: 'asc',
  },
});
```

:::

## Dynamic Ordering (Callback) {#dynamic-ordering}

You can dynamically set the sorting order using a callback function based on the active desk context.

::: code-group

```ts [JSON]
{
  title: 'Articles',
  schemaType: 'article',
  defaultOrdering: ({ workspace }) => ({
    // Sort differently based on the workspace
    _createdAt: workspace === 'production' ? 'desc' : 'asc',
  }),
}
```

```ts [Helpers]
helpers.listing('article', {
  title: 'Articles',
  defaultOrdering: ({ workspace }) => ({
    // Sort differently based on the workspace
    _createdAt: workspace === 'production' ? 'desc' : 'asc',
  }),
});
```

:::

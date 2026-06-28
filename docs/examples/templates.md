# `templates` {#templates}

- **Type**: `Record<string, unknown> | ((params: CallbackParams & { childOptions: ChildResolverOptions }) => Record<string, unknown>)`
- **Optional**: Yes

The `templates` property allows you to define default values for new documents created from a specific list item. These are automatically mapped to [Sanity Initial Value Templates](https://www.sanity.io/docs/studio/initial-value-templates).

## Basic Usage {#basic-usage}

In this example, when a user creates a new "Post" from this list item, the `status` field will default to `draft` and `publishedAt` will be set to the current date.

::: code-group

```ts [JSON]
{
  schemaType: 'post',
  templates: {
    status: 'draft',
    publishedAt: new Date().toISOString(),
  },
}
```

```ts [Helpers]
helpers.listing('post', {
  templates: {
    status: 'draft',
    publishedAt: new Date().toISOString(),
  },
});
```

:::

## Multiple Templates for Same Type {#multiple-templates-for-same-type}

You can define multiple list items for the same `schemaType` with different initial values. The plugin will automatically generate unique template IDs for each.

::: code-group

```ts [JSON]
[
  {
    title: 'Featured Posts',
    schemaType: 'post',
    templates: {
      isFeatured: true,
      category: 'featured',
    },
  },
  {
    title: 'News Posts',
    schemaType: 'post',
    templates: {
      category: 'news',
    },
  },
];
```

```ts [Helpers]
[
  helpers.listing('post', {
    title: 'Featured Posts',
    templates: {
      isFeatured: true,
      category: 'featured',
    },
  }),
  helpers.listing('post', {
    title: 'News Posts',
    templates: {
      category: 'news',
    },
  }),
];
```

:::

## Dynamic Templates (Callback) {#dynamic-templates}

You can define initial value templates dynamically using a callback function:

::: code-group

```ts [JSON]
{
  schemaType: 'post',
  templates: ({ workspace }) => ({
    workspaceSource: workspace,
    isActive: workspace === 'production',
  }),
}
```

```ts [Helpers]
helpers.listing('post', {
  templates: ({ workspace }) => ({
    workspaceSource: workspace,
    isActive: workspace === 'production',
  }),
});
```

:::

## Registration {#registration}

The `structure` utility handles template registration automatically, keeping your desk items and initial values in sync. For advanced use cases and manual merging, see the **[Configuration Guide](../guide/setup/configuration#return-templates)**.

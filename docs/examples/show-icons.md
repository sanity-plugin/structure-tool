# `showIcons` {#show-icons}

- **Type**: `boolean | ((params: CallbackParams & { childOptions: ChildResolverOptions }) => boolean)`
- **Optional**: Yes

The `showIcons` property determines whether icons are displayed for items inside a list or document list. This corresponds to the `.showIcons(showIcons)` builder method in the Sanity Structure Builder API.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
{
  title: 'All Content',
  showIcons: false,
  children: [
    {
      schemaType: 'post',
    },
    {
      schemaType: 'author',
    },
  ],
}
```

```ts [Helpers]
helpers.children('All Content', [helpers.listing('post'), helpers.listing('author')], {
  showIcons: false,
});
```

:::

## Dynamic Icons Display (Callback) {#dynamic-icons-display}

You can dynamically show or hide icons based on the active desk context.

::: code-group

```ts [JSON]
{
  title: 'Articles',
  schemaType: 'article',
  // Only show icons on staging workspace for visual checks
  showIcons: ({ workspace }) => workspace === 'staging',
}
```

```ts [Helpers]
helpers.listing('article', {
  title: 'Articles',
  showIcons: ({ workspace }) => workspace === 'staging',
});
```

:::

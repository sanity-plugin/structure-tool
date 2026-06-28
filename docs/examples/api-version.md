# `apiVersion` {#api-version}

- **Type**: `string | ((params: CallbackParams & { childOptions: ChildResolverOptions }) => string)`
- **Optional**: Yes

The `apiVersion` property allows you to specify the Sanity API version for a specific list item.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  apiVersion: '2025-02-19',
}
```

```ts [Helpers]
helpers.listing('author', {
  apiVersion: '2025-02-19',
});
```

:::

## Dynamic API Version (Callback) {#dynamic-api-version}

You can specify the `apiVersion` dynamically using a callback function:

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  apiVersion: ({ workspace }) => workspace === 'production' ? '2026-06-19' : '2025-02-19',
}
```

```ts [Helpers]
helpers.listing('author', {
  apiVersion: ({ workspace }) => (workspace === 'production' ? '2026-06-19' : '2025-02-19'),
});
```

:::

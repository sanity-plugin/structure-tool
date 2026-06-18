# `apiVersion` Examples {#api-version-examples}

The `apiVersion` property allows you to specify the Sanity API version for a specific list item.

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

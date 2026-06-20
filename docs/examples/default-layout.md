# `defaultLayout` {#default-layout}

- **Type**: `'default' | 'card' | 'media' | 'detail' | 'block' | ((params: CallbackParams) => 'default' | 'card' | 'media' | 'detail' | 'block')`
- **Optional**: Yes

The `defaultLayout` property specifies the default layout style for documents listed in the desk menu.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
{
  title: 'Media Gallery',
  schemaType: 'mediaItem',
  defaultLayout: 'media',
}
```

```ts [Helpers]
helpers.listing('mediaItem', {
  title: 'Media Gallery',
  defaultLayout: 'media',
});
```

:::

## Dynamic Layout (Callback) {#dynamic-layout}

You can dynamically switch layout style using a callback function based on the active desk context.

::: code-group

```ts [JSON]
{
  title: 'Portfolio Items',
  schemaType: 'portfolio',
  defaultLayout: ({ workspace }) => (workspace === 'creative' ? 'media' : 'default'),
}
```

```ts [Helpers]
helpers.listing('portfolio', {
  title: 'Portfolio Items',
  defaultLayout: ({ workspace }) => (workspace === 'creative' ? 'media' : 'default'),
});
```

:::

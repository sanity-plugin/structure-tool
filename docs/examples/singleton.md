# `singleton` {#singleton}

- **Type**: `boolean | ((params: CallbackParams) => boolean)`
- **Optional**: Yes (Default: `false`)

The `singleton` property treats the item as a single document rather than a list. The plugin will automatically handle the document ID and editor view.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
{
  schemaType: 'settings',
  singleton: true,
}
```

```ts [Helpers]
helpers.singleton('settings');
```

:::

## Dynamic Singleton (Callback) {#dynamic-singleton}

You can define the `singleton` property dynamically using a callback function:

::: code-group

```ts [JSON]
{
  schemaType: 'settings',
  singleton: ({ workspace }) => workspace === 'production',
}
```

:::

# `isPlural` {#is-plural}

- **Type**: `boolean | ((params: CallbackParams) => boolean)`
- **Optional**: Yes (Default: `true`)

The `isPlural` property controls whether the auto-generated title should be pluralized when no custom `title` is provided. When it is set to `false`, the plugin will showcase the exact same name you have defined in your schema, without any pluralization logic applied.

::: info Note
For items marked as `singleton: true`, pluralization is **disabled by default** since singletons are singular by nature. However, you can manually set `isPlural: true` if you wish to pluralize a singleton's title.
:::

::: info Recommendation
It is best to give your `schema` a **singular** title (e.g., `Author` instead of `Authors`). The plugin will then automatically pluralize it for the list view (e.g., "Authors").
:::

## Standard Usage {#standard-usage}

By default, the plugin pluralizes the schema name (e.g., "Author" becomes "Authors"). Set `isPlural: false` to disable this.

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  isPlural: false,
}
```

```ts [Helpers]
helpers.listing('author', {
  isPlural: false,
});
```

:::

## With Singletons {#with-singletons}

Singletons have `isPlural: false` by default. You can manually enable it if you want the singleton's title to be pluralized.

::: code-group

```ts [JSON]
{
  schemaType: 'settings',
  singleton: true,
  isPlural: true,
}
```

```ts [Helpers]
helpers.singleton('settings', {
  isPlural: true,
});
```

:::

## Dynamic Pluralization (Callback) {#dynamic-pluralization}

You can set `isPlural` dynamically using a callback function:

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  isPlural: ({ workspace }) => workspace === 'production',
}
```

```ts [Helpers]
helpers.listing('author', {
  isPlural: ({ workspace }) => workspace === 'production',
});
```

:::

# `isPlural` Examples {#is-plural-examples}

The `isPlural` property controls automatic pluralization of the schema title.

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

# `isPlural` Example {#is-plural}

The `isPlural` property controls automatic pluralization of the schema title.

## Standard Usage {#standard-usage}

By default, the plugin pluralizes the schema name (e.g., "Author" becomes "Authors"). Set `isPlural: false` to disable this.

```ts
{
  schemaType: 'author',
  isPlural: false,
}
```

## With Singletons {#with-singletons}

Singletons have `isPlural: false` by default. You can manually enable it if you want the singleton's title to be pluralized.

```ts
{
  schemaType: 'settings',
  singleton: true,
  isPlural: true, // Force pluralization for a singleton
}
```

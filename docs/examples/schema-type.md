# `schemaType` {#schema-type}

- **Type**: `string | ((params: CallbackParams) => string)`
- **Optional**: Yes

The `schemaType` property links the list item to a specific document type defined in your Sanity schema.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
{
  schemaType: 'author',
}
```

```ts [Helpers]
helpers.listing('author');
```

:::

## With Custom Title {#with-custom-title}

By default, the plugin generates a title based on the `schemaType`. You can override it using the `title` property.

::: code-group

```ts [JSON]
{
  title: 'Contributors',
  schemaType: 'author',
}
```

```ts [Helpers]
helpers.listing('author', {
  title: 'Contributors',
});
```

:::

## With Custom Icon {#with-custom-icon}

::: code-group

```ts [JSON]
import { UsersIcon } from '@sanity/icons';

{
  schemaType: 'author',
  icon: UsersIcon,
}
```

```ts [Helpers]
import { UsersIcon } from '@sanity/icons';

helpers.listing('author', {
  icon: UsersIcon,
});
```

:::

## With Combined (Title + Icon) {#with-combined}

::: code-group

```ts [JSON]
import { UsersIcon } from '@sanity/icons';

{
  title: 'Contributors',
  schemaType: 'author',
  icon: UsersIcon,
}
```

```ts [Helpers]
import { UsersIcon } from '@sanity/icons';

helpers.listing('author', {
  title: 'Contributors',
  icon: UsersIcon,
});
```

:::

## With Disabled Pluralization {#with-disabled-pluralization}

Use `isPlural: false` to display the singular name as defined in your schema.

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

## Dynamic Schema Type (Callback) {#dynamic-schema-type}

You can set the `schemaType` dynamically using a callback function:

::: code-group

```ts [JSON]
{
  schemaType: ({ workspace }) => workspace === 'blog' ? 'post' : 'product',
}
```

```ts [Helpers]
helpers.listing(({ workspace }) => (workspace === 'blog' ? 'post' : 'product'));
```

:::

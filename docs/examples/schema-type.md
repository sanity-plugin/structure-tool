# `schemaType` Example {#schema-type-example}

The `schemaType` property links the list item to a specific document type defined in your Sanity schema.

## Standard Usage {#standard-usage}

```ts
{
  schemaType: 'author',
}
```

## With Custom Title {#with-custom-title}

By default, the plugin generates a title based on the `schemaType`. You can override it using the `title` property.

```ts
{
  title: 'Contributors',
  schemaType: 'author',
}
```

## With Custom Icon {#with-custom-icon}

```ts
import { UsersIcon } from '@sanity/icons';

{
  schemaType: 'author',
  icon: UsersIcon,
}
```

## With Combined (Title + Icon) {#with-combined}

```ts
import { UsersIcon } from '@sanity/icons';

{
  title: 'Contributors',
  schemaType: 'author',
  icon: UsersIcon,
}
```

## With Disabled Pluralization {#with-disabled-pluralization}

Use `isPlural: false` to display the singular name as defined in your schema.

```ts
{
  schemaType: 'author',
  isPlural: false,
}
```

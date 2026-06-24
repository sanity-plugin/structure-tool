# `title` {#title}

- **Type**: `string | TitleObject | ((params: CallbackParams) => string | TitleObject)`
- **Optional**: Yes (Required if `children` is present)

The `title` property sets the display name for the list item in the Sanity desk menu.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
{
  title: 'My Custom Title',
  schemaType: 'author',
}
```

```ts [Helpers]
helpers.listing('author', {
  title: 'My Custom Title',
});
```

:::

## Parent & Child Titles {#parent-child-titles}

You can specify a different title for when an item is listed in the parent list versus when it is opened as a child pane. This is done by passing a `TitleObject` containing `parent` and/or `child` keys.

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  title: {
    parent: 'Contributors',
    child: 'Authors',
  },
}
```

```ts [Helpers]
helpers.listing('author', {
  title: {
    parent: 'Contributors',
    child: 'Authors',
  },
});
```

:::

## With Children {#with-children}

When `children` are present, `title` becomes **mandatory** to label the parent item in the desk menu.

::: code-group

```ts [JSON]
{
  title: 'Profile',
  children: [
    {
      schemaType: 'author',
    },
    {
      schemaType: 'user',
    },
  ],
}
```

```ts [Helpers]
helpers.children('Profile', [helpers.listing('author'), helpers.listing('user')]);
```

:::

## With Dividers {#with-dividers}

You can use the `title` property with `helpers.divider` to create a labeled separator.

::: code-group

```ts [JSON]
{
  title: 'Content Section',
  isDivider: true,
}
```

```ts [Helpers]
helpers.divider('Content Section');
```

:::

## Dynamic Title (Callback) {#dynamic-title}

You can set the `title` dynamically using a callback function:

::: code-group

```ts [JSON]
{
  title: ({ workspace }) => `${workspace === 'production' ? 'Live' : 'Staging'} Settings`,
  schemaType: 'settings',
  singleton: true,
}
```

```ts [Helpers]
helpers.singleton('settings', {
  title: ({ workspace }) => `${workspace === 'production' ? 'Live' : 'Staging'} Settings`,
});
```

:::

# `title` Examples {#title-examples}

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

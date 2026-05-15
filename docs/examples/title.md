# `title` Example {#title}

The `title` property sets the display name for the list item in the Sanity desk menu.

## Standard Usage {#standard-usage}

```ts
{
  title: 'My Custom Title',
}
```

## With Children {#with-children}

When `children` are present, `title` becomes **mandatory** to label the parent item in the desk menu.

```ts
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

## With Dividers {#with-dividers}

You can use the `title` property with `isDivider` to create a labeled separator.

```ts
{
  title: 'Content Section',
  isDivider: true,
}
```

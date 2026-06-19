# `hideAddButton` {#hide-add-button}

- **Type**: `boolean | ((params: CallbackParams) => boolean)`
- **Optional**: Yes (Default: `false`)

The `hideAddButton` property removes the "Add" (plus) icon from the document list.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  hideAddButton: true,
}
```

```ts [Helpers]
helpers.listing('author', {
  hideAddButton: true,
});
```

:::

## Dynamic Hide Add Button (Callback) {#dynamic-hide-add-button}

You can define `hideAddButton` dynamically using a callback function:

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  hideAddButton: ({ currentUser }) => !currentUser.roles.some((role) => role.name === 'administrator'),
}
```

```ts [Helpers]
helpers.listing('author', {
  hideAddButton: ({ currentUser }) =>
    !currentUser.roles.some((role) => role.name === 'administrator'),
});
```

:::

# `isVisible` {#is-visible}

- **Type**: `boolean | ((params: CallbackParams) => boolean)`
- **Optional**: Yes (Default: `true`)

The `isVisible` property controls whether the list item is visible in the Sanity desk navigation menu.

## Standard Usage {#standard-usage}

Set `isVisible: false` to hide a list item from the navigation pane completely.

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  isVisible: false,
}
```

```ts [Helpers]
helpers.listing('author', {
  isVisible: false,
});
```

:::

## Dynamic Visibility (Callback) {#dynamic-visibility}

You can set `isVisible` dynamically using a callback function based on the active desk context. This is useful for showing/hiding items depending on the active workspace or current user roles.

::: code-group

```ts [JSON]
{
  schemaType: 'settings',
  singleton: true,
  isVisible: ({ currentUser }) => currentUser.roles.some((role) => role.name === 'administrator'),
}
```

```ts [Helpers]
helpers.singleton('settings', {
  isVisible: ({ currentUser }) => currentUser.roles.some((role) => role.name === 'administrator'),
});
```

:::

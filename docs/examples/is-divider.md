# `isDivider` {#is-divider}

- **Type**: `boolean | ((params: CallbackParams) => boolean)`
- **Optional**: Yes

The `isDivider` property renders a visual separator in the desk list.

## Simple Divider {#simple-divider}

::: code-group

```ts [JSON]
{
  isDivider: true,
}
```

```ts [Helpers]
helpers.divider();
```

:::

## Divider with Title {#divider-with-title}

::: code-group

```ts [JSON]
{
  title: 'Settings',
  isDivider: true,
}
```

```ts [Helpers]
helpers.divider('Settings');
```

:::

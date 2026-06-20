# `icon` {#icon}

- **Type**: `IconComponent | ComponentType | ReactNode | false`
- **Optional**: Yes

The `icon` property allows you to add a visual indicator to the left of the title. You can use standard Sanity icons, custom React components, or pass `false` to explicitly disable/hide the icon.

## Standard Usage {#standard-usage}

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

## Disabling Icon {#disabling-icon}

Set `icon: false` to explicitly hide the icon for the list item in the desk menu.

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  icon: false,
}
```

```ts [Helpers]
helpers.listing('author', {
  icon: false,
});
```

:::

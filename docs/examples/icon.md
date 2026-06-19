# `icon` {#icon}

- **Type**: `IconComponent | ComponentType | ReactNode`
- **Optional**: Yes

The `icon` property allows you to add a visual indicator to the left of the title. You can use standard Sanity icons or custom React components.

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

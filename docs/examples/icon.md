# `icon` Examples {#icon-examples}

The `icon` property allows you to add a visual indicator to the left of the title.

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

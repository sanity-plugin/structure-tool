# List Items {#list-items}

The core of **Sanity Structure Tool** is the `ListItem` configuration. This guide explains every property you can use to define your desk structure.

::: info Using Helpers
You can define list items using either raw objects or the built-in [Helpers](./helpers). Helpers provide enhanced type intelligence and a more expressive syntax.
:::

## `title` {#title}

- **Type**: `string`
- **Optional**: Yes (Required if `children` is present)
- **Examples**: [See Examples](../examples/title)

The display name for the list item. While optional for standard items (where it can be inferred from `schemaType`), it is **mandatory** for items that act as folders (containing `children`).

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

## `schemaType` {#schema-type}

- **Type**: `string`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/schema-type)

The name of the document type defined in your Sanity schema. Providing this will automatically link the list item to that document type.

::: code-group

```ts [JSON]
{
  schemaType: 'author',
}
```

```ts [Helpers]
helpers.listing('author');
```

:::

## `icon` {#icon}

- **Type**: `IconComponent | ComponentType | ReactNode`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/icon)

The icon to display to the left of the title. You can use standard Sanity icons or custom React components.

::: code-group

```ts [JSON]
import { UserIcon } from '@sanity/icons';

{
  schemaType: 'author',
  icon: UserIcon,
}
```

```ts [Helpers]
import { UserIcon } from '@sanity/icons';

helpers.listing('author', {
  icon: UserIcon,
});
```

:::

## `singleton` {#singleton}

- **Type**: `boolean`
- **Optional**: Yes (Default: `false`)
- **Examples**: [See Examples](../examples/singleton)

When set to `true`, this item is treated as a single document rather than a list. The plugin will automatically handle the document ID and editor view.

::: warning Note
When `singleton: true` is enabled, the `apiVersion` and `templates` properties are **not supported** and should not be used.
:::

::: code-group

```ts [JSON]
{
  title: 'Global Settings',
  schemaType: 'settings',
  singleton: true,
}
```

```ts [Helpers]
helpers.singleton('settings', {
  title: 'Global Settings',
});
```

:::

## `component` {#component}

- **Type**: `UserComponent`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/component)

Allows you to render a custom React component as the child (view) of the list item. This is useful for creating custom dashboards, analytics views, or any other non-document based content.

::: code-group

```ts [JSON]
import { MyDashboard } from './components/MyDashboard';

{
  title: 'Analytics',
  component: MyDashboard,
}
```

```ts [Helpers]
import { MyDashboard } from './components/MyDashboard';

helpers.component('Analytics', MyDashboard);
```

:::

## `children` {#children}

- **Type**: `ListItem[]`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/children)

An array of `ListItem` objects to create a nested list. This is the primary way to build hierarchical structures.

::: info Note
When adding `children`, you **must** also provide a `title` so it can be labeled correctly in the desk menu.
:::

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

## `apiVersion` {#api-versioning}

- **Type**: `string`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/api-version)

Specifies the Sanity API version to use for this specific list item.

::: warning Note
This property is **not compatible** with items marked as `singleton: true`.
:::

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  apiVersion: '2025-02-19',
}
```

```ts [Helpers]
helpers.listing('author', {
  apiVersion: '2025-02-19',
});
```

:::

## `filter` {#filter}

- **Type**: `string | ((params: { currentUser: CurrentUser }) => string)`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/filter)

A GROQ filter string to limit which documents are shown in the list. You can also pass a function that returns a filter string based on the current user.

::: warning Note
If you provide a `filter` without a `schemaType`, you cannot use `hideAddButton` or `templates` for that item.
:::

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  filter: 'isActive == true',
}
```

```ts [Helpers]
helpers.listing('author', {
  filter: 'isActive == true',
});
```

:::

## `filterParams` {#filter-params}

- **Type**: `Record<string, unknown> | ((params: { currentUser: CurrentUser }) => Record<string, unknown>)`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/filter)

Parameters to be used within the `filter` GROQ string.

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  filter: 'type == $type',
  filterParams: {
    type: 'news',
  },
}
```

```ts [Helpers]
helpers.listing('author', {
  filter: 'type == $type',
  filterParams: {
    type: 'news',
  },
});
```

:::

## `workspaces` {#workspaces}

- **Type**: `string[] | ((params: { defaultWorkspaces: string[] }) => string[])`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/workspaces)

Restricts the visibility of the list item to specific Sanity workspaces. You can provide either a static array of workspaces or a function that returns an array based on the `defaultWorkspaces` defined in your plugin configuration.

::: info Note
When using a **static array**, the provided values are **concatenated** with the `defaultWorkspaces`. When using a **callback function**, the returned array is treated as the **final value**, giving you full control over the resulting list.
:::

::: code-group

```ts [JSON]
{
  schemaType: 'adminSettings',
  workspaces: ['workspace1'],
}
```

```ts [Helpers]
helpers.listing('adminSettings', {
  workspaces: ['workspace1'],
});
```

:::

## `roles` {#roles}

- **Type**: `string[] | ((params: { defaultRoles: string[] }) => string[])`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/roles)

Restricts the visibility of the list item to specific user roles. Like `workspaces`, this can be a static array or a function receiving the `defaultRoles`.

::: info Note
When using a **static array**, the provided values are **concatenated** with the `defaultRoles`. When using a **callback function**, the returned array is treated as the **final value**, giving you full control over the resulting list.
:::

::: code-group

```ts [JSON]
{
  schemaType: 'settings',
  roles: ['administrator', 'editor'],
}
```

```ts [Helpers]
helpers.listing('settings', {
  roles: ['administrator', 'editor'],
});
```

:::

## `hideAddButton` {#hide-add-button}

- **Type**: `boolean`
- **Optional**: Yes (Default: `false`)
- **Examples**: [See Examples](../examples/hide-add-button)

When set to `true`, the "Add" button (plus icon) will be hidden for this document list.

::: warning Note
This property cannot be used in combination with `templates`. Additionally, it is not supported when a `filter` is used without a `schemaType`.
:::

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

## `templates` {#templates}

- **Type**: `Record<string, unknown>`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/templates)

Used to pass initial value templates for new documents created from this list item.

::: warning Note
This property cannot be used if `hideAddButton` is present. It is also **not supported** for `singleton` items or when a `filter` is used without a `schemaType`.
:::

::: code-group

```ts [JSON]
{
  schemaType: 'post',
  templates: {
    isActive: false,
  },
}
```

```ts [Helpers]
helpers.listing('post', {
  templates: {
    isActive: false,
  },
});
```

:::

## `raw` {#raw}

- **Type**: `(S: StructureBuilder, context: StructureResolverContext) => ListItem`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/raw)

The "Escape Hatch". Allows you to use the native Sanity `Structure Builder` API directly for this specific item. You also have access to the `context` (containing `currentUser`, `projectId`, etc.).

::: code-group

```ts [JSON]
{
  raw: (S) => S.listItem().title('Advanced Item').child(...)
}
```

```ts [Helpers]
helpers.raw((S) => S.listItem().title('Advanced Item').child(...))
```

:::

::: warning Use Sparingly
When using `raw`, you are responsible for handling your own visibility logic (workspaces/roles) for any nested children.
:::

## `isDivider` {#is-divider}

- **Type**: `boolean`
- **Optional**: Yes (Default: `false`)
- **Examples**: [See Examples](../examples/is-divider)

When set to `true`, this item renders as a visual separator in the desk list. Other properties (except `title`) are ignored.

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

## `isPlural` {#is-plural}

- **Type**: `boolean`
- **Optional**: Yes (Default: `true`)
- **Examples**: [See Examples](../examples/is-plural)

Controls whether the auto-generated title should be pluralized when no custom `title` is provided.

::: details Note
For items marked as `singleton: true`, pluralization is **disabled by default** since singletons are singular by nature. However, you can manually set `isPlural: true` if you wish to pluralize a singleton's title.

::: details Recommendation
It is best to give your `schema` a **singular** title (e.g., `Author` instead of `Authors`). The plugin will then automatically pluralize it for the list view (e.g., "Authors").
:::

When `isPlural` is set to `false`, the plugin will showcase the exact same name you have defined in your schema, without any pluralization logic applied.

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  isPlural: false,
}
```

```ts [Helpers]
helpers.listing('author', {
  isPlural: false,
});
```

:::

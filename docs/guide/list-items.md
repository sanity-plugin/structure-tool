# List Items {#list-items}

The core of **Sanity Structure Tool** is the `ListItem` configuration. This guide explains every property you can use to define your desk structure.

## `title` {#title}

- **Type**: `string`
- **Optional**: Yes (Required if `children` is present)
- **Examples**: [See Examples](../examples/title)

The display name for the list item. While optional for standard items (where it can be inferred from `schemaType`), it is **mandatory** for items that act as folders (containing `children`).

```ts
{
  title: 'My Custom Title',
}
```

## `schemaType` {#schema-type}

- **Type**: `string`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/schema-type)

The name of the document type defined in your Sanity schema. Providing this will automatically link the list item to that document type.

```ts
{
  schemaType: 'author',
}
```

## `icon` {#icon}

- **Type**: `IconComponent | ComponentType | ReactNode`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/icon)

The icon to display to the left of the title. You can use standard Sanity icons or custom React components.

```ts
import { UserIcon } from '@sanity/icons';

{
  schemaType: 'author',
  icon: UserIcon,
}
```

## `singleton` {#singleton}

- **Type**: `boolean`
- **Optional**: Yes (Default: `false`)
- **Examples**: [See Examples](../examples/singleton)

When set to `true`, this item is treated as a single document rather than a list. The plugin will automatically handle the document ID and editor view.

```ts
{
  title: 'Global Settings',
  schemaType: 'settings',
  singleton: true,
}
```

## `children` {#children}

- **Type**: `ListItem[]`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/children)

An array of `ListItem` objects to create a nested list. This is the primary way to build hierarchical structures.

::: info Note
When adding `children`, you **must** also provide a `title` so it can be labeled correctly in the desk menu.
:::

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

## `isDivider` {#is-divider}

- **Type**: `boolean`
- **Optional**: Yes (Default: `false`)
- **Examples**: [See Examples](../examples/is-divider)

When set to `true`, this item renders as a visual separator in the desk list. Other properties (except `title`) are ignored.

```ts
{
  title: 'Content Section',
  isDivider: true,
}
```

## `filter` {#filter}

- **Type**: `string | ((params: { currentUser: CurrentUser }) => string)`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/filter)

A GROQ filter string to limit which documents are shown in the list. You can also pass a function that returns a filter string based on the current user.

```ts
{
  schemaType: 'author',
  filter: 'isActive == true',
}
```

## `filterParams` {#filter-params}

- **Type**: `Record<string, unknown> | ((params: { currentUser: CurrentUser }) => Record<string, unknown>)`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/filter)

Parameters to be used within the `filter` GROQ string.

```ts
{
  schemaType: 'author',
  filter: 'type == $type',
  filterParams: {
    type: 'news'
  },
}
```

## `hideAddButton` {#hide-add-button}

- **Type**: `boolean`
- **Optional**: Yes (Default: `false`)
- **Examples**: [See Examples](../examples/hide-add-button)

When set to `true`, the "Add" button (plus icon) will be hidden for this document list.

```ts
{
  schemaType: 'author',
  hideAddButton: true,
}
```

## `isPlural` {#is-plural}

- **Type**: `boolean`
- **Optional**: Yes (Default: `true`)
- **Examples**: [See Examples](../examples/is-plural)

Controls whether the auto-generated title should be pluralized when no custom `title` is provided.

::: details Note
For items marked as `singleton: true`, pluralization is **disabled by default** since singletons are singular by nature. However, you can manually set `isPlural: true` if you wish to pluralize a singleton's title.

::: details Recommendation
We recommend giving your `schema` a **singular** title (e.g., `Author` instead of `Authors`). The plugin will then automatically pluralize it for the list view (e.g., "Authors").
:::

When `isPlural` is set to `false`, the plugin will showcase the exact same name you have defined in your schema, without any pluralization logic applied.

```ts
{
  schemaType: 'author',
  isPlural: false,
}
```

## `workspaces` {#workspaces}

- **Type**: `string[] | ((params: { defaultWorkspaces: string[] }) => string[])`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/workspaces)

Restricts the visibility of the list item to specific Sanity workspaces. You can provide either a static array of workspaces or a function that returns an array based on the `defaultWorkspaces` defined in your plugin configuration.

::: info Note
When using a **static array**, the provided values are **concatenated** with the `defaultWorkspaces`. When using a **callback function**, the returned array is treated as the **final value**, giving you full control over the resulting list.
:::

```ts
{
  schemaType: 'adminSettings',
  workspaces: ['workspace1'],
}
```

## `roles` {#roles}

- **Type**: `string[] | ((params: { defaultRoles: string[] }) => string[])`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/roles)

Restricts the visibility of the list item to specific user roles. Like `workspaces`, this can be a static array or a function receiving the `defaultRoles`.

::: info Note
When using a **static array**, the provided values are **concatenated** with the `defaultRoles`. When using a **callback function**, the returned array is treated as the **final value**, giving you full control over the resulting list.
:::

```ts
{
  schemaType: 'settings',
  roles: ['administrator', 'editor'],
}
```

## `apiVersion` {#api-versioning}

- **Type**: `string`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/api-version)

Specifies the Sanity API version to use for this specific list item.

```ts
{
  schemaType: 'author',
  apiVersion: '2025-02-19',
}
```

## `templates` {#templates}

- **Type**: `Record<string, unknown>`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/templates)

Used to pass initial value templates for new documents created from this list item.

```ts
{
  schemaType: 'post',
  templates: {
    isActive: false,
  },
}
```

## `raw` {#raw}

- **Type**: `(S: StructureBuilder, context: StructureResolverContext) => ListItem`
- **Optional**: Yes
- **Examples**: [See Examples](../examples/raw)

The "Escape Hatch". Allows you to use the native Sanity `Structure Builder` API directly for this specific item. You also have access to the `context` (containing `currentUser`, `projectId`, etc.).

```ts
{
  raw: (S) => S.listItem().title('Advanced Item').child(...),
}
```

::: warning Use Sparingly
When using `raw`, you are responsible for handling your own visibility logic (workspaces/roles) for any nested children.
:::

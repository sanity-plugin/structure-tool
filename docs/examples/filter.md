# `filter` and `filterParams` {#filter-filter-params}

The `filter` and `filterParams` properties allow you to customize and limit the documents shown in a list item using GROQ queries. Together, they enable you to build scoped, conditional, and role-based views of your datasets.

## `filter`

- **Type**: `string | ((params: CallbackParams & { childOptions: ChildResolverOptions }) => string)`
- **Optional**: Yes

A GROQ filter string to limit which documents are shown in the list. You can also pass a function that returns a filter string based on the current user.

## `filterParams`

- **Type**: `Record<string, unknown> | ((params: CallbackParams & { childOptions: ChildResolverOptions }) => Record<string, unknown>)`
- **Optional**: Yes

Parameters to be used within the `filter` GROQ string.

## Basic Filtering {#basic-filtering}

You can use `filter` alongside `schemaType` to show a subset of documents.

::: code-group

```ts [JSON]
{
  title: 'Active Authors',
  schemaType: 'author',
  filter: 'isActive == true',
}
```

```ts [Helpers]
helpers.listing('author', {
  title: 'Active Authors',
  filter: 'isActive == true',
});
```

:::

## Organized Sub-sections {#organized-sub-sections}

Filters are commonly used within `children` to create organized views of the same document type.

::: code-group

```ts [JSON]
{
  title: 'Authors',
  children: [
    {
      title: 'Active',
      schemaType: 'author',
      filter: 'isActive == true',
    },
    {
      title: 'Inactive',
      schemaType: 'author',
      filter: 'isActive != true',
      hideAddButton: true,
    },
  ],
}
```

```ts [Helpers]
helpers.children('Authors', [
  helpers.listing('author', {
    title: 'Active',
    filter: 'isActive == true',
  }),
  helpers.listing('author', {
    title: 'Inactive',
    filter: 'isActive != true',
    hideAddButton: true,
  }),
]);
```

:::

## Using Filter Parameters {#using-filter-parameters}

Use `filterParams` to pass dynamic values to your GROQ query.

::: code-group

```ts [JSON]
{
  title: 'Authors from GROQ',
  filter: '_type == $author',
  filterParams: {
    author: 'author',
  },
}
```

```ts [Helpers]
helpers.filters({
  title: 'Authors from GROQ',
  filter: '_type == $author',
  filterParams: {
    author: 'author',
  },
});
```

:::

## Multiple Document Types {#multiple-document-types}

You can create a mixed list of multiple document types by using a more complex GROQ filter.

::: code-group

```ts [JSON]
{
  title: 'Authors + Homepage from GROQ',
  filter: '_type == $author || _type == $homepage',
  filterParams: {
    author: 'author',
    homepage: 'homepage',
  },
}
```

```ts [Helpers]
helpers.filters({
  title: 'Authors + Homepage from GROQ',
  filter: '_type == $author || _type == $homepage',
  filterParams: {
    author: 'author',
    homepage: 'homepage',
  },
});
```

:::

## Function-based Filtering {#function-based-filtering}

You can pass a function to both `filter` and `filterParams` to dynamically control the list based on the current user. The following two examples achieve the exact same result:

### 1. Using Dynamic Filter String {#using-dynamic-filter-string}

In this approach, you return the entire GROQ string from the `filter` function.

::: code-group

```ts [JSON]
{
  title: 'My Posts',
  schemaType: 'post',
  filter: ({ currentUser }) => `author == "${currentUser.id}"`,
}
```

```ts [Helpers]
helpers.listing('post', {
  title: 'My Posts',
  filter: ({ currentUser }) => `author == "${currentUser.id}"`,
});
```

:::

### 2. Using Dynamic Filter Parameters {#using-dynamic-filter-parameters}

In this approach, you keep the `filter` string static and use a function for `filterParams` to pass the user ID.

::: code-group

```ts [JSON]
{
  title: 'My Posts',
  schemaType: 'post',
  filter: 'author == $userId',
  filterParams: ({ currentUser }) => ({
    userId: currentUser.id,
  }),
}
```

```ts [Helpers]
helpers.listing('post', {
  title: 'My Posts',
  filter: 'author == $userId',
  filterParams: ({ currentUser }) => ({
    userId: currentUser.id,
  }),
});
```

:::

### 3. Combining Both {#combining-both}

You can also combine both for more complex logic.

::: code-group

```ts [JSON]
{
  title: 'My Role-based Documents',
  schemaType: 'post',
  filter: ({ currentUser }) => currentUser.roles.includes('administrator')
    ? 'status == $status'
    : 'author == $userId && status == $status',
  filterParams: ({ currentUser }) => ({
    status: 'published',
    userId: currentUser.id,
  }),
}
```

```ts [Helpers]
helpers.listing('post', {
  title: 'My Role-based Documents',
  filter: ({ currentUser }) =>
    currentUser.roles.includes('administrator')
      ? 'status == $status'
      : 'author == $userId && status == $status',
  filterParams: ({ currentUser }) => ({
    status: 'published',
    userId: currentUser.id,
  }),
});
```

:::

## Combined with Roles & Workspaces {#combined-with-roles-workspaces}

Filters work seamlessly with other properties like `roles` and `workspaces`.

::: code-group

```ts [JSON]
{
  title: 'Internal Authors',
  schemaType: 'author',
  workspaces: ['admin-workspace'],
  roles: ['administrator'],
  filter: 'isInternal == true',
}
```

```ts [Helpers]
helpers.listing('author', {
  title: 'Internal Authors',
  workspaces: ['admin-workspace'],
  roles: ['administrator'],
  filter: 'isInternal == true',
});
```

:::

## Dynamic Filter based on Workspace (Callback) {#dynamic-filter-workspace}

You can define the `filter` and `filterParams` dynamically using workspace context:

::: code-group

```ts [JSON]
{
  schemaType: 'author',
  filter: ({ workspace }) => workspace === 'production' ? 'status == "active"' : 'true',
}
```

```ts [Helpers]
helpers.listing('author', {
  filter: ({ workspace }) => (workspace === 'production' ? 'status == "active"' : 'true'),
});
```

:::

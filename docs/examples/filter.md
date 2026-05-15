# `filter` + `filterParams` Example {#filter-filter-params-example}

The `filter` property allows you to limit which documents are shown in a list using a GROQ filter string or a function.

## Basic Filtering {#basic-filtering}

You can use `filter` alongside `schemaType` to show a subset of documents.

```ts
{
  title: 'Active Authors',
  schemaType: 'author',
  filter: 'isActive == true',
}
```

## Organized Sub-sections {#organized-sub-sections}

Filters are commonly used within `children` to create organized views of the same document type.

```ts
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

## Using Filter Parameters {#using-filter-parameters}

Use `filterParams` to pass dynamic values to your GROQ query.

```ts
{
  title: 'Authors from GROQ',
  filter: '_type == $author',
  filterParams: {
    author: 'author',
  },
}
```

## Multiple Document Types {#multiple-document-types}

You can create a mixed list of multiple document types by using a more complex GROQ filter.

```ts
{
  title: 'Authors + Homepage from GROQ',
  filter: '_type == $author || _type == $homepage',
  filterParams: {
    author: 'author',
    homepage: 'homepage',
  },
}
```

## Function-based Filtering {#function-based-filtering}

You can pass a function to both `filter` and `filterParams` to dynamically control the list based on the current user. The following two examples achieve the exact same result:

### 1. Using Dynamic Filter String {#using-dynamic-filter-string}
In this approach, you return the entire GROQ string from the `filter` function.

```ts
{
  title: 'My Posts',
  schemaType: 'post',
  filter: ({ currentUser }) => `author == "${currentUser.id}"`,
}
```

### 2. Using Dynamic Filter Parameters {#using-dynamic-filter-parameters}
In this approach, you keep the `filter` string static and use a function for `filterParams` to pass the user ID.

```ts
{
  title: 'My Posts',
  schemaType: 'post',
  filter: 'author == $userId',
  filterParams: ({ currentUser }) => ({
    userId: currentUser.id,
  }),
}
```

### 3. Combining Both {#combining-both}
You can also combine both for more complex logic.

```ts
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

## Combined with Roles & Workspaces {#combined-with-roles-workspaces}

Filters work seamlessly with other properties like `roles` and `workspaces`.

```ts
{
  title: 'Internal Authors',
  schemaType: 'author',
  workspaces: ['admin-workspace'],
  roles: ['administrator'],
  filter: 'isInternal == true',
}
```

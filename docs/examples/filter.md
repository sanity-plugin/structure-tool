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

You can also pass a function to `filter` that receives the current user context.

```ts
{
  title: 'My Documents',
  schemaType: 'post',
  filter: ({ currentUser }) => `author.createdBy == "${currentUser.id}"`,
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

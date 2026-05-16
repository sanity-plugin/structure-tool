# `raw` Example {#raw-example}

The `raw` property serves as the "Escape Hatch". It allows you to bypass the declarative JSON configuration and use the native [Sanity Structure Builder API](https://www.sanity.io/docs/structure-builder-introduction) directly for a specific list item.

## When to use `raw`? {#when-to-use-raw}

You should only use `raw` when you need functionality that isn't currently supported by the plugin's declarative schema, such as:

- Customizing the document list sorting or grouping.
- Using complex `child` resolvers.
- Creating completely custom views or components in the desk.

## Constraints & Limitations {#constraints-limitations}

While the `raw` property is powerful, it comes with specific constraints:

- **Return Type**: The `raw` callback **must** return an `S.listItem()` (or its equivalent piped output). It does not support `S.list()` or other builders as the root return value.
- **Access Control**: When you use `raw`, the plugin's automatic **`roles`** and **`workspaces`** filtering only applies to the top-level list item itself. If you define nested `children` within the `raw` callback using the native API, you are responsible for handling any access control logic manually for those nested items.

## Basic Usage {#basic-usage}

In this example, we use the native `S.listItem()` to create a highly customized entry.

```ts
{
  raw: (S) =>
    S.listItem()
      .title('Custom Sorted Posts')
      .child(
        S.documentTypeList('post')
          .title('Posts by Title')
          .filter('_type == "post"')
          .defaultOrdering([{ field: 'title', direction: 'asc' }])
      ),
}
```

## Accessing Context {#accessing-context}

The `raw` callback also provides access to the Sanity `context`, which includes the `currentUser`, `dataset`, `projectId`, and more.

```ts
{
  raw: (S, context) => {
    const { currentUser } = context;

    return S.listItem()
      .title(`My Assigned Tasks (${currentUser?.name})`)
      .child(
        S.documentTypeList('task')
          .filter('_type == "task" && assignee._ref == $userId')
          .params({ userId: currentUser?.id })
      );
  },
}
```

::: warning Use Sparingly
While powerful, using `raw` breaks away from the declarative benefits of this plugin. We recommend using it only when the standard properties (`schemaType`, `filter`, `singleton`, etc.) are insufficient for your needs.
:::

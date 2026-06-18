# `hideAddButton` Examples {#hide-add-button-examples}

The `hideAddButton` property removes the "Add" (plus) icon from the document list.

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

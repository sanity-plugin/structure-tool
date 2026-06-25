# Upcoming Features {#upcoming-features}

We are constantly working to expand the capabilities of **Sanity Structure Tool** to make it the most powerful and flexible way to define your Sanity Studio structure via JSON.

Here is a glimpse of what's coming in future releases:

## Planned Features {#planned-features}

### 1. View Customization (`views`) {#view-customization}

Support for defining multiple document views (e.g., Editor, Preview, and custom components) for both standard and singleton items.

::: code-group

```ts [JSON]
{
  schemaType: 'post',
  singleton: true,
  views: [
    {
      title: 'Editor',
      type: 'form',
    },
    {
      title: 'Preview',
      type: 'component',
      component: MyPreviewComponent,
    },
  ],
}
```

```ts [Helpers]
helpers.singleton('post', {
  views: [
    {
      title: 'Editor',
      type: 'form',
    },
    {
      title: 'Preview',
      type: 'component',
      component: MyPreviewComponent,
    },
  ],
});
```

:::

---

::: info Have a Suggestion?
Is there something else you'd like to see before we hit v1.0.0? We'd love to hear your feedback! Feel free to open an issue or start a discussion on our [GitHub repository](https://github.com/sanity-plugin/structure-tool/discussions/new/choose).
:::

# Upcoming Features {#upcoming-features}

We are constantly working to expand the capabilities of **Sanity Structure Tool** to make it the most powerful and flexible way to define your Sanity Studio structure via JSON.

Here is a glimpse of what's coming in future releases:

## Planned Features {#planned-features}

### 1. Menu Items (`menuItems`) {#menu-items}

Support for defining custom menu actions and icons at the top of document lists.

::: code-group

```ts [JSON]
import { DownloadIcon } from '@sanity/icons';

{
  schemaType: 'product',
  menuItems: [
    {
      title: 'Export to CSV',
      icon: DownloadIcon,
      action: 'export-csv',
    },
  ],
}
```

```ts [Helpers]
import { DownloadIcon } from '@sanity/icons';

helpers.listing('product', {
  menuItems: [
    {
      title: 'Export to CSV',
      icon: DownloadIcon,
      action: 'export-csv',
    },
  ],
});
```

:::

### 2. View Customization (`views`) {#view-customization}

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

### 3. TypeScript & Validation {#typescript-validation}

We are working on providing a robust, type-safe experience and built-in validation for your JSON structures.

- **Strict Typing**: Better autocompletion and type checking for all `ListItem` properties.
- **Runtime Validation**: Catch configuration errors instantly with schema-based validation (e.g., ensuring a `title` is provided when `children` are present).

---

::: info Have a Suggestion?
Is there something else you'd like to see before we hit v1.0.0? We'd love to hear your feedback! Feel free to open an issue or start a discussion on our [GitHub repository](https://github.com/sanity-plugin/structure-tool/discussions/new/choose).
:::

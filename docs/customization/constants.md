# Constants {#constants}

The **Sanity Structure Tool** exports the following constants that you can use in your configuration or custom document actions.

---

### `SINGLETON_KEY` {#singleton-key}

This key is used as a suffix for document IDs when `singleton: true` is set. The final ID is generated as `${schemaType}-${SINGLETON_KEY}`.

### Usage Example {#usage-example}

```ts
import { constants } from 'sanity-plugin-structure-tool';

// Use SINGLETON_KEY to check for singleton documents
if (documentId.endsWith(constants.SINGLETON_KEY)) {
  // ...
}
```

---

### `URL_PATH_SEPARATOR` {#url-path-separator}

The character used as a separator when generating unique list item paths and IDs.

### Usage Example {#usage-example-url-path-separator}

```ts
import { constants } from 'sanity-plugin-structure-tool';

helpers.listing('category', {
  title: 'My Custom Category',
  id: ({ workspace, values }) => {
    // Generate a workspace-specific custom ID like: 'production.1.2.3.custom'
    return [workspace, values.uniqueId, 'custom'].join(constants.URL_PATH_SEPARATOR);
  },
});
```

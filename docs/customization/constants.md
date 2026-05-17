# Constants {#constants}

The **Sanity Structure Tool** exports several constants that you can use in your configuration or custom document actions.

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

# Constants {#constants}

The **Sanity Structure Tool** exports the following constants that you can use in your configuration or custom document actions.

---

### `I18N_NAMESPACE` {#i18n-namespace}

The default namespace key registered with the Sanity Studio internationalization framework.

### Usage Example {#usage-example-i18n-namespace}

```ts
import { constants } from 'sanity-plugin-structure-tool';

console.log(constants.I18N_NAMESPACE);
```

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

### `UNIQUE_ID_FIRST_VALUE` {#unique-id-first-value}

The default starting value used for auto-generated list item unique IDs.

### Usage Example {#usage-example-unique-id-first-value}

```ts
import { constants } from 'sanity-plugin-structure-tool';

console.log(constants.UNIQUE_ID_FIRST_VALUE);
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
    return [workspace, values.uniqueId, 'custom'].join(constants.URL_PATH_SEPARATOR);
  },
});
```

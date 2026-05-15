# Singleton Action {#singleton-action}

When you define a [Singleton](/guide/list-items#singleton) in your structure, you typically want to prevent users from performing certain actions that could break the singleton pattern, such as deleting the document, duplicating it, or unpublishing it.

The **Sanity Structure Tool** provides a built-in `SingletonAction` helper to handle this automatically.

## How it Works {#how-it-works}

The `SingletonAction` is a Sanity `DocumentActionsResolver`. It checks the ID of the document being edited, if the ID ends with `-singleton` (which is how the plugin generates IDs for items marked as `singleton: true`), it filters out the following actions:

- **Delete**
- **Duplicate**
- **Unpublish**

This ensures that once a singleton document is created, it remains as a single, permanent piece of content in your studio.

## Usage {#usage}

To use it, import `SingletonAction` and add it to the `document.actions` property in your `sanity.config.ts`.

```ts
// sanity.config.ts
import { defineConfig } from 'sanity';
import { SingletonAction } from 'sanity-plugin-structure-tool';
import { structure } from './src/structure';
import listItems from './src/structure/listItems';

export default defineConfig({
  // ... other config
  plugins: [
    structure({
      listItems,
    }),
  ],
  document: {
    // Add SingletonAction to handle document actions for singletons
    actions: SingletonAction,
  },
});
```

## Customizing Actions {#customizing-actions}

If you have other custom document actions, you can still use `SingletonAction`. Since it's a standard resolver, you can compose it with your own logic:

```ts
// sanity.config.ts
import { SingletonAction } from 'sanity-plugin-structure-tool';

export default defineConfig({
  // ...
  document: {
    actions: (prev, context) => {
      // First, let SingletonAction handle the filtering for singletons
      const actions = SingletonAction(prev, context);
      
      // Then, add your custom logic if needed
      return actions;
    },
  },
});
```

::: info Note
The `SingletonAction` only affects documents whose IDs end with `-singleton`. It will not interfere with the standard actions of your other document types.
:::

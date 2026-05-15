# Setup {#setup}

After [installing](/introduction/getting-started#installation) the package, follow this guide to integrate **Sanity Structure Tool** into your studio. The integration process is straightforward and consists of three main steps:

- Initialize Utilities
- Define Structure
- Register Plugin

## 1. Initialize Plugin Utilities {#initialize-plugin-utilities}

Instead of importing directly from the package, we recommend creating a dedicated file (e.g., `src/structure/index.ts`) to initialize the plugin. This approach allows the tool to generate **typed utilities** (like `defineListItems` and `structure`) that are specific to your project's roles and workspaces.

```ts [src/structure/index.ts]
import { structureToolPlugin } from 'sanity-plugin-structure-tool';

// Initialize the plugin and export its core utilities
export const { structure, defineListItems, defineListItem } = structureToolPlugin({
  title: 'Main Structure',
  // You can optionally pass roles or workspaces here for enhanced type safety
  // roles: ['administrator', 'editor', 'viewer'] as const,
});
```

### Why initialize utilities? {#why-initialize-utilities}

By initializing the plugin this way, `TypeScript` will know exactly which roles and workspaces are available throughout your structure definition, providing you with powerful `autocompletion` and preventing configuration `errors`.

## 2. Define Your Structure {#define-your-structure}

Now, use the `defineListItems` utility to create your studio's desk hierarchy. We suggest keeping this in a separate file like `src/structure/listItems.ts` to keep your configuration clean and modular.

```ts [src/structure/listItems.ts]
import { defineListItems } from './index';

const listItems = defineListItems([
  {
    title: 'General',
    isDivider: true,
  },
  {
    schemaType: 'post',
  },
  {
    // A singleton document example (e.g., global settings)
    schemaType: 'settings',
    singleton: true,
  },
]);

export default listItems;
```

### Key Item Properties {#key-item-properties}

- `isDivider`: Use this to visually separate sections in your studio.
- `schemaType`: The `name` of the document, defined in your schema.
- `singleton`: Set to `true` to treat this item as a single document rather than a list.

## 3. Register the Plugin {#register-the-plugin}

The final step is to add the `structure` plugin to your `sanity.config.ts` file. This is where you pass the `listItems` you just defined.

```ts [sanity.config.ts]
import { defineConfig } from 'sanity';
import { SingletonAction } from 'sanity-plugin-structure-tool';
import { structure } from './src/structure';
import listItems from './src/structure/listItems';

export default defineConfig({
  // ... your studio configuration
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

### What is SingletonAction? {#what-is-singleton-action}

See the [Singleton Action](/customization/singleton-action) guide for more details and customization options.

## Verification {#verification}

To confirm everything is working as expected:

1. Start your studio using your preferred command.
2. Navigate to the **Structure** tab.
3. You should see your list items, dividers, and singletons rendered according to your JSON configuration.

## Next Steps {#next-steps}

Now that your base setup is complete, explore more:

- **[List Items](/guide/list-items)**: Learn how to add icons, filters, and custom parameters.
- **[Examples](/examples/title)**: See specific examples for each field.
- **[FAQ](/guide/faq)**: Find answers to common questions.

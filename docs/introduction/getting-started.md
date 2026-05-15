# Getting Started {#getting-started}

This guide will help you get started with `sanity-plugin-structure-tool` in your Sanity Studio.

## Installation {#installation}

Install the plugin using your preferred package manager:

```bash
npm install sanity-plugin-structure-tool
# or
pnpm add sanity-plugin-structure-tool
# or
yarn add sanity-plugin-structure-tool
```

## Setup {#setup}

First, initialize the plugin and export its utilities. It's recommended to do this in a dedicated file, for example `src/structure/index.ts`.

```typescript
// src/structure/index.ts
import { structureToolPlugin } from 'sanity-plugin-structure-tool';

export const { structure, defineListItems } = structureToolPlugin({
  title: 'My Studio Structure',
});
```

## Defining List Items {#defining-list-items}

Now, define your studio's structure using `defineListItems`. You can create a separate file for this, like `src/structure/listItems.ts`.

```typescript
// src/structure/listItems.ts
import { defineListItems } from './index';

const listItems = defineListItems([
  {
    title: 'General',
    isDivider: true,
  },
  {
    schemaType: 'post', // Automatically creates a list for 'post' documents
  },
  {
    title: 'Settings',
    schemaType: 'settings',
    singleton: true, // Automatically handles singleton logic
  },
]);

export default listItems;
```

## Integration {#integration}

Finally, add the `structure` plugin to your `sanity.config.ts` and pass the `listItems` you defined.

```typescript
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
    // Optional: Add SingletonAction to handle singleton-specific document actions (e.g., hiding "Delete")
    actions: SingletonAction,
  },
});
```

## Next Steps {#next-steps}

Now that you have the basic structure set up, you can explore more advanced features like:

- **Nested Lists:** Use the `children` property to create deeply nested structures.
- **Custom Filters:** Use `filter` and `filterParams` for specific document subsets.
- **Role-based Access:** Control visibility based on user roles.
- **Custom Icons:** Pass Sanity icons to your list items.

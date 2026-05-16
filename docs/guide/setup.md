# Setup {#setup}

After [installing](/introduction/getting-started#installation) the package, follow these three simple steps to integrate **Sanity Structure Tool** into your studio.

## 1. Configuration {#configuration}

First, create a file to configure the plugin. This generates the typed helpers you'll use throughout your project.

```ts [src/structure/index.ts]
import { structureToolPlugin } from 'sanity-plugin-structure-tool';

export const { structure, defineListItems } = structureToolPlugin({
  title: 'My Project',
});
```

::: info Advanced Configuration
For dynamic titles, custom roles, or workspace support, see the full **[Configuration Guide](./setup/configuration)**.
:::

## 2. Define List Items {#define-list-items}

Next, use the generated `defineListItems` helper to define your studio's desk hierarchy in a separate file.

```ts [src/structure/listItems.ts]
import { defineListItems } from './index';

const listItems = defineListItems([
  {
    schemaType: 'author',
  },
  {
    title: 'Settings',
    schemaType: 'settings',
    singleton: true,
  },
]);

export default listItems;
```

::: tip Advanced Usage
Learn more about type safety and modular items in the **[Define List Items Guide](./setup/define-list-items)**.
:::

## 3. Register the Plugin {#step-3-register-plugin}

Finally, add the `structure` plugin and the `SingletonAction` to your `sanity.config.ts`.

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
    // Required to handle document actions for singletons
    actions: SingletonAction,
  },
});
```

::: info What is SingletonAction?
The `SingletonAction` is essential for singletons to work correctly. It ensures that document actions like "Delete" or "Duplicate" are hidden for singletons, while preserving them for regular documents. Learn more in the **[Singleton Action Guide](../customization/singleton-action)**.
:::

## Verification {#verification}

To confirm everything is working as expected:

1. Start your studio:

::: code-group

```sh [npm]
npm run dev
```

```sh [yarn]
yarn dev
```

```sh [pnpm]
pnpm dev
```

```sh [bun]
bun dev
```

:::

2. Navigate to the **Structure** tab in your browser.
3. You should see your list items (e.g., "Authors" and "Settings") rendered correctly.

## Next Steps {#next-steps}

Now that your base setup is complete, explore more:

- **[List Items](./list-items)**: Learn how to add icons, filters, and custom parameters.
- **[Examples](../examples/title)**: See specific examples for each field.
- **[FAQ](./faq)**: Find answers to common questions.

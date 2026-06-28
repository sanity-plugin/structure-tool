# Configuration {#configuration}

The first step in using **Sanity Structure Tool** is configuring the plugin. Instead of importing directly from the package, we recommend creating a dedicated file (e.g., `src/structure/index.ts`) to generate **typed utilities** specific to your project.

## Basic Example {#basic-example}

A minimal setup with just a static title.

::: code-group

```ts [src/structure/index.ts]
import { structureToolPlugin } from 'sanity-plugin-structure-tool';

export const { structure, defineListItems, helpers } = structureToolPlugin({
  title: 'Project Name',
});
```

:::

## Advanced Example {#advanced-example}

A complete setup utilizing dynamic titles, custom roles, and workspaces for enhanced type safety and access control.

::: code-group

```ts [src/structure/index.ts]
import { structureToolPlugin } from 'sanity-plugin-structure-tool';

export const { structure, defineListItems, helpers } = structureToolPlugin({
  // Dynamic title based on active workspace
  title: ({ workspace }) => `${workspace} Workspace`,

  // Custom title for empty lists
  emptyListTitle: 'No items configured',

  // Define available workspaces
  workspaces: ['workspace-1', 'workspace-2'],
  defaultWorkspaces: ['workspace-1'],

  // Define available user roles
  roles: ['administrator', 'editor', 'viewer'],
  defaultRoles: ['administrator'],
});
```

:::

## Parameters {#parameters}

The `structureToolPlugin` function accepts a configuration object with the following properties:

### `title` {#title}

- **Type**: `string | ((params: { workspace: string, currentUser: CurrentUser, context: ConfigContext }) => string)`
- **Required**: Yes

The title of the structure in the Sanity desk.

```ts
title: 'Project Name',
```

### `emptyListTitle` {#empty-list-title}

- **Type**: `string | ((params: { workspace: string, currentUser: CurrentUser, context: ConfigContext }) => string)`
- **Optional**: Yes

The title shown when a document list has no items configured.

```ts
emptyListTitle: 'Nothing to see here',
```

### `workspaces` {#workspaces}

- **Type**: `readonly string[]`
- **Optional**: Yes

An array of all workspace names. Enabling this allows you to use the `workspaces` property in `ListItem`.

```ts
workspaces: ['workspace-1', 'workspace-2'],
```

### `defaultWorkspaces` {#default-workspaces}

- **Type**: `readonly string[]`
- **Optional**: Yes (Required if `workspaces` is provided)

The baseline workspaces for all items.

```ts
defaultWorkspaces: ['workspace-1'],
```

### `roles` {#roles}

- **Type**: `readonly string[]`
- **Optional**: Yes

An array of all user roles. Enabling this allows you to use the `roles` property in `ListItem`.

```ts
roles: ['administrator', 'editor', 'viewer'],
```

### `defaultRoles` {#default-roles}

- **Type**: `readonly string[]`
- **Optional**: Yes (Required if `roles` is provided)

The baseline roles for all items.

```ts
defaultRoles: ['administrator'],
```

## Returns {#returns}

The `structureToolPlugin` function returns a set of utilities that are internally bound to your configuration (including custom types for workspaces and roles).

### `structure` {#return-structure}

The core plugin utility. This is what you import and use within the `plugins` array of your `sanity.config.ts`.

::: code-group

```ts [sanity.config.ts]
import { structure } from './src/structure';

export default defineConfig({
  plugins: [
    structure({
      listItems,
    }),
  ],
});
```

:::

### `helpers` {#return-helpers}

A set of helper functions (`listing`, `singleton`, `divider`, etc.) that are used to define your structure with full type safety.

[Read the full guide on helpers](../helpers).

### `defineListItems` {#return-define-list-items}

A helper used to define the entire hierarchy of your Sanity desk. It ensures that the array of items you provide follows the `ListItem` schema and utilizes any `workspaces/roles` defined during initialization.

[Read the full guide on defining list items](./define-list-items).

### `defineListItem` {#return-define-list-item}

Similar to `defineListItems`, but used for defining a single `ListItem`. This is particularly useful when you want to create modular sections or reuse items across different lists.

::: code-group

```ts [JSON]
export const shopSection = defineListItem({
  title: 'Shop',
  children: [
    {
      schemaType: 'product',
    },
    {
      schemaType: 'category',
    },
    {
      title: 'Sales Information',
      isDivider: true,
    },
    {
      schemaType: 'discount',
    },
  ],
});
```

```ts [Helpers]
export const shopSection = helpers.children('Shop', [
  helpers.listing('product'),
  helpers.listing('category'),
  helpers.divider('Sales Information'),
  helpers.listing('discount'),
]);
```

:::

### `templates` {#return-templates}

A utility for registering **Initial Value Templates**. [Initial value templates](https://www.sanity.io/docs/studio/initial-value-templates) allow you to define default values for new documents. This plugin automatically generates these templates based on the `templates` property you define in your `ListItem`.

::: info Automatic Registration
The `structure` utility handles template registration automatically for you. In most cases, you **do not** need to use this `templates` utility manually.
:::

#### Advanced Use Case {#return-advanced-use-case}

You only need this utility if you want to manually merge the plugin-generated templates with your own custom templates or templates from other plugins in your `sanity.config.ts`:

::: code-group

```ts [sanity.config.ts]
import { templates } from './src/structure';
import listItems from './src/structure/listItems';

export default defineConfig({
  // ...
  schema: {
    templates: (prev, context) => {
      // 1. Get templates from this plugin
      const pluginTemplates = templates({ listItems })(prev, context);

      // 2. Add your own custom templates
      return [
        ...pluginTemplates,
        {
          id: 'custom-template',
          title: 'Custom Template',
          schemaType: 'post',
          value: { title: 'New Post' },
        },
      ];
    },
  },
});
```

:::

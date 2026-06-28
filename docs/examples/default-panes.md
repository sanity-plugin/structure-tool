# `defaultPanes` {#default-panes}

- **Type**: `string[] | ((params: CallbackParams & { childOptions: ChildResolverOptions; views: string[] }) => string[])`
- **Optional**: Yes

The `defaultPanes` property allows you to define which pane tabs (views) are active/open side-by-side by default when a custom document editor or singleton is resolved.

## Standard Usage {#standard-usage}

By default, Sanity resolves the first tab (usually `editor`/`form`). You can use `defaultPanes` to specify different default views or display multiple views side-by-side:

::: code-group

```ts [JSON]
import { CogIcon, BookIcon } from '@sanity/icons';
import { DocumentationComponent } from './components/Documentation';

{
  schemaType: 'settings',
  singleton: true,
  views: [
    {
      title: 'Setting Form',
      type: 'form',
      id: 'setting-form',
      icon: CogIcon,
    },
    {
      title: 'Documentation',
      type: 'component',
      id: 'documentation',
      icon: BookIcon,
      component: DocumentationComponent,
      options: {
        url: 'https://example.com/docs',
      },
    },
  ],
  // Open both the editor form and documentation views side-by-side
  defaultPanes: ['setting-form', 'documentation'],
}
```

```ts [Helpers]
import { CogIcon, BookIcon } from '@sanity/icons';
import { DocumentationComponent } from './components/Documentation';

helpers.singleton('settings', {
  views: [
    {
      title: 'Setting Form',
      type: 'form',
      id: 'setting-form',
      icon: CogIcon,
    },
    {
      title: 'Documentation',
      type: 'component',
      id: 'documentation',
      icon: BookIcon,
      component: DocumentationComponent,
      options: {
        url: 'https://example.com/docs',
      },
    },
  ],
  // Open both the editor form and documentation views side-by-side
  defaultPanes: ['setting-form', 'documentation'],
});
```

:::

## Dynamic Default Panes (Callback) {#dynamic-default-panes}

You can dynamically set default panes using a callback function based on the active desk context. The callback receives standard parameters plus a `views` array containing the IDs of all configured views:

::: code-group

```ts [JSON]
import { CogIcon, BookIcon } from '@sanity/icons';
import { DocumentationComponent } from './components/Documentation';

{
  schemaType: 'settings',
  singleton: true,
  views: [
    {
      title: 'Setting Form',
      type: 'form',
      id: 'setting-form',
      icon: CogIcon,
    },
    {
      title: 'Documentation',
      type: 'component',
      id: 'documentation',
      icon: BookIcon,
      component: DocumentationComponent,
      options: {
        url: 'https://example.com/docs',
      },
    },
  ],
  // Dynamically open all views side-by-side or just the form
  defaultPanes: ({ views, workspace }) =>
    workspace === 'staging' ? views : ['setting-form'],
}
```

```ts [Helpers]
import { CogIcon, BookIcon } from '@sanity/icons';
import { DocumentationComponent } from './components/Documentation';

helpers.singleton('settings', {
  views: [
    {
      title: 'Setting Form',
      type: 'form',
      id: 'setting-form',
      icon: CogIcon,
    },
    {
      title: 'Documentation',
      type: 'component',
      id: 'documentation',
      icon: BookIcon,
      component: DocumentationComponent,
      options: {
        url: 'https://example.com/docs',
      },
    },
  ],
  // Dynamically open all views side-by-side or just the form
  defaultPanes: ({ views, workspace }) => (workspace === 'staging' ? views : ['setting-form']),
});
```

:::

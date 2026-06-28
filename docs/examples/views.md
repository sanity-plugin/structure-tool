# `views` {#views}

- **Type**: `View[] | ((params: CallbackParams & { childOptions: ChildResolverOptions }) => View[])`
- **Optional**: Yes

The `views` property allows you to define multiple pane tabs (views) for singletons or custom document editors in Sanity Studio. Users can switch between these views using tabs in the pane header.

## Standard Usage {#standard-usage}

In this example, we configure a settings singleton pane with two tabs: the default editing form and a custom React component showing documentation.

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
});
```

:::

## Dynamic Views (Callback) {#dynamic-views}

You can dynamically adjust the pane views using a callback function based on the active desk context:

::: code-group

```ts [JSON]
import { CogIcon, BookIcon } from '@sanity/icons';
import { DocumentationComponent } from './components/Documentation';

{
  schemaType: 'settings',
  singleton: true,
  views: ({ workspace }) => [
    {
      title: 'Setting Form',
      type: 'form',
      id: 'setting-form',
      icon: CogIcon,
    },
    // Only show Documentation view on the staging workspace
    ...(workspace === 'staging' ? [{
      title: 'Documentation',
      type: 'component',
      id: 'documentation',
      icon: BookIcon,
      component: DocumentationComponent,
      options: {
        url: 'https://example.com/docs',
      },
    }] : []),
  ],
}
```

```ts [Helpers]
import { CogIcon, BookIcon } from '@sanity/icons';
import { DocumentationComponent } from './components/Documentation';

helpers.singleton('settings', {
  views: ({ workspace }) => [
    {
      title: 'Setting Form',
      type: 'form',
      id: 'setting-form',
      icon: CogIcon,
    },
    // Only show Documentation view on the staging workspace
    ...(workspace === 'staging'
      ? [
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
        ]
      : []),
  ],
});
```

:::

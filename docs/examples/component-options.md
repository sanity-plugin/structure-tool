# `componentOptions` {#component-options}

- **Type**: `Record<string, unknown> | ((params: CallbackParams & { childOptions: ChildResolverOptions }) => Record<string, unknown>)`
- **Optional**: Yes

The `componentOptions` property allows you to pass custom configuration options or parameters to your custom React component rendered via the `component` property.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
import { MyDashboard } from './components/MyDashboard';

{
  title: 'Analytics Dashboard',
  component: MyDashboard,
  componentOptions: {
    refreshInterval: 5000,
    theme: 'dark',
  },
}
```

```ts [Helpers]
import { MyDashboard } from './components/MyDashboard';

helpers.component('Analytics Dashboard', MyDashboard, {
  componentOptions: {
    refreshInterval: 5000,
    theme: 'dark',
  },
});
```

:::

## Dynamic Options (Callback) {#dynamic-options}

You can dynamically resolve `componentOptions` using a callback function based on the active desk context.

::: code-group

```ts [JSON]
import { MyDashboard } from './components/MyDashboard';

{
  title: 'Analytics Dashboard',
  component: MyDashboard,
  componentOptions: ({ workspace, currentUser }) => ({
    workspaceName: workspace,
    userEmail: currentUser.email,
  }),
}
```

```ts [Helpers]
import { MyDashboard } from './components/MyDashboard';

helpers.component('Analytics Dashboard', MyDashboard, {
  componentOptions: ({ workspace, currentUser }) => ({
    workspaceName: workspace,
    userEmail: currentUser.email,
  }),
});
```

:::

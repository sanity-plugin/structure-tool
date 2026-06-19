# `component` {#component}

- **Type**: `UserComponent`
- **Optional**: Yes

The `component` property allows you to render a custom React component as the child (view) of the list item. This is useful for creating custom dashboards, analytics views, or any other non-document based content.

## Standard Usage {#standard-usage}

::: code-group

```ts [JSON]
import { MyDashboard } from './components/MyDashboard';

{
  title: 'Analytics Dashboard',
  component: MyDashboard,
}
```

```ts [Helpers]
import { MyDashboard } from './components/MyDashboard';

helpers.component('Analytics Dashboard', MyDashboard);
```

:::

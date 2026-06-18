# `component` Examples {#component-examples}

The `component` property allows you to render a custom React component as the view for a list item.

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

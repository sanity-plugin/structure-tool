# `workspaces` Example {#workspaces-example}

The `workspaces` property allows you to restrict the visibility of a list item to specific Sanity workspaces. This is ideal for multi-tenant setups where certain document types should only appear in specific environments.

::: info Prerequisite
To use this property, you must first define your available workspaces in the [plugin configuration](../guide/setup/configuration#advanced-example).
:::

## Static Workspaces {#static-workspaces}

When you provide a static array, the workspaces you list are **concatenated** with the `defaultWorkspaces` defined in your configuration.

```ts
{
  title: 'Admin Only Settings',
  schemaType: 'settings',
  // This item will appear in 'admin-workspace' AND all default workspaces
  workspaces: ['admin-workspace'],
}
```

## Dynamic Workspaces (Callback) {#dynamic-workspaces}

Using a callback function gives you full control. Unlike the static array, the returned value of a callback is treated as the **final list**, meaning it does not automatically merge with defaults.

### 1. Exclusive Visibility {#exclusive-visibility}

Use a callback to return a static array if you want the item to appear **only** in specific workspaces, ignoring the `defaultWorkspaces`.

```ts
{
  title: 'Staging Tools',
  schemaType: 'stagingConfig',
  // By using a callback, we ensure this ONLY appears in 'staging-workspace'
  // even if other workspaces are set as defaults.
  workspaces: () => ['staging-workspace'],
}
```

### 2. Filtering Defaults {#filtering-defaults}

You can dynamically filter the `defaultWorkspaces` based on naming conventions or environment logic.

```ts
{
  title: 'Logs',
  schemaType: 'logs',
  // Dynamically show in all default workspaces except 'staging-workspace'
  workspaces: ({ defaultWorkspaces }) => {
    return defaultWorkspaces.filter((item) => item !== 'staging-workspace');
  },
}
```

### 3. Combining with Roles {#combining-with-roles}

You can implement complex logic by combining workspace checks with roles. For more details on user-based restrictions, see the **[roles guide](./roles)**.

```ts
{
  title: 'Sensitive Financial Data',
  schemaType: 'revenue',
  // Only show in the 'finance' workspace, and only for 'administrator' roles
  workspaces: ({ currentUser }) => {
    const isAdmin = currentUser.roles.some(r => r.name === 'administrator');
    return isAdmin ? ['finance-workspace'] : [];
  },
}
```

::: info Note
You can also achieve similar results by using the dedicated [`roles`](./roles) property instead.
:::

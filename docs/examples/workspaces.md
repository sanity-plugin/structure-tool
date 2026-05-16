# `workspaces` Examples {#workspaces-examples}

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
  // This item will appear in 'admin-workspace' and all default workspaces
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

### 3. Using with Roles {#using-with-roles}

You can combine `workspaces` with the `roles` property to create multi-layered access control. This ensures an item is only visible in specific workspaces **and** only to users with certain roles.

```ts
{
  title: 'Financial Reports',
  schemaType: 'revenue',
  // Visible only in 'finance-workspace'
  workspaces: () => ['finance-workspace'],
  // Only for users with the 'administrator' role
  roles: ['administrator'],
}
```

For more details on role-based restrictions, see the **[roles](./roles)**.

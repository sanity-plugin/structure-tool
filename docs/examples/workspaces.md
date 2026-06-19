# `workspaces` {#workspaces}

- **Type**: `string[] | ((params: { defaultWorkspaces: string[] }) => string[])`
- **Optional**: Yes

The `workspaces` property allows you to restrict the visibility of the list item to specific Sanity workspaces. You can provide either a static array of workspaces or a function that returns an array based on the `defaultWorkspaces` defined in your plugin configuration.

::: info Note
When using a **static array**, the provided values are **concatenated** with the `defaultWorkspaces`. When using a **callback function**, the returned array is treated as the **final value**, giving you full control over the resulting list.
:::

::: info Prerequisite
To use this property, you must first define your available workspaces in the [plugin configuration](../guide/setup/configuration#advanced-example).
:::

## Static Workspaces {#static-workspaces}

When you provide a static array, the workspaces you list are **concatenated** with the `defaultWorkspaces` defined in your configuration.

::: code-group

```ts [JSON]
{
  title: 'Admin Only Settings',
  schemaType: 'settings',
  singleton: true,
  // This item will appear in 'admin-workspace' and all default workspaces
  workspaces: ['admin-workspace'],
}
```

```ts [Helpers]
helpers.singleton('settings', {
  title: 'Admin Only Settings',
  // This item will appear in 'admin-workspace' and all default workspaces
  workspaces: ['admin-workspace'],
});
```

:::

## Dynamic Workspaces (Callback) {#dynamic-workspaces}

Using a callback function gives you full control. Unlike the static array, the returned value of a callback is treated as the **final list**, meaning it does not automatically merge with defaults.

### 1. Exclusive Visibility {#exclusive-visibility}

Use a callback to return a static array if you want the item to appear **only** in specific workspaces, ignoring the `defaultWorkspaces`.

::: code-group

```ts [JSON]
{
  title: 'Staging Tools',
  schemaType: 'stagingConfig',
  // By using a callback, we ensure this ONLY appears in 'staging-workspace'
  // even if other workspaces are set as defaults.
  workspaces: () => ['staging-workspace'],
}
```

```ts [Helpers]
helpers.listing('stagingConfig', {
  title: 'Staging Tools',
  // By using a callback, we ensure this ONLY appears in 'staging-workspace'
  // even if other workspaces are set as defaults.
  workspaces: () => ['staging-workspace'],
});
```

:::

### 2. Filtering Defaults {#filtering-defaults}

You can dynamically filter the `defaultWorkspaces` based on naming conventions or environment logic.

::: code-group

```ts [JSON]
{
  title: 'Logs',
  schemaType: 'logs',
  // Dynamically show in all default workspaces except 'staging-workspace'
  workspaces: ({ defaultWorkspaces }) => {
    return defaultWorkspaces.filter((item) => item !== 'staging-workspace');
  },
}
```

```ts [Helpers]
helpers.listing('logs', {
  title: 'Logs',
  // Dynamically show in all default workspaces except 'staging-workspace'
  workspaces: ({ defaultWorkspaces }) => {
    return defaultWorkspaces.filter((item) => item !== 'staging-workspace');
  },
});
```

:::

### 3. Using with Roles {#using-with-roles}

You can combine `workspaces` with the `roles` property to create multi-layered access control. This ensures an item is only visible in specific workspaces **and** only to users with certain roles.

::: code-group

```ts [JSON]
{
  title: 'Financial Reports',
  schemaType: 'revenue',
  // Visible only in 'finance-workspace'
  workspaces: () => ['finance-workspace'],
  // Only for users with the 'administrator' role
  roles: ['administrator'],
}
```

```ts [Helpers]
helpers.listing('revenue', {
  title: 'Financial Reports',
  // Visible only in 'finance-workspace'
  workspaces: () => ['finance-workspace'],
  // Only for users with the 'administrator' role
  roles: ['administrator'],
});
```

:::

For more details on role-based restrictions, see the **[roles](./roles)**.

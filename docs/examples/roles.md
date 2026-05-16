# `roles` Example {#roles-example}

The `roles` property allows you to restrict the visibility of a list item to specific user roles. This ensures that sensitive documents or administrative tools are only accessible to authorized team members.

::: info Prerequisite
To use this property, you must first define your available roles in the [plugin configuration](../guide/setup/configuration#roles).
:::

## Static Roles {#static-roles}

When you provide a static array, the roles you list are **concatenated** with the `defaultRoles` defined in your configuration.

```ts
{
  title: 'Global Settings',
  schemaType: 'settings',
  // This item will appear for 'administrator' and all default roles
  roles: ['administrator'],
}
```

## Dynamic Roles (Callback) {#dynamic-roles-callback}

Using a callback function gives you full control. Unlike the static array, the returned value of a callback is treated as the **final list**, meaning it does not automatically merge with defaults.

### 1. Exclusive Visibility {#exclusive-visibility}

Use a callback to return a static array if you want the item to appear **only** for specific roles, ignoring the `defaultRoles`.

```ts
{
  title: 'Financial Reports',
  schemaType: 'revenue',
  // By using a callback, we ensure this ONLY appears for 'finance-admin'
  // even if other roles are set as defaults.
  roles: () => ['finance-admin'],
}
```

### 2. Filtering Defaults {#filtering-defaults}

You can dynamically filter the `defaultRoles` based on your project's logic.

```ts
{
  title: 'Editor Dashboard',
  schemaType: 'dashboard',
  // Dynamically show for all default roles except 'viewer'
  roles: ({ defaultRoles }) => {
    return defaultRoles.filter((role) => role !== 'viewer');
  },
}
```

### 3. Using with Workspaces {#using-with-workspaces}

You can combine `roles` with the `workspaces` property to create multi-layered access control. This ensures an item is only visible for certain roles **and** only in specific workspaces.

```ts
{
  title: 'Internal Debug Tools',
  schemaType: 'debugInfo',
  // Visible only for the 'developer' role
  roles: () => ['developer'],
  // Only in the 'development-workspace'
  workspaces: () => ['development-workspace'],
}
```

For more details on workspace-based restrictions, see the **[workspaces](./workspaces)**.


# List Items {#list-items}

The core of **Sanity Structure Tool** is the `ListItem` configuration. This guide provides a complete index of all configuration properties.

::: info Using Helpers
You can define list items using either raw objects or the built-in [Helpers](./helpers). Helpers provide enhanced type intelligence and a more expressive syntax.
:::

## Dynamic Values (Callbacks) {#dynamic-values}

Almost every property on a `ListItem` supports **dynamic values**. Instead of passing a static value, you can pass a callback function that receives the active desk context:

```ts
({ workspace, currentUser, context }) => value
```

This dynamic callback pattern allows you to compute structure values dynamically based on the current workspace, logged-in user, or Sanity context.

### Callback Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `workspace` | `string` | The active workspace name. |
| `currentUser` | `CurrentUser` | The currently logged-in Sanity user. |
| `context` | `ConfigContext` | The raw Sanity config context. |

### Example

```ts
helpers.listing('author', {
  // Compute title dynamically based on workspace
  title: ({ workspace }) => workspace === 'staging' ? 'Review Authors' : 'Authors',
  // Hide add button dynamically for non-admin users
  hideAddButton: ({ currentUser }) => !currentUser.roles.some(role => role.name === 'administrator'),
});
```

## Property Reference {#properties}

Click on any property name below to view its complete type definition, details, and interactive usage examples (Standard JSON vs Helpers).

| Property | Type | Optional | Description |
| :--- | :--- | :--- | :--- |
| [`title`](../examples/title) | `string \| ((params: CallbackParams) => string)` | Yes | The display name for the list item in the Sanity desk menu. |
| [`schemaType`](../examples/schema-type) | `string \| ((params: CallbackParams) => string)` | Yes | The name of the document type defined in your Sanity schema. |
| [`icon`](../examples/icon) | `IconComponent \| ComponentType \| ReactNode` | Yes | The icon to display to the left of the title. |
| [`singleton`](../examples/singleton) | `boolean \| ((params: CallbackParams) => boolean)` | Yes (Default: `false`) | Treats the item as a single document rather than a list. |
| [`component`](../examples/component) | `UserComponent` | Yes | Renders a custom React component as the view for a list item. |
| [`children`](../examples/children) | `ListItem[] \| ((params: CallbackParams) => ListItem[])` | Yes | An array of `ListItem` objects to create a nested list. |
| [`apiVersion`](../examples/api-version) | `string \| ((params: CallbackParams) => string)` | Yes | Specifies the Sanity API version to use for this specific list item. |
| [`filter`](../examples/filter) | `string \| ((params: CallbackParams) => string)` | Yes | A GROQ filter string to limit which documents are shown. |
| [`filterParams`](../examples/filter) | `Record<string, unknown> \| ((params: CallbackParams) => Record<string, unknown>)` | Yes | Parameters to be used within the `filter` GROQ string. |
| [`workspaces`](../examples/workspaces) | `string[] \| ((params: { defaultWorkspaces: string[] }) => string[])` | Yes | Restricts the visibility of the list item to specific workspaces. |
| [`roles`](../examples/roles) | `string[] \| ((params: { defaultRoles: string[] }) => string[])` | Yes | Restricts the visibility of the list item to specific user roles. |
| [`hideAddButton`](../examples/hide-add-button) | `boolean \| ((params: CallbackParams) => boolean)` | Yes (Default: `false`) | Hides the "Add" button (plus icon) for the document list. |
| [`templates`](../examples/templates) | `Record<string, unknown> \| ((params: CallbackParams) => Record<string, unknown>)` | Yes | Passes initial value templates for new documents. |
| [`raw`](../examples/raw) | `(S: StructureBuilder, context: ConfigContext) => ListItem` | Yes | The "Escape Hatch" to use the native Sanity Structure Builder API. |
| [`isDivider`](../examples/is-divider) | `boolean \| ((params: CallbackParams) => boolean)` | Yes (Default: `false`) | Renders as a visual separator in the desk list. |
| [`isPlural`](../examples/is-plural) | `boolean \| ((params: CallbackParams) => boolean)` | Yes (Default: `true`) | Controls automatic pluralization of the auto-generated title. |

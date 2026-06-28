# List Items {#list-items}

The core of **Sanity Structure Tool** is the `ListItem` configuration. This guide provides a complete index of all configuration properties.

::: info Using Helpers
You can define list items using either raw objects or the built-in [Helpers](./helpers). Helpers provide enhanced type intelligence and a more expressive syntax.
:::

## Dynamic Values (Callbacks) {#dynamic-values}

Almost every property on a `ListItem` supports **dynamic values**. Instead of passing a static value, you can pass a callback function that receives the active desk context:

```ts
({ workspace, currentUser, context }) => value;
```

This dynamic callback pattern allows you to compute structure values dynamically based on the current workspace, logged-in user, or Sanity context.

### Callback Parameters

| Parameter      | Type                   | Description                                                                                         |
| :------------- | :--------------------- | :-------------------------------------------------------------------------------------------------- |
| `workspace`    | `string`               | The active workspace name.                                                                          |
| `currentUser`  | `CurrentUser`          | The currently logged-in Sanity user.                                                                |
| `context`      | `ConfigContext`        | The raw Sanity config context.                                                                      |
| `childOptions` | `ChildResolverOptions` | Optional. Resolver options from the active child pane structure resolution context (Sanity Studio). |

::: info Resolver-level Callback Parameters
The `childOptions` parameter is passed to callback properties that resolve recursively down a structural path (e.g. `children`, `showIcons`, `filter`, `componentOptions`, `menuItems`, etc.). This enables access to current route parameters, parent structure references, or payload values.
:::

### Example

```ts
helpers.listing('author', {
  // Compute title dynamically based on workspace
  title: ({ workspace }) => (workspace === 'staging' ? 'Review Authors' : 'Authors'),
  // Hide add button dynamically for non-admin users
  hideAddButton: ({ currentUser }) =>
    !currentUser.roles.some((role) => role.name === 'administrator'),
});
```

## Property Reference {#properties}

Click on any property name below to view its complete type definition, details, and interactive usage examples (Standard JSON vs Helpers).

| Property                                            | Optional               | Description                                                          |
| :-------------------------------------------------- | :--------------------- | :------------------------------------------------------------------- |
| [`id`](../examples/id)                              | Yes                    | Uniquely identifies the list item in the desk menu path.             |
| [`title`](../examples/title)                        | Yes                    | The display name for the list item in the Sanity desk menu.          |
| [`schemaType`](../examples/schema-type)             | Yes                    | The name of the document type defined in your Sanity schema.         |
| [`icon`](../examples/icon)                          | Yes                    | The icon to display to the left of the title.                        |
| [`showIcons`](../examples/show-icons)               | Yes                    | Controls whether icons are displayed for items inside this list.     |
| [`singleton`](../examples/singleton)                | Yes (Default: `false`) | Treats the item as a single document rather than a list.             |
| [`component`](../examples/component)                | Yes                    | Renders a custom React component as the view for a list item.        |
| [`componentOptions`](../examples/component-options) | Yes                    | Passes custom options or properties to your custom component.        |
| [`views`](../examples/views)                        | Yes                    | Defines multiple pane tabs (views) for singletons or document editors. |
| [`children`](../examples/children)                  | Yes                    | An array of `ListItem` objects to create a nested list.              |
| [`apiVersion`](../examples/api-version)             | Yes                    | Specifies the Sanity API version to use for this specific list item. |
| [`filter`](../examples/filter)                      | Yes                    | A GROQ filter string to limit which documents are shown.             |
| [`filterParams`](../examples/filter)                | Yes                    | Parameters to be used within the `filter` GROQ string.               |
| [`defaultOrdering`](../examples/default-ordering)   | Yes                    | Sets the default sorting order for document lists.                   |
| [`defaultLayout`](../examples/default-layout)       | Yes                    | Specifies the default layout style for documents listed.             |
| [`defaultPanes`](../examples/default-panes)         | Yes                    | Defines which view pane tabs are active/open side-by-side by default.  |
| [`menuItemGroups`](../examples/menu-item-groups)    | Yes                    | Groups custom actions/items in the pane header menu.                 |
| [`menuItems`](../examples/menu-items)               | Yes                    | Defines custom actions/items in the pane header menu.                |
| [`workspaces`](../examples/workspaces)              | Yes                    | Restricts the visibility of the list item to specific workspaces.    |
| [`roles`](../examples/roles)                        | Yes                    | Restricts the visibility of the list item to specific user roles.    |
| [`hideAddButton`](../examples/hide-add-button)      | Yes (Default: `false`) | Hides the "Add" button (plus icon) for the document list.            |
| [`templates`](../examples/templates)                | Yes                    | Passes initial value templates for new documents.                    |
| [`raw`](../examples/raw)                            | Yes                    | The "Escape Hatch" to use the native Sanity Structure Builder API.   |
| [`isDivider`](../examples/is-divider)               | Yes (Default: `false`) | Renders as a visual separator in the desk list.                      |
| [`isPlural`](../examples/is-plural)                 | Yes (Default: `true`)  | Controls automatic pluralization of the auto-generated title.        |
| [`isVisible`](../examples/is-visible)               | Yes (Default: `true`)  | Controls the visibility of the list item in the navigation menu.     |

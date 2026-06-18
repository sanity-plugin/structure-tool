# Core Features

The Sanity Plugin Structure Tool provides several high-level features that enhance the development experience:

## 1. Declarative Structure

Instead of chaining method calls, you define lists, items, and singletons using plain JavaScript/TypeScript objects.

## 2. Visibility Control (Roles & Workspaces)

Every item in the structure can have `roles` and `workspaces` properties. The plugin automatically handles the logic to show or hide these items based on the current user's permissions and the active workspace.

## 3. Helper Factories

The tool provides a set of helper functions to quickly create common structure elements:

- `singleton()`: For documents that only have one instance.
- `listing()`: For standard document lists.
- `divider()`: To add visual separation in the menu.
- `component()`: To render custom React components in the pane.
- `filters()`: To create filtered lists (e.g., "Drafts", "Published").
- `raw()`: To drop down to the native Structure Builder API when needed.

## 4. Automatic Initial Value Templates

When you define a filtered list (e.g., documents with a specific field value), the plugin automatically generates and registers a Sanity initial value template so that new documents created from that list are pre-populated with the correct data.

## 5. Singleton Management

The `SingletonAction` can be used to restrict actions like 'delete', 'duplicate', or 'unpublish' for singleton documents, ensuring data integrity.

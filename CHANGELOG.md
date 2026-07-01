## 1.0.0 (2026-07-02)

### 🚀 Features

- **sanity-plugin-structure-tool:**
  - Added support for internationalization (`i18n`) on list items, folders, components, and dividers.
  - Added `i18n` configuration option to register locale translation resource bundles mapping.
  - Added support for parent/child separate title translation mapping.
  - Added `I18N_NAMESPACE` and `UNIQUE_ID_FIRST_VALUE` constants.
- **docs:**
  - Added comprehensive guide and examples for internationalization (`i18n`) configuration and localization bundle setup.
  - Documented `I18N_NAMESPACE` and `UNIQUE_ID_FIRST_VALUE` constants.
  - Updated upcoming features and roadmap targeting the v2.0.0 release.
- **studio:**
  - Added interactive internationalization examples with English (`en`) and Spanish (`es`) workspaces, translation json dictionaries, and nested layout drawer lists.

## 0.5.0 (2026-06-29)

### 🚀 Features

- **sanity-plugin-structure-tool:**
  - Added support for custom editor pane view tabs (`views`) and default pane layouts (`defaultPanes`) to singletons and custom editor items.
  - Added support for `childOptions` parameter context inside `ListItem` callback resolver functions.
- **docs:**
  - Added reference documentation and code examples for the new `views` and `defaultPanes` properties.
  - Aligned all `ListItem` property callback signatures to explicitly document and type `childOptions` context parameters.
- **studio:**
  - Added singleton examples in the reference studio demonstrating custom views and multiple panes opened side-by-side by default.

### 🩹 Fixes

- **docs:**
  - Sorted properties and helpers alphabetically in all reference tables, sidebars, and guide files.

## 0.4.0 (2026-06-25)

### 🚀 Features

- **sanity-plugin-structure-tool:**
  - Added support for custom actions via `menuItems` and collapsible sections via `menuItemGroups` in pane header menus.
  - Added dynamic callback support to `menuItems` and `menuItemGroups` with access to a `prev` parameter containing default items from Sanity Studio.
  - Added `isVisible` configuration option (boolean or callback) to dynamically hide/show list items.
  - Added support for separate `parent` and `child` display titles in the `title` option (using `title: { parent: ..., child: ... }`).
  - Added workspace and role filter evaluation to control visibility of list items per workspace/user role.
  - Completed JSDoc documentation comprehensively for all exported and internal functions, interfaces, and types.
- **docs:**
  - Added examples and documentation for `menuItems`, `menuItemGroups`, `isVisible`, and the parent/child pane title configuration format.
- **studio:**
  - Added example configurations for custom action menus, groups, parent/child titles, and visibility toggles in the reference studio.

## 0.3.0 (2026-06-20)

### 🚀 Features

- **sanity-plugin-structure-tool:**
  - Added dynamic callback support for almost all `ListItem` properties (e.g. `title`, `schemaType`, `singleton`, `children`, `filter`, `filterParams`, `hideAddButton`, `templates`, `apiVersion`, `defaultOrdering`, `defaultLayout`, `showIcons`, `id`).
  - Updated `workspaces` and `roles` callbacks to receive standard desk context (`workspace`, `currentUser`, `context`) alongside default values.
  - Added support for custom component options via `componentOptions` for user components.
  - Added `defaultOrdering` and `defaultLayout` properties for list view configuration.
  - Added support for `showIcons` and `icon: false` to customize icon visibility.
  - Added dynamic `id` callback support with access to `uniqueId`, `sanitizedPaths`, `id`, and `slugify`.
  - Exposed `URL_PATH_SEPARATOR` as a public constant.
- **docs:**
  - Added dedicated documentation and examples for `id`, `showIcons`, `defaultOrdering`, `defaultLayout`, `componentOptions`, and `URL_PATH_SEPARATOR`.
  - Reorganized Property Reference guide tables and sidebar menus.
- **studio:**
  - Added interactive feature demonstration drawers in the reference studio for all newly introduced layout, ordering, and configuration options.

## 0.2.0 (2026-05-18)

### 🚀 Features

- **sanity-plugin-structure-tool:** Added support for `apiVersion` in `ListItem` configuration and exposed public `constants` (e.g., `SINGLETON_KEY`).
- **docs:**
  - Added documentation for `apiVersion`, `constants`, and the **Upcoming Features & Roadmap**.
  - Documented critical property constraints and mutual exclusions (e.g., `templates` vs. `hideAddButton`).
  - Refactored all guides and examples to follow a consistent property order.
- **studio:** Expanded the reference studio with examples for every `ListItem` property.

## 0.1.0 (2026-05-17)

### 🚀 Features

- **sanity-plugin-structure-tool:** Initial release of the JSON-based Sanity Structure Tool.
- **docs:** Added comprehensive guides and introductory documentation.
- **studio:** Integrated a reference Sanity Studio with implementation examples.

### ❤️ Thank You

- Nisharg Shah @nishargshah

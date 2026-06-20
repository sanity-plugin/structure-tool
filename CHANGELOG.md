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

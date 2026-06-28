# Sanity Plugin Structure Tool

Welcome! This repository uses a `.agents` folder to store in-depth technical documentation and "memory" for AI assistants.

## Getting Started

For a comprehensive understanding of the project, please refer to:

- [.agents/PROJECT_OVERVIEW.md](./.agents/PROJECT_OVERVIEW.md)
- [.agents/CORE_FEATURES.md](./.agents/CORE_FEATURES.md)
- [.agents/TECHNICAL_IMPLEMENTATION.md](./.agents/TECHNICAL_IMPLEMENTATION.md)
- [.agents/DEVELOPMENT_GUIDE.md](./.agents/DEVELOPMENT_GUIDE.md)
- [.agents/CONVENTIONS.md](./.agents/CONVENTIONS.md)

## Key Locations

- **Core Plugin**: `packages/sanity-plugin-structure-tool`
- **Example Studio**: `apps/studio`
- **Documentation**: `docs`

Refer to the files above for specific implementation details and coding standards.

---

## Agent Coding Rules

### Helper Callback Pattern

When working with list item definitions or documenting them:

- Remember that `defineListItems` and `defineListItem` support a callback parameter `({ helpers }) => ...`.
- This callback avoids the need to import `helpers` globally or contextually in every single file.
- When writing documentation (such as `.md` files in `docs/`), always present both the plain JSON-like object format and the helper-based format (using both the direct import and callback signatures) to ensure completeness.

### Documentation and Type Synchronization

When changing structural options or list item definitions:

- Reference the documentation under `docs/` to ensure consistency.
- Ensure that any modifications to options, properties, or definitions are simultaneously updated in the corresponding TypeScript definition files (e.g. `types.ts`, `listItem.types.ts`, etc.) so that types and docs remain in sync.

### JSDoc Documentation Guidelines

When creating or modifying typescript source files (e.g. `*.types.ts` files, utility helpers, actions, and rendering logic):

- Write detailed JSDoc comments for all exported types, interfaces, utility functions, type guards, and core resolver helper functions.
- Ensure JSDocs contain clear `@template`, `@param`, and `@returns` metadata tags to populate IDE IntelliSense properly for the end-user.
- When the user requests "jsdoc", it means: "Write JSDoc comments for all files, functions, types, and everything existing under the `packages/sanity-plugin-structure-tool` package."

### Alphabetical Sorting Convention

When modifying, adding, or documenting properties on `ListItemCore` or helper methods (e.g. `listing`, `singleton`, etc.):

- Always sort the property declarations in `ListItemCore` interface and types alphabetically.
- Always sort the destructuring declarations of `getComputedListItems` and `listItem` alphabetically.
- Always sort the returned object keys of `getComputedListItems` alphabetically.
- Always sort the sidebar entries and property reference lists in the VitePress documentation (`docs/.vitepress/config.ts`, `docs/guide/list-items.md`, etc.) alphabetically.
- Always sort helper declarations (`Helpers` interface, `helpers` export mapping, and documentation sections in `docs/guide/helpers.md`) alphabetically.

---

## Agent Tool Constraints

- **DO NOT** run linting, formatting, or type-checking commands (e.g., `pnpm lint`, `pnpm format`, `pnpm typecheck`, `eslint`, `prettier`, `tsc`, `script:lint`). The user will handle these manually before pushing.
- **DO NOT** run `git add` or any git commit commands. The user will manually review, stage, and commit changes if they are correct.

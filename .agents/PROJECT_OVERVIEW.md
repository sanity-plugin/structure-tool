# Project Overview: Sanity Plugin Structure Tool

The **Sanity Plugin Structure Tool** is a powerful, JSON-based declarative wrapper for Sanity Studio's Structure Builder. It aims to simplify the creation of complex, role-aware, and workspace-aware content hierarchies by providing a cleaner, more maintainable alternative to the native imperative API.

## Architecture

The project is structured as a monorepo using `pnpm` workspaces:

- **`packages/sanity-plugin-structure-tool`**: The core plugin logic.
- **`apps/studio`**: A development Sanity Studio instance demonstrating the plugin's capabilities.
- **`configs/`**: Shared configurations for ESLint, Prettier, TypeScript, and `tsdown`.
- **`docs/`**: VitePress-based documentation site.

## Purpose

Standard Sanity Structure Builder logic can often become verbose and hard to manage as requirements grow (e.g., conditional visibility based on roles). This tool allows developers to define their structure as a set of declarative objects and arrays, which the plugin then "renders" into the standard Sanity structure.

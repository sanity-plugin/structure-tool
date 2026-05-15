# Why Sanity Structure Tool? {#why-sanity-structure-tool}

Sanity Studio's native `Structure Builder` is incredibly powerful, but as projects grow, building complex, nested structures with it can become verbose, repetitive, and difficult to maintain. 

**Sanity Structure Tool** is designed to simplify this process by providing a **declarative, JSON-based API** for defining your studio's structure.

## The Problem {#the-problem}

When using the standard Structure Builder, you often find yourself writing a lot of boilerplate code for common tasks:

- **Singletons:** Manually creating a list item that opens a specific document ID and hiding it from the main list.
- **Pluralization:** Repeatedly defining titles and icons for document types.
- **Nesting:** Managing deeply nested lists with multiple `S.list().title().items([...])` calls.
- **Role-based Access:** Implementing conditional logic to hide or show items based on user roles.

This imperative approach can lead to a structure file that is hard to read and even harder to refactor.

## The Solution {#the-solution}

Sanity Structure Tool allows you to define your structure as a clean, hierarchical data structure.

### 1. Declarative Syntax {#declarative-syntax}
Instead of chaining methods, you define what you want your structure to look like. This makes it easier to visualize the hierarchy and understand the layout at a glance.

### 2. Built-in Singleton Support {#built-in-singleton-support}
Creating a singleton is as simple as adding `singleton: true` to your configuration. The plugin handles the document ID generation, the editor view, and the filtering automatically.

### 3. Automatic Pluralization {#automatic-pluralization}
By default, the plugin uses `pluralize` to generate titles for your document lists, but you can easily override this or disable it per item.

### 4. Role & Workspace Awareness {#role-workspace-awareness}
The tool is built with multi-role and multi-workspace environments in mind. You can easily restrict visibility of specific list items based on the current user's roles or the active workspace.

### 5. Developer Experience (DX) {#developer-experience-dx}
With full TypeScript support, you get autocompletion and type safety for your structure definitions, reducing the risk of runtime errors and making the development process much smoother.

### 6. Escape Hatch {#escape-hatch}
Need to do something highly custom that the JSON API doesn't support? You can use the `raw` property to drop back into the standard Sanity Structure Builder whenever you need to.

## Conclusion {#conclusion}

Sanity Structure Tool doesn't replace the Structure Builder, it builds on top of it to offer a more maintainable and developer-friendly way to manage your Sanity Studio's desk structure.

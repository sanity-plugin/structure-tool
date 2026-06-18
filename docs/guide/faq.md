# Frequently Asked Questions {#faq}

Here are some of the most common questions and clarifications about using `sanity-plugin-structure-tool`. This section will help you understand differences, setup tips, and design decisions behind the package.

## 1. What is Sanity Structure Tool? {#what-is-sanity-structure-tool}

It is a declarative, JSON-based wrapper around Sanity's `structureTool`. It allows you to define your studio's desk structure using a configuration object instead of the imperative `Structure Builder` API.

## 2. Can I use it alongside the standard Structure Builder? {#can-i-use-it-alongside-standard-structure-builder}

Yes! If you have a highly complex requirement that the JSON API doesn't support yet, you can use the `raw` property or `helpers.raw` to drop back into the native `Structure Builder` (S).

::: code-group
```ts [JSON]
{
  raw: (S) => S.listItem().title('Custom').child(...)
}
```

```ts [Helpers]
helpers.raw((S) => S.listItem().title('Custom').child(...))
```
:::

## 3. Does it support Singletons? {#does-it-support-singletons}

Absolutely. Singletons are a first-class citizen. You can use `helpers.singleton('yourType')` or add `singleton: true` to your JSON config, and the tool will handle the document ID, editor view, and list filtering for you.

## 4. How do I handle user roles? {#how-do-i-handle-user-roles}

The tool has built-in support for roles. You can define `roles` at the plugin level and then restrict specific list items using the `roles` property on any helper or JSON object.

## 5. Is it TypeScript compatible? {#is-it-typescript-compatible}

Yes, it is built with TypeScript and provides full type safety and autocompletion for your structure definitions, especially when using the generated helpers.

## 6. Why should I use this instead of the native API? {#why-should-i-use-this-instead-of-native-api}

While the native API is powerful, it can become very verbose and hard to maintain as your studio grows. This tool provides a cleaner, more readable hierarchy that is easier to refactor and manage, especially for common patterns like singletons and nested lists.

For a detailed side-by-side example, check out our **[Comparison Guide](./comparison)**.

## 7. Why do JSON configurations and Helpers (Object) properties match? {#why-do-json-and-helpers-match}

You will notice that the properties in a plain JSON configuration and a `Helpers (Object)` call match exactly. 

The helper function wrapper is provided so that the TypeScript compiler can actively identify and validate the precise parameters you can use (e.g., checking if roles/workspaces are enabled in your setup configuration), offering inline IntelliSense and error checking while keeping the object structure you are familiar with.

# Frequently Asked Questions {#faq}

Here are some of the most common questions and clarifications about using `sanity-plugin-structure-tool`. This section will help you understand differences, setup tips, and design decisions behind the package.

## 1. What is Sanity Structure Tool? {#what-is-sanity-structure-tool}

It is a declarative, JSON-based wrapper around Sanity's `structureTool`. It allows you to define your studio's desk structure using a configuration object instead of the imperative `Structure Builder` API.

## 2. Can I use it alongside the standard Structure Builder? {#can-i-use-it-alongside-standard-structure-builder}

Yes! If you have a highly complex requirement that the JSON API doesn't support yet, you can use the `raw` property in any list item to drop back into the native `Structure Builder` (S).

```ts
{
  title: 'Custom Item',
  raw: (S) => S.listItem().title('Custom').child(...),
}
```

## 3. Does it support Singletons? {#does-it-support-singletons}

Absolutely. Singletons are a first-class citizen. Just add `singleton: true` to your item configuration, and the tool will handle the document ID, editor view, and list filtering for you.

## 4. How do I handle user roles? {#how-do-i-handle-user-roles}

The tool has built-in support for roles. You can define `roles` at the plugin level and then restrict specific list items using the `roles` property.

## 5. Is it TypeScript compatible? {#is-it-typescript-compatible}

Yes, it is built with TypeScript and provides full type safety and autocompletion for your structure definitions.

## 6. Why should I use this instead of the native API? {#why-should-i-use-this-instead-of-native-api}

While the native API is powerful, it can become very verbose and hard to maintain as your studio grows. This tool provides a cleaner, more readable hierarchy that is easier to refactor and manage, especially for common patterns like singletons and nested lists.

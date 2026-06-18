# Coding Conventions & Standards

## Language

- Use **TypeScript** for everything. Avoid `any` and prefer strict typing.

## Code Style

- Follow the patterns established in the `configs/` directory.
- Use functional programming patterns (factories, pure functions) where possible.
- Prefer explicit configuration over "magic" behavior.
- Prefer the callback signature `({ helpers }) => ...` in `defineListItems` and `defineListItem` when defining list items to avoid importing `helpers` globally.

## Project Structure

- Core logic lives in `packages/sanity-plugin-structure-tool/src`.
- Helpers and utilities should be generic and reusable.
- Keep the `apps/studio` updated with new features to serve as both a development environment and a living documentation.

## Documentation

- Add new features to the `docs/` folder (VitePress).
- Maintain JSDoc comments for public-facing APIs in the core plugin.
- When writing documentation or examples for defining list items, always present both the plain JSON-like object format and the helper-based format (using both the direct import and callback signatures) to ensure completeness.

## Tool Usage Constraints

- **DO NOT** run linting, formatting, or type-checking commands (e.g., `pnpm lint`, `pnpm format`, `pnpm typecheck`, `eslint`, `prettier`, `tsc`, `script:lint`). The user will handle these manually before pushing.
- **DO NOT** run `git add` or any git commit commands. The user will manually review, stage, and commit changes if they are correct.

# Development Guide

## Setup

1. Install dependencies: `pnpm install`
2. Bootstrap the project: `pnpm bootstrap` (builds the config and core plugin)

## Common Commands

- **Run Studio**: `pnpm studio:dev`
- **Run Docs**: `pnpm docs:dev`
- **Build All**: `pnpm build`
- **Lint**: `pnpm lint` or `pnpm root:lint`
- **Format**: `pnpm format` or `pnpm root:format`
- **Typecheck**: `pnpm typecheck`

## Build System

The project uses `tsdown` (an esbuild-based bundler) for packaging the core plugin. Configurations for `tsdown` are shared across the monorepo to maintain consistency.

## Environment Variables

Check `apps/studio/.env.example` for required environment variables when running the studio locally.

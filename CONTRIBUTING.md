# Contributing

## Setup
- Runtime: Bun
- Node version: see .nvmrc

bun install
bun run dev

## Development

- bun run dev — start dev server
- bun run build — production build
- bun run typecheck — TypeScript check (no emit)
- bun run lint — ESLint

## Commits

Use conventional commits:
- feat: new feature
- fix: bug fix
- chore: tooling, deps, config
- docs: documentation only

## Pull Requests

- Keep PRs focused — one concern per PR
- TypeScript errors and lint failures will block CI
- Add a short description of what changed and why

# process-flow-editor

A visual process flow editor for building and validating node-based workflows.

## Stack

- [Vite](https://vitejs.dev/) — build tool and dev server
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Flow](https://reactflow.dev/) — node-based graph UI
- [Zustand](https://zustand-demo.pmnd.rs/) — state management
- [AJV](https://ajv.js.org/) — JSON schema validation
- [HeroUI](https://www.heroui.com/) — component library
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Bun](https://bun.sh/) — runtime and package manager

## Setup

```sh
bun install
bun run dev
```

## What it does

process-flow-editor lets you visually compose process flows using a drag-and-drop canvas. Nodes represent discrete steps or operations; edges define the connections between them. The editor validates flow structure against a JSON schema so invalid configurations are caught before execution.

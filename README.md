# process-flow-editor

A working demo of [React Flow](https://reactflow.dev/) — a visual editor for building manufacturing process workflows.

Drag node types onto the canvas, wire them together, annotate each step with parameters, validate the graph against a JSON schema, and export a structured JSON document. The pre-loaded example models a MEMS semiconductor fabrication pipeline: Silicon Wafer → Photolithography → SEM Inspection → MEMS Device.

**[Live demo →](https://process-flow-editor.vercel.app)**

---

## What you can build with it

Manufacturing process flows where physical material moves through a sequence of steps:

- **Material** — a raw input (wafer, blank, substrate, feedstock)
- **Process** — a transformation step (machining, lithography, deposition, assembly)
- **Inspection** — a quality or measurement gate (SEM, CMM, optical, electrical test)
- **Output** — the finished artifact (device, part, assembly)

Each node holds a label and freeform key/value parameters (duration, temperature, tolerance, equipment ID, etc.). The schema validator ensures every node has a non-empty label and every edge references real node IDs before you export.

## What this demo shows

- Custom React Flow node types with typed handles and selection state
- Drag-and-drop node creation from a palette sidebar
- Zustand store wiring for `onNodesChange` / `onEdgesChange` / `onConnect`
- AJV JSON Schema validation with error surfacing in a modal
- Dark mode with system preference detection and no flash on load
- HeroUI v3 + Tailwind CSS v4 component setup with Vite

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Flow](https://reactflow.dev/) — graph canvas
- [Zustand](https://zustand-demo.pmnd.rs/) — state management
- [AJV](https://ajv.js.org/) — JSON schema validation
- [HeroUI v3](https://www.heroui.com/) — component library
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Bun](https://bun.sh/) — runtime and package manager

## Setup

```sh
bun install
bun run dev
```

Other scripts:

```sh
bun run build      # production build
bun run typecheck  # TypeScript check (no emit)
bun run lint       # ESLint
```

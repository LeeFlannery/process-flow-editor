import { create } from 'zustand'
import {
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react'
import type { NodeType, WorkflowExport } from '../types'

export type NodeData = {
  label: string
  parameters: Record<string, string>
}

export type FlowNode = Node<NodeData>

const DEFAULT_LABELS: Record<NodeType, string> = {
  material: 'Material',
  process: 'Process',
  inspection: 'Inspection',
  output: 'Output',
}

const INITIAL_NODES: FlowNode[] = [
  {
    id: 'mat-1',
    type: 'material',
    position: { x: 100, y: 200 },
    data: { label: 'Silicon Wafer', parameters: {} },
  },
  {
    id: 'proc-1',
    type: 'process',
    position: { x: 350, y: 200 },
    data: { label: 'Photolithography', parameters: { duration: '45min', temperature: '90°C' } },
  },
  {
    id: 'insp-1',
    type: 'inspection',
    position: { x: 600, y: 200 },
    data: { label: 'SEM Inspection', parameters: { magnification: '10000x' } },
  },
  {
    id: 'out-1',
    type: 'output',
    position: { x: 850, y: 200 },
    data: { label: 'MEMS Device', parameters: {} },
  },
]

const INITIAL_EDGES: Edge[] = [
  { id: 'e-mat-proc', source: 'mat-1', target: 'proc-1' },
  { id: 'e-proc-insp', source: 'proc-1', target: 'insp-1' },
  { id: 'e-insp-out', source: 'insp-1', target: 'out-1' },
]

interface GraphState {
  nodes: FlowNode[]
  edges: Edge[]
  selectedNodeId: string | null

  addNode: (type: NodeType, position: { x: number; y: number }) => void
  updateNode: (id: string, changes: Partial<NodeData>) => void
  addParameter: (nodeId: string, key: string, value: string) => void
  removeParameter: (nodeId: string, key: string) => void
  setSelectedNode: (id: string | null) => void
  onNodesChange: (changes: NodeChange<FlowNode>[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void
  exportWorkflow: () => WorkflowExport
}

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: INITIAL_NODES,
  edges: INITIAL_EDGES,
  selectedNodeId: null,

  addNode: (type, position) => {
    const id = crypto.randomUUID()
    const newNode: FlowNode = {
      id,
      type,
      position,
      data: { label: DEFAULT_LABELS[type], parameters: {} },
    }
    set((state) => ({ nodes: [...state.nodes, newNode] }))
  },

  updateNode: (id, changes) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...changes } } : node
      ),
    }))
  },

  addParameter: (nodeId, key, value) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                parameters: { ...node.data.parameters, [key]: value },
              },
            }
          : node
      ),
    }))
  },

  removeParameter: (nodeId, key) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== nodeId) return node
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [key]: _removed, ...rest } = node.data.parameters
        return { ...node, data: { ...node.data, parameters: rest } }
      }),
    }))
  },

  setSelectedNode: (id) => set({ selectedNodeId: id }),

  onNodesChange: (changes) => {
    set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) }))
  },

  onEdgesChange: (changes) => {
    set((state) => ({ edges: applyEdgeChanges(changes, state.edges) }))
  },

  onConnect: (connection) => {
    set((state) => ({ edges: addEdge(connection, state.edges) }))
  },

  exportWorkflow: () => {
    const { nodes, edges } = get()
    return {
      version: '1.0',
      nodes: nodes.map(({ id, type, data }) => ({
        id,
        type: type as NodeType,
        label: data.label,
        parameters: data.parameters,
      })),
      edges: edges.map(({ id, source, target }) => ({ id, source, target })),
    }
  },
}))

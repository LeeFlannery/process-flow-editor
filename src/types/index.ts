export type NodeType = 'material' | 'process' | 'inspection' | 'output'

export interface NodeParameters {
  [key: string]: string
}

export interface WorkflowNode {
  id: string
  type: NodeType
  label: string
  parameters: NodeParameters
  position: { x: number; y: number }
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
}

export interface WorkflowExport {
  version: '1.0'
  nodes: Omit<WorkflowNode, 'position'>[]
  edges: WorkflowEdge[]
}

import { useCallback, useRef } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  type ReactFlowInstance,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useGraphStore, type FlowNode } from '../store/graphStore'
import { MaterialNode } from './nodes/MaterialNode'
import { ProcessNode } from './nodes/ProcessNode'
import { InspectionNode } from './nodes/InspectionNode'
import { OutputNode } from './nodes/OutputNode'
import type { NodeType } from '../types'

const nodeTypes = {
  material: MaterialNode,
  process: ProcessNode,
  inspection: InspectionNode,
  output: OutputNode,
}

export function GraphCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNode,
  } = useGraphStore()

  const rfInstance = useRef<ReactFlowInstance<FlowNode> | null>(null)

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    const type = event.dataTransfer.getData('nodeType') as NodeType
    if (!type || !rfInstance.current) return
    const position = rfInstance.current.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    })
    addNode(type, position)
  }, [addNode])

  return (
    <div className="flex-1 h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={(instance) => { rfInstance.current = instance }}
        onNodeClick={(_, node) => setSelectedNode(node.id)}
        onPaneClick={() => setSelectedNode(null)}
        fitView
        className="bg-default-50"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

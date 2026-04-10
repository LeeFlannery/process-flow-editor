import { useCallback, useRef } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  type ReactFlowInstance,
  type OnSelectionChangeParams,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useGraphStore, type FlowNode } from '../store/graphStore'
import { useTheme } from '../context/ThemeContext'
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

  const { dark } = useTheme()
  const rfInstance = useRef<ReactFlowInstance<FlowNode> | null>(null)

  const onSelectionChange = useCallback(({ nodes: selected }: OnSelectionChangeParams) => {
    setSelectedNode(selected.length === 1 ? selected[0].id : null)
  }, [setSelectedNode])

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
        onSelectionChange={onSelectionChange}
        fitView
        colorMode={dark ? 'dark' : 'light'}
      >
        <Background color={dark ? '#1e293b' : '#94a3b8'} />
        <Controls />
      </ReactFlow>
    </div>
  )
}

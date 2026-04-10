import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import { Card, CardContent } from '@heroui/react'
import type { NodeData } from '../../store/graphStore'

type MaterialNodeType = Node<NodeData, 'material'>

export function MaterialNode({ data, selected }: NodeProps<MaterialNodeType>) {
  return (
    <div className={`relative ${selected ? 'ring-2 ring-offset-1 ring-blue-500 rounded-xl' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <Card className="min-w-[160px] shadow-md p-0 overflow-hidden">
        <div className="bg-blue-500 px-3 py-2 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
          </svg>
          <span className="text-white font-semibold text-sm truncate">{data.label}</span>
        </div>
        <CardContent className="px-3 py-2 min-h-[32px] flex flex-wrap gap-1">
          {Object.entries(data.parameters).map(([k, v]) => (
            <span key={k} className="text-xs bg-blue-50 text-blue-700 rounded-full px-2 py-0.5 font-medium">
              {k}: {v}
            </span>
          ))}
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

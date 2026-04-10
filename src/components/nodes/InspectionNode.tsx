import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import { Card, CardContent } from '@heroui/react'
import type { NodeData } from '../../store/graphStore'

type InspectionNodeType = Node<NodeData, 'inspection'>

export function InspectionNode({ data, selected }: NodeProps<InspectionNodeType>) {
  return (
    <div className={`relative ${selected ? 'ring-2 ring-offset-1 ring-amber-500 rounded-xl' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <Card className="min-w-[160px] shadow-md p-0 overflow-hidden">
        <div className="bg-amber-500 px-3 py-2 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-white font-semibold text-sm truncate">{data.label}</span>
        </div>
        <CardContent className="px-3 py-2 min-h-[32px] flex flex-wrap gap-1">
          {Object.entries(data.parameters).map(([k, v]) => (
            <span key={k} className="text-xs bg-amber-50 text-amber-700 rounded-full px-2 py-0.5 font-medium">
              {k}: {v}
            </span>
          ))}
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import { Card, CardContent } from '@heroui/react'
import type { NodeData } from '../../store/graphStore'

type OutputNodeType = Node<NodeData, 'output'>

export function OutputNode({ data, selected }: NodeProps<OutputNodeType>) {
  return (
    <div className={`relative ${selected ? 'ring-2 ring-offset-1 ring-emerald-500 dark:ring-offset-gray-900 rounded-xl' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <Card className="min-w-[160px] shadow-md p-0 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="bg-emerald-500 px-3 py-2 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span className="text-white font-semibold text-sm truncate">{data.label}</span>
        </div>
        <CardContent className="px-3 py-2 min-h-[32px] flex flex-wrap gap-1">
          {Object.entries(data.parameters).map(([k, v]) => (
            <span key={k} className="text-xs bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full px-2 py-0.5 font-medium">
              {k}: {v}
            </span>
          ))}
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

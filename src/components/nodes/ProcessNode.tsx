import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import { Card, CardContent } from '@heroui/react'
import type { NodeData } from '../../store/graphStore'

type ProcessNodeType = Node<NodeData, 'process'>

export function ProcessNode({ data, selected }: NodeProps<ProcessNodeType>) {
  return (
    <div className={`relative ${selected ? 'ring-2 ring-offset-1 ring-violet-500 dark:ring-offset-gray-900 rounded-xl' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <Card className="min-w-[160px] shadow-md p-0 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="bg-violet-500 px-3 py-2 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
          </svg>
          <span className="text-white font-semibold text-sm truncate">{data.label}</span>
        </div>
        <CardContent className="px-3 py-2 min-h-[32px] flex flex-wrap gap-1">
          {Object.entries(data.parameters).map(([k, v]) => (
            <span key={k} className="text-xs bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 rounded-full px-2 py-0.5 font-medium">
              {k}: {v}
            </span>
          ))}
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

import type { NodeType } from '../types'

interface PaletteItem {
  type: NodeType
  label: string
  description: string
  color: string
  icon: React.ReactNode
}

const PALETTE_ITEMS: PaletteItem[] = [
  {
    type: 'material',
    label: 'Material',
    description: 'Input workpiece or raw material',
    color: 'bg-blue-500',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
      </svg>
    ),
  },
  {
    type: 'process',
    label: 'Process',
    description: 'Manufacturing step',
    color: 'bg-violet-500',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
  {
    type: 'inspection',
    label: 'Inspection',
    description: 'Quality or measurement check',
    color: 'bg-amber-500',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    type: 'output',
    label: 'Output',
    description: 'Final device or artifact',
    color: 'bg-emerald-500',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
]

function onDragStart(event: React.DragEvent, nodeType: NodeType) {
  event.dataTransfer.setData('nodeType', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}

export function NodePalette() {
  return (
    <aside className="w-[200px] shrink-0 border-r border-default-200 bg-default-50 flex flex-col gap-2 p-3 overflow-y-auto">
      <p className="text-xs font-semibold text-default-500 uppercase tracking-wider mb-1">Node Types</p>
      {PALETTE_ITEMS.map((item) => (
        <div
          key={item.type}
          draggable
          onDragStart={(e) => onDragStart(e, item.type)}
          className="rounded-xl border border-default-200 bg-white shadow-sm cursor-grab active:cursor-grabbing select-none hover:shadow-md transition-shadow overflow-hidden"
        >
          <div className={`${item.color} px-3 py-2 flex items-center gap-2 text-white`}>
            {item.icon}
            <span className="font-semibold text-sm">{item.label}</span>
          </div>
          <p className="text-xs text-default-500 px-3 py-2 leading-snug">{item.description}</p>
        </div>
      ))}
    </aside>
  )
}

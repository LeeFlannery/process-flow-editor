import { useState } from 'react'
import { Button } from '@heroui/react'
import { useGraphStore } from '../store/graphStore'
import type { NodeType } from '../types'

const TYPE_COLORS: Record<NodeType, string> = {
  material: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  process: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
  inspection: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  output: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
}

export function PropertyPanel() {
  const { nodes, selectedNodeId, updateNode, addParameter, removeParameter } = useGraphStore()
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')

  const selectedNode = nodes.find((n) => n.id === selectedNodeId)

  const handleAddParameter = () => {
    if (!selectedNodeId || !newKey.trim() || !newValue.trim()) return
    addParameter(selectedNodeId, newKey.trim(), newValue.trim())
    setNewKey('')
    setNewValue('')
  }

  if (!selectedNode) {
    return (
      <aside className="w-[280px] shrink-0 border-l border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
          Select a node to edit its properties.
        </p>
      </aside>
    )
  }

  const nodeType = selectedNode.type as NodeType

  return (
    <aside className="w-[280px] shrink-0 border-l border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Properties
        </p>
        <span className={`text-xs font-semibold rounded-full px-2.5 py-1 ${TYPE_COLORS[nodeType]}`}>
          {nodeType}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-4 flex-1">
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1.5">
            Label
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1.5 text-sm outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={selectedNode.data.label}
            onChange={(e) => updateNode(selectedNode.id, { label: e.target.value })}
            placeholder="Node label"
          />
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Parameters</p>
          {Object.entries(selectedNode.data.parameters).length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-gray-500 italic">No parameters yet.</p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {Object.entries(selectedNode.data.parameters).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5"
                >
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 flex-1 truncate">
                    <span className="text-gray-400 dark:text-gray-500">{k}:</span> {v}
                  </span>
                  <button
                    onClick={() => removeParameter(selectedNode.id, k)}
                    className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-xs shrink-0 transition-colors"
                    aria-label={`Remove ${k}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Add parameter</p>
          <input
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1.5 text-sm outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Key"
          />
          <input
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1.5 text-sm outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Value"
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddParameter() }}
          />
          <Button
            variant="ghost"
            onPress={handleAddParameter}
            isDisabled={!newKey.trim() || !newValue.trim()}
            className="w-full"
          >
            Add
          </Button>
        </div>
      </div>
    </aside>
  )
}

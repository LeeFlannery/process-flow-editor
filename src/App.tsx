import { ThemeProvider } from './context/ThemeContext'
import { Toolbar } from './components/Toolbar'
import { NodePalette } from './components/NodePalette'
import { GraphCanvas } from './components/GraphCanvas'
import { PropertyPanel } from './components/PropertyPanel'

export default function App() {
  return (
    <ThemeProvider>
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-white dark:bg-gray-950">
        <Toolbar />
        <div className="flex flex-1 overflow-hidden">
          <NodePalette />
          <GraphCanvas />
          <PropertyPanel />
        </div>
      </div>
    </ThemeProvider>
  )
}

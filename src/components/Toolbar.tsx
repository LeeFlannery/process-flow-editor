import { useState } from 'react'
import {
  Button,
  ModalRoot,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  useOverlayState,
} from '@heroui/react'
import { useGraphStore } from '../store/graphStore'
import { validateWorkflow } from '../schema/validate'
import { useTheme } from '../context/ThemeContext'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export function Toolbar() {
  const { exportWorkflow } = useGraphStore()
  const { dark, toggle } = useTheme()
  const modal = useOverlayState()
  const [validationResult, setValidationResult] = useState<{ valid: boolean; errors: string[] } | null>(null)

  const handleValidate = () => {
    const data = exportWorkflow()
    const result = validateWorkflow(data)
    setValidationResult(result)
    modal.open()
  }

  const handleExport = () => {
    const data = exportWorkflow()
    const result = validateWorkflow(data)
    if (!result.valid) {
      setValidationResult(result)
      modal.open()
      return
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'workflow-export.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <header className="h-14 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4">
        <span className="font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
          Process Flow Editor
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <Button variant="outline" onPress={handleValidate}>
            Validate
          </Button>
          <Button variant="primary" onPress={handleExport}>
            Export JSON
          </Button>
        </div>
      </header>

      <ModalRoot state={modal}>
        <ModalBackdrop isDismissable>
          <ModalContainer size="sm">
            <ModalDialog>
              <ModalHeader>
                <ModalHeading>
                  {validationResult?.valid ? 'Validation Passed' : 'Validation Failed'}
                </ModalHeading>
              </ModalHeader>
              <ModalBody>
                {validationResult?.valid ? (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    The workflow is valid and ready to export.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {validationResult?.errors.map((err, i) => (
                      <li key={i} className="text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950 rounded-lg px-3 py-2 font-mono">
                        {err}
                      </li>
                    ))}
                  </ul>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onPress={modal.close}>Close</Button>
              </ModalFooter>
            </ModalDialog>
          </ModalContainer>
        </ModalBackdrop>
      </ModalRoot>
    </>
  )
}

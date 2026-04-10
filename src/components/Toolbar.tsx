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

export function Toolbar() {
  const { exportWorkflow } = useGraphStore()
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
      <header className="h-14 shrink-0 border-b border-gray-200 bg-white flex items-center justify-between px-4">
        <span className="font-semibold text-gray-800 tracking-tight">Process Flow Editor</span>
        <div className="flex items-center gap-2">
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
                  <p className="text-sm text-gray-600">The workflow is valid and ready to export.</p>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {validationResult?.errors.map((err, i) => (
                      <li key={i} className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2 font-mono">
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

import Ajv from 'ajv'
import { workflowSchema } from './workflowSchema'

const ajv = new Ajv()
const compiled = ajv.compile(workflowSchema)

export function validateWorkflow(data: unknown): { valid: boolean; errors: string[] } {
  const valid = compiled(data)
  if (valid) return { valid: true, errors: [] }
  return {
    valid: false,
    errors: (compiled.errors ?? []).map(
      (e) => `${e.instancePath || '(root)'} ${e.message}`
    ),
  }
}

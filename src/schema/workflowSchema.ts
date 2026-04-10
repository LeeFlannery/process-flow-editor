export const workflowSchema = {
  type: 'object',
  required: ['version', 'nodes', 'edges'],
  properties: {
    version: { type: 'string', const: '1.0' },
    nodes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'type', 'label', 'parameters'],
        properties: {
          id: { type: 'string' },
          type: { type: 'string', enum: ['material', 'process', 'inspection', 'output'] },
          label: { type: 'string', minLength: 1 },
          parameters: { type: 'object', additionalProperties: { type: 'string' } },
        },
      },
    },
    edges: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'source', 'target'],
        properties: {
          id: { type: 'string' },
          source: { type: 'string' },
          target: { type: 'string' },
        },
      },
    },
  },
}

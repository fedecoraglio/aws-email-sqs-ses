export default {
  type: 'object',
  properties: {
    destinationEmail: { type: 'string' },
    templateName: { type: 'string' },
    templateData: { type: 'object' },
  },
  required: ['destinationEmail', 'templateName', 'templateData'],
} as const;

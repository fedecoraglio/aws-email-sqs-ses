import message from '@functions/notifications/receiver/schema';

export default {
  type: 'object',
  properties: {
    messages: [message],
  },
  required: ['messages'],
} as const;

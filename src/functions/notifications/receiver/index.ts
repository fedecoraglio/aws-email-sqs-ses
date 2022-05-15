import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/lambda';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'notifications',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
        cors: {
          origin: '*',
        },
      },
    },
  ],
} as AWSFunction;

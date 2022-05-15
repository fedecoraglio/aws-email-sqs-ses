import { handlerPath } from '@libs/handler-resolver';
import { AWSFunction } from '@libs/lambda';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: process.env.ARM_SQS,
    },
  ],
} as AWSFunction;
